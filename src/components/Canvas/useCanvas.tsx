import {useEffect, useRef} from "react";

const resizeCanvas = (canvas:HTMLCanvasElement) => {
  const {width, height} = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

const useCanvas = (draw: (context: CanvasRenderingContext2D, frameCount: number) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let frameCount = 0;
      let animationFrameId: number;

      const predraw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        context.save();
        context.translate(canvas.width * 0.5, canvas.height * 0.5);
        resizeCanvas(canvas);
        const {width, height} = context.canvas;
        context.clearRect(-width * 0.5, -height * 0.5, width, height);
      }

      const postdraw = (context: CanvasRenderingContext2D) => {
        frameCount++;
        context.restore()
      }

      const render = () => {
        if(!context) return;
        predraw(context, canvas);
        draw(context, frameCount);
        postdraw(context);
        animationFrameId = window.requestAnimationFrame(render);
      }
      render();

      return() => {
        window.cancelAnimationFrame(animationFrameId);
      }
    }
  }, [draw])

  return canvasRef;
}

export default useCanvas;
