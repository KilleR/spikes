import {Biome} from "./biome";

export class Tile {
  x: number;
  y: number;
  biome: Biome;
  type = 0;
  isEdge = true;
  n: Tile | undefined = undefined;
  s: Tile | undefined = undefined;
  e: Tile | undefined = undefined;
  w: Tile | undefined = undefined;

  checkIsEdge() {
    this.isEdge = !(this.n
      && this.s
      && this.e
      && this.w)
  }

  constructor(x: number, y: number, biome: Biome) {
    this.x = x;
    this.y = y;
    this.biome = biome;
  }
}
