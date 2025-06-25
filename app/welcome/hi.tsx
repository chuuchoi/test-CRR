import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, UnrealBloomPass, RenderPass, OutlinePass } from "three-stdlib";


const BLOOM_LAYER = 1;
const ENTIRE_SCENE = 0;

function MySelectiveBloom({selection}:any) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<any>(null);
  const bloomComposer = useRef<any>(null);

  const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const materials = new Map();

  useEffect(() => {
    // Main Composer (기본 씬)
    composer.current = new EffectComposer(gl);
    composer.current.setSize(size.width, size.height);
    composer.current.addPass(new RenderPass(scene, camera));

    // Bloom 전용 Composer
    bloomComposer.current = new EffectComposer(gl);
    bloomComposer.current.setSize(size.width, size.height);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1,
      0.01,
      30
    );
    bloomPass.threshold = 0.01;
    bloomPass.strength = 0.4; // bloom intensity
    bloomPass.radius = 1;

    bloomComposer.current.addPass(renderScene);
    bloomComposer.current.addPass(bloomPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(size.width, size.height),
      scene,
      camera,
      selection // selected objects
    );
    // ✅ outline always on top
    // outlinePass.overlayMaterial.depthTest = false;
    // outlinePass.overlayMaterial.depthWrite = false;
    // outlinePass.overlayMaterial.transparent = true;
    // ✅ outline 옵션 설정
    outlinePass.edgeStrength = 40;
    outlinePass.edgeThickness = 1;
    outlinePass.visibleEdgeColor.set("#ffffff");
    // ✅ composer에 추가
    bloomComposer.current?.addPass(outlinePass);
    camera.layers.enable(BLOOM_LAYER); // 카메라가 bloom 레이어도 보도록 설정
  }, [gl, scene, camera, size]);

  const darkenNonBloomed = (obj:any) => {
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_LAYER);
    if(
        obj.isMesh &&
        obj.material &&
        obj.layers &&          
        typeof obj.layers.test === "function" && // ✅ undefined 방지
        !obj.layers.test(bloomLayer)
      ){
        materials.set(obj.uuid, obj.material);
        obj.material = darkMaterial;
      }
  };
  
  const restoreMaterial = (obj:any) => {
    if (obj.isMesh && materials.has(obj.uuid)) {
      obj.material = materials.get(obj.uuid);
      materials.delete(obj.uuid);
    }
  };
  

  useFrame(() => {
    // scene.traverse(darkenNonBloomed);        // Bloom 대상 외의 물체들을 검게
    // if(bloomComposer.current)
    //   bloomComposer.current.render();          // Bloom Pass만 렌더링
    // scene.traverse(restoreMaterial);         // 원래 재질 복구
    // if(composer.current)
    //   composer.current.render();               // 전체 씬 렌더링


    // const bloomLayer = new THREE.Layers();
    // bloomLayer.set(BLOOM_LAYER);
  // 1. 카메라를 Bloom Layer만 보도록 설정
  const previousLayer = camera.layers.mask;
  camera.layers.set(BLOOM_LAYER);

  // 2. bloom 아닌 애들 어둡게
  scene.traverse(darkenNonBloomed);
  // bloomComposer.current?.render();  // → bloom 결과를 framebuffer에 렌더링

  // 3. 재질 복구
  scene.traverse(restoreMaterial);
  camera.layers.mask = previousLayer;

  // 4. 메인 씬은 그냥 render로 gl에 합성
  // gl.autoClear = false;
  // gl.clearDepth(); // 깊이값 리셋
  //✅ 핵심은 gl.clearDepth()와 autoClear = false를 써서 두 번째 render가 첫 번째 bloom 결과를 덮어쓰지 않도록 하는 것입니다.
  // composer.current?.render();
  gl.render(scene, camera); // ✅ 이게 핵심
  bloomComposer.current?.render()
  }, 1);

  return null;
}

function Scene({setSelection}:any) {
  const redRef = useRef(null);
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* Bloom 적용 안 됨 */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Bloom 적용 대상 */}
      <mesh name="red"
        ref={redRef}
        position={[0, 2, 0]}
        onPointerOver={(e) => console.log("red hover")}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
      </mesh>

      {/* Bloom 적용 안 됨 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      {/* Bloom 대상에만 layer 설정 */}
      <SetLayer objectRef={redRef} layer={BLOOM_LAYER} setSelection={setSelection} />
    </>
  );
}

function SetLayer({ objectRef, layer, setSelection }:any) {
  useEffect(() => {
    if (objectRef.current) {
      console.log(objectRef.current)
      setSelection([objectRef.current])
      objectRef.current.layers.set(layer);
    }
  }, [objectRef, layer]);

  return null;
}


export function Hi({num}:{num:number}) {
  const [selection, setSelection] = useState([])
  // console.log(selection)
  return (<><h1>H1</h1>
    <div className="w-72 h-72 md:w-160 md:h-160 m-auto">
    <Canvas
    linear
    dpr={[1, 2]}
    gl={{ antialias: true }}
    style={{ background: "black", border: "1px solid" }}
    >
      <Scene setSelection={setSelection}/>
      <MySelectiveBloom selection={selection}/>
      <OrbitControls />
    </Canvas>
    </div>
  </>);
}
