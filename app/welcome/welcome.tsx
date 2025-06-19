
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer,Outline, Bloom } from "@react-three/postprocessing";
function Model2({ onPartClick }:any) {
  const { scene, nodes } = useGLTF(`${import.meta.env.BASE_URL}myFirstBlender.glb`); // 모델 불러오기

  // 예시: 이름이 "ClickablePart"인 부분을 클릭 가능하게 처리
  return (
    <primitive
      object={scene}
      onClick={(e:any) => {
        e.stopPropagation();
        console.log(e.object)
        // if (e.object.name === "ClickablePart") {
          onPartClick(e.object);
        // }
      }}
    />
  );
}


function Model({ onPartClick, selected  }:any) {
  const { scene, nodes } = useGLTF(`${import.meta.env.BASE_URL}myFirstBlender.glb`); // 모델 불러오기

  // scene 내의 모든 Mesh만 추출 (중첩 포함)
  const meshes = useMemo(() => {
    const result: any[] = [];
    scene.traverse((child:any) => {
      if (child.isMesh) result.push(child);
    });
    return result;
  }, [scene]);

  return (
    <>
      {meshes.map((mesh, idx) => {
        const position = mesh.getWorldPosition(new THREE.Vector3());
        const scale = mesh.getWorldScale(new THREE.Vector3());
        // let {x,y,z} = scale
        // let s =(selected?.uuid === mesh.uuid)?new THREE.Vector3(x*1.1,y*1.1,z*1.1):scale

        // ✅ getWorldQuaternion → THREE.Euler 회전값으로 변환
        const quaternion = mesh.getWorldQuaternion(new THREE.Quaternion());
        const rotation = new THREE.Euler().setFromQuaternion(quaternion);

        return (
            <mesh key={idx}
              name={mesh.name}
              geometry={mesh.geometry}
              position={position}
              rotation={rotation}
              scale={scale}
              material={mesh.material.clone()}
              onClick={(e) => {
                e.stopPropagation();
                onPartClick(e.object);
              }}
            >
            {/* {selected?.uuid === mesh.uuid && (
              // 🔎 Edges는 직접 <mesh> 안에 넣어야 제대로 적용됩니다.
              <Edges scale={1} threshold={1} color="#ff0000" lineWidth={8}
              
              />
            )} */}
          </mesh>
        )})}
    </>
  );
}

function Scene({setPopupInfo}:any) {
  const cameraRef = useRef<any>(null);
  const [rotation, setRotation] = useState({ phi: 0, theta: 0 }); // 각도 (라디안)
  const [distance, setDistance] = useState(8); // 카메라 타겟 거리
  const [selected, setSelected] = useState<any>(null); // 선택된 mesh

  //  마우스 이동 → 회전 각도 반영
   useEffect(() => {
    const handleMouseMove = (e:any) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 2; // -1 ~ 1
      const y = ((e.clientY / innerHeight) - 0.5) * 2;

      const maxAngle = (10 * Math.PI) / 180; // ±10도 → 라디안
      setRotation({
        phi: y * maxAngle,
        theta: x * maxAngle,
      });
    };

    const handleWheel = (e:any) => {
      setDistance((prev) => {
        const newDist = prev + e.deltaY * 0.01;
        return Math.min(10, Math.max(6, newDist)); // 6 ~ 10 제한
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // 카메라 위치 갱신
  useFrame(() => {
    const initialTheta = (45 * Math.PI) / 180;
    const initialPhi = (45 * Math.PI) / 180;
    const x = distance * Math.sin(rotation.theta+initialTheta) * Math.cos(rotation.phi+initialPhi);
    const y = distance * Math.sin(rotation.phi+initialPhi);
    const z = distance * Math.cos(rotation.theta+initialTheta) * Math.cos(rotation.phi+initialPhi);
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={80} />
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />

        <Model onPartClick={(object:any)=>{
          console.log('??',object)
          setPopupInfo({
            name: object.name,
            position: object.position,
          });
          setSelected(object)
        }} 
        selected={selected}/>

        <EffectComposer autoClear={false}>
          <Outline
            selection={selected?selected:[]}
            edgeStrength={10}
            visibleEdgeColor={new THREE.Color("orange").getHex()} // ✅ number로 변환
            hiddenEdgeColor={0x000000}
            blur={false}
          />
          <Bloom 
          intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.8}/>
        </EffectComposer>

      <OrbitControls />
    </>
  );
}


export function Welcome() {
  const [popupInfo, setPopupInfo] = useState<any>({});

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      {popupInfo.name && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 100,
            padding: 10,
            background: "white",
            border: "1px solid #ccc",
          }}
        >
          <p>🔍 클릭된 부분: {popupInfo.name}</p>
          <p>위치: {popupInfo.position}</p>
          <button onClick={() => setPopupInfo({})}>닫기</button>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="w-72 h-72 md:w-160 md:h-160">
        <Canvas  dpr={[1, 2]} gl={{ antialias: true }} style={{background:'black',border:'1px solid'}}>
          <Scene setPopupInfo={setPopupInfo}/>
        </Canvas>
        </div>
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s next?
            </p>
            <ul>
              {resources.map(({ href, text, icon }) => (
                <li key={href}>
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
