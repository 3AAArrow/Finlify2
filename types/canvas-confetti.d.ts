declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  type ConfettiCanvasFunction = (options?: ConfettiOptions) => Promise<null>;
  
  interface ConfettiCanvas extends ConfettiCanvasFunction {
    reset: () => void;
    create: (canvas: HTMLCanvasElement, options?: { resize?: boolean; useWorker?: boolean; }) => ConfettiCanvasFunction;
  }

  const confetti: ConfettiCanvas;
  export default confetti;
}
