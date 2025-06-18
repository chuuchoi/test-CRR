export declare const Hi: React.ForwardRefExoticComponent<Partial<{
  blendFunction: import("postprocessing").BlendFunction;
  patternTexture: number;
  edgeStrength: number;
  pulseSpeed: number;
  visibleEdgeColor: number;
  hiddenEdgeColor: number;
  width: number;
  height: number;
  kernelSize: KernelSize;
  blur: boolean;
  xRay: boolean;
}> & Partial<{
  selection: Object3D | Object3D[] | ObjectRef | ObjectRef[];
  selectionLayer: number;
}> & React.RefAttributes<OutlineEffect>>;