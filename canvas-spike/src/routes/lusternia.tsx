import React, {useState} from "react";
import Canvas from "../components/Canvas";
import styled from "@emotion/styled";
import * as areas from "../assets/areas.json"
import {Area, Room} from "../types/lusternia";

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
  
  canvas {
  background-color: slategray;
  }
`

const Lusternia = () => {
  const width = 1000;
  const height = 800;
  let roomScale = 10;
  let offsetX = width / 2;
  let offsetY = height / 2;

  const source: Area[] = (areas as any).Areas;

  const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colour: string = '#000000') => {
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.closePath();
  }

  const drawRoom = (ctx: CanvasRenderingContext2D, x: number, y: number, colour: string = '#000000') => {
    const scale = roomScale * 2;
    const roomSize = roomScale;
    const xCoord = x * scale + offsetX + roomSize / 2
    const yCoord = -y * scale + offsetY + roomSize / 2
    drawSquare(ctx, xCoord, yCoord, roomSize, roomSize, colour)
  }

  const drawExit = (ctx: CanvasRenderingContext2D, from: Room, to: Room | undefined, direction: string) => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = roomScale / 5;
    ctx.setLineDash([])
    const scale = roomScale * 2;
    const xCoord = from.Coord.X * scale + offsetX + roomScale;
    const yCoord = -from.Coord.Y * scale + offsetY + roomScale;

    switch (direction) {
      case "in":
      case "out":
        ctx.lineWidth = roomScale / 10;
        // ctx.strokeStyle = '#444444'
        ctx.setLineDash([scale / 30, scale / 10]);
        break;
      case "up":
      case "down":
        ctx.lineWidth = roomScale / 10;
        ctx.strokeStyle = '#666666'
        ctx.setLineDash([scale / 10, scale / 30]);
        break;

    }

    ctx.beginPath();
    ctx.moveTo(xCoord, yCoord);
    let endX = xCoord;
    let endY = yCoord;
    switch (direction) {
      case "north":
        endY -= roomScale;
        break;
      case "northeast":
        endX += roomScale;
        endY -= roomScale;
        break;
      case "east":
        endX += roomScale;
        break;
      case "southeast":
        endX += roomScale;
        endY += roomScale;
        break;
      case "south":
        endY += roomScale;
        break;
      case "southwest":
        endX -= roomScale;
        endY += roomScale;
        break;
      case "west":
        endX -= roomScale;
        break;
      case "northwest":
        endX -= roomScale;
        endY -= roomScale;
        break;
    }
    ctx.lineTo(endX, endY);
    if (to) {
      // endX = (to.Coord.X) * scale + offsetX + roomScale;
      // endY = (-to.Coord.Y) * scale + offsetY + roomScale;
      endX = (from.Coord.X + (to.Coord.X - from.Coord.X) / 2) * scale + offsetX + roomScale;
      endY = (-from.Coord.Y - (to.Coord.Y - from.Coord.Y) / 2) * scale + offsetY + roomScale;
    }
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  }

  const [mapIndex, setMapIndex] = useState(0)

  const updateSelection = (newSelection: string) => {
    setMapIndex(parseInt(newSelection, 10))
  }
  const selectedMap = source[mapIndex].Map;
  console.log('selected map:', selectedMap)

  let time = Date.now();
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    // ctx.filter = 'blur(2.5px)'

    // draw paths
    selectedMap.Rooms.forEach(room => {
      if (room.Exits) {
        room.Exits.forEach(exit => {
          drawExit(ctx, room, selectedMap.Rooms.find(mapRoom => mapRoom.Id === exit.Target), exit.Direction)
        })
      }
    })

    // draw rooms
    selectedMap.Rooms.forEach(room => {
      const roomColor = selectedMap.Environments.find(env => env.Id === room.Environment)?.HtmlColor || '#000000';
      drawRoom(ctx, room.Coord.X, room.Coord.Y, roomColor)
    })

    // console.log('Draw interval:', Date.now() - time);
    time = Date.now();

  }

  let dragging = false;

  const beginDrag = () => {
    dragging = true
  }

  const endDrag = () => {
    dragging = false
  }

  const dragEvent = (event: React.MouseEvent) => {
    if (!dragging) return;
    offsetX += event.movementX;
    offsetY += event.movementY;
  }

  const handleScrollWheel = (event: React.WheelEvent) => {
    roomScale -= event.deltaY / 50;
    if (roomScale <= 0) {
      roomScale = 2
    }
  }

  return (
    <CenterWrap>
      <div>
        <select onChange={selection => updateSelection(selection.target.value)} value={mapIndex}>
          {
            source.map((area, index) => {
              return <option
                key={index}
                value={index}
              >{area.Name}</option>
            })
          }
        </select>
        <Canvas draw={draw} width={width} height={height} refreshInterval={1}
                onMouseDown={beginDrag}
                onMouseLeave={endDrag}
                onMouseUp={endDrag}
                onMouseMove={dragEvent}
                onWheel={handleScrollWheel}
        />
      </div>
    </CenterWrap>
  )
}

export default Lusternia;
