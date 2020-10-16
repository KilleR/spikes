import React from "react";
import Canvas from "../components/Canvas";
import styled from "@emotion/styled";
import {Biome, MapArea, Tile} from "../types";

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
  const width = 1000;
  const height = 800;
  const map = new MapArea(width / 5, height / 5);

  let newTiles: Tile[] = [];

  const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colour: string = '#000000') => {
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.closePath();
  }

  for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * (width / 5 - 10)) + 5
    let y = Math.floor(Math.random() * (height / 5 - 10)) + 5
    map.addBiome(x, y, 4, '#008800')
    x = Math.floor(Math.random() * (width / 5 - 10)) + 5
    y = Math.floor(Math.random() * (height / 5 - 10)) + 5
    map.addBiome(x, y, 6, '#FFFF00')
    x = Math.floor(Math.random() * (width / 5 - 10)) + 5
    y = Math.floor(Math.random() * (height / 5 - 10)) + 5
    map.addBiome(x, y, 1, '#888888')
    x = Math.floor(Math.random() * (width / 5 - 10)) + 5
    y = Math.floor(Math.random() * (height / 5 - 10)) + 5
    map.addBiome(x, y, 10, '#0000FF')
  }

  newTiles.push(...map.tiles)

  let time = Date.now();
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    // ctx.filter = 'blur(2.5px)'

    let edgeTiles = 0;
    map.biomes.forEach(biome => {
      edgeTiles += biome.edgeTiles.length;
    })
    console.log('Draw interval:', Date.now() - time);
    time = Date.now();


    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(0, 0, 2, 2);
    ctx.fill();
    ctx.closePath();


    // return;
    if (frameCount < 1000) {
      newTiles.push(...map.grow());
      newTiles.forEach(tile => {
        const x = tile.x * 5;
        const y = tile.y * 5;
        drawSquare(ctx, x, y, 5, 5, tile.biome.colour)
      })
      newTiles = [];
    }

    // map.biomes.forEach(biome => {
    //   biome.tiles.forEach(tile => {
    //     const x = tile.x * 5;
    //     const y = tile.y * 5;
    //     drawSquare(ctx, x, y, 5, 5, biome.colour)
    //   })
    // })


    // ctx.fillStyle = '#00ffff';
    // ctx.strokeStyle = '#00ffff';
    // ctx.lineWidth = 4;
    // if(frameCount > 120) {
    //   ctx.beginPath();
    //   ctx.arc(0, 0, 12 * Math.sin((frameCount - 120) * 0.05) ** 10, 0, 2 * Math.PI);
    //   ctx.fill();
    //   ctx.closePath();
    // }
    //
    //
    // ctx.beginPath();
    // let arc1 = ((frameCount * 0.05)) * Math.PI;
    // let arc2 = (((frameCount + (1.6/0.05)) * 0.05)) * Math.PI;
    // ctx.arc(0, 0, 150 * Math.sin(Math.min(frameCount * 0.02, Math.PI * 0.5)) ** 2, arc1, arc2);
    // ctx.stroke();
    // ctx.closePath();
    //
    //
    // ctx.beginPath();
    // arc1 = ((-frameCount * 0.04)) * Math.PI;
    // arc2 = (((-frameCount + (1.6/0.04)) * 0.04)) * Math.PI;
    // ctx.arc(0, 0, 120 * Math.sin(Math.min(Math.max((frameCount - 30) * 0.02, 0), Math.PI * 0.5)) ** 2, arc1, arc2);
    // ctx.stroke();
    // ctx.closePath();
    //
    //
    // ctx.beginPath();
    // arc1 = ((frameCount * 0.03)) * Math.PI;
    // arc2 = (((frameCount + (1.6/0.03)) * 0.03)) * Math.PI;
    // ctx.arc(0, 0, 90 * Math.sin(Math.min(Math.max((frameCount - 60) * 0.02, 0), Math.PI * 0.5)) ** 2, arc1, arc2);
    // ctx.stroke();
    // ctx.closePath();
  }

  return (
    <CenterWrap>
      <Canvas draw={draw} width={width} height={height} refreshInterval={0}/>
    </CenterWrap>
  )
}

export default Root;
