declare module 'vanta' {
  interface VantaConfig {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showLines?: boolean;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  function NET(_config: VantaConfig): VantaEffect;
  export = NET;
}
