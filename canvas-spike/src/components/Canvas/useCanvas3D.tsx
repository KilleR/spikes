import {useEffect, useRef} from "react";

const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const {width, height} = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

const useCanvas3D = (draw: (context: WebGLRenderingContext, frameCount: number) => void, refreshInterval: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("webgl");
      let frameCount = 0;
      let animationFrameId: number;

      const predraw = (context: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
        // context.save();
        resizeCanvas(canvas);
        const {width, height} = context.canvas;
        context.clear(context.DEPTH_BUFFER_BIT);
      }

      const postdraw = (context: WebGLRenderingContext) => {
        frameCount++;
        // context.restore()
      }

      const render = () => {
        if (!context) return;
        if (refreshInterval && frameCount % refreshInterval === 0) {
          predraw(context, canvas);
        }
        draw(context, frameCount);
        if (refreshInterval && frameCount % refreshInterval === 0) {
          postdraw(context);
        }
        animationFrameId = window.requestAnimationFrame(render);
      }
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      }
    }
  }, [draw, refreshInterval])

  return canvasRef;
}

export default useCanvas3D;
