import React from "react";
import Canvas from "../components/Canvas";
import styled from "@emotion/styled";

const CenterWrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  
  > * {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  }
`

const Root = () => {

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.fillStyle = '#00ffff';
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    if(frameCount > 120) {
      ctx.beginPath();
      ctx.arc(0, 0, 12 * Math.sin((frameCount - 120) * 0.05) ** 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }


    ctx.beginPath();
    let arc1 = ((frameCount * 0.05)) * Math.PI;
    let arc2 = (((frameCount + (1.6/0.05)) * 0.05)) * Math.PI;
    ctx.arc(0, 0, 150 * Math.sin(Math.min(frameCount * 0.02, Math.PI * 0.5)) ** 2, arc1, arc2);
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    arc1 = ((-frameCount * 0.04)) * Math.PI;
    arc2 = (((-frameCount + (1.6/0.04)) * 0.04)) * Math.PI;
    ctx.arc(0, 0, 120 * Math.sin(Math.min(Math.max((frameCount - 30) * 0.02, 0), Math.PI * 0.5)) ** 2, arc1, arc2);
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    arc1 = ((frameCount * 0.03)) * Math.PI;
    arc2 = (((frameCount + (1.6/0.03)) * 0.03)) * Math.PI;
    ctx.arc(0, 0, 90 * Math.sin(Math.min(Math.max((frameCount - 60) * 0.02, 0), Math.PI * 0.5)) ** 2, arc1, arc2);
    ctx.stroke();
    ctx.closePath();
  }

  return (
    <CenterWrap>
      <Canvas draw={draw} width={500} height={400}/>
    </CenterWrap>
  )
}

export default Root;
