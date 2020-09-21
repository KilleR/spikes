import React, {FunctionComponent} from "react";
import styled from "@emotion/styled";
import useCanvas from "./useCanvas";

const CanvasElement = styled.canvas`
  border: 5px double indigo;
  height: ${props => props.height+'px'};
  width: ${props => props.width+'px'};
  margin: auto;
`

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => void,
  height?: number,
  width?: number,
  refreshInterval?: number;
}

const Canvas: FunctionComponent<CanvasProps> = ({draw, height = 400, width = 400, refreshInterval = 1, ...rest}: CanvasProps) => {
  const canvasRef = useCanvas(draw, refreshInterval);

  return (
    <CanvasElement ref={canvasRef} height={height} width={width} {...rest} />
  )
}

export default Canvas;


