import {Tile} from "./tile";

export class Biome {
  tiles: Tile[];
  edgeTiles: Tile[] = [];
  growthRate: number;
  colour: string;

  constructor(growthRate: number, colour: string = '#000000') {
    this.tiles = [];
    this.growthRate = growthRate;
    this.colour = colour
  }

  addTile(x: number, y: number): Tile {
    const newTile = new Tile(x, y, this);
    this.tiles.push(newTile);
    return newTile;
  }

  grow(): Tile | null {
    const edges = this.edgeTiles;
    if (!this.edgeTiles.length) {
      return null;
    }
    const growIndex = Math.floor(Math.random() * edges.length);
    const growTile = edges[growIndex]

    if(growTile.n && growTile.s && growTile.e && growTile.w) {
      console.log('should not be growing here!');
      return null;
    }

    let newTile: Tile;
    findTileLoop:
      while (true) {
        const growSide = Math.floor(Math.random() * 4);
        // let newTile: Tile;
        switch (growSide) {
          case 0:
            if (!growTile.n) {
              newTile = this.addTile(growTile.x, growTile.y - 1);
              growTile.n = newTile;
              break findTileLoop;
            }
            break;
          case 1:
            if (!growTile.s) {
              newTile = this.addTile(growTile.x, growTile.y + 1);
              growTile.s = newTile;
              break findTileLoop;
            }
            break;
          case 2:
            if (!growTile.e) {
              newTile = this.addTile(growTile.x + 1, growTile.y);
              growTile.e = newTile;
              break findTileLoop;
            }
            break;
          case 3:
            if (!growTile.w) {
              newTile = this.addTile(growTile.x - 1, growTile.y);
              growTile.w = newTile;
              break findTileLoop;
            }
            break;
        }
      }

    return newTile;
  }
}
