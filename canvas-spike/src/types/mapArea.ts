import {Tile} from "./tile";
import {Biome} from "./biome";

export class MapArea {
  width: number;
  height: number;
  biomes: Biome[] = [];
  tileArray: (Tile | undefined)[][];

  get tiles(): Tile[] {
    const allTiles: Tile[] = [];
    this.tileArray.forEach(tileRow => tileRow.forEach(tile => {
      if(tile) {
        allTiles.push(tile)
      }
    }))
    return allTiles
  }

  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.tileArray = Array.from({length: this.width+1}, () => {
      return Array.from({length: this.height+1}, () => undefined)
    });

    const edgeBiome = new Biome(0)
    for (let x = 0; x < this.width; x++) {
      this.tileArray[x][0] = edgeBiome.addTile(x, 0);
      this.tileArray[x][this.height-1] = edgeBiome.addTile(x, this.height);

    }
    for (let y = 0; y < this.height; y++) {
      this.tileArray[0][y] = edgeBiome.addTile(0, y);
      this.tileArray[this.width-1][y] = edgeBiome.addTile(this.width, y);
    }
    this.biomes.push(edgeBiome);
  }

  at(x: number, y: number): (Tile | undefined) {
    if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return undefined;
    }
    return this.tileArray[x][y];
    // return this.tiles.find(tile => {
    //   return tile.x === x && tile.y === y
    // })
  }

  checkTileIsEdge(tile: Tile, tileIsNew: boolean = false) {
    if (tile.isEdge) {
      tile.checkIsEdge();
    }
    if (tile.isEdge) {
      if (tileIsNew) {
        tile.biome.edgeTiles.push(tile);
      }
    } else {
      tile.biome.edgeTiles = tile.biome.edgeTiles.filter(tile => tile.isEdge);
    }
  }

  addTileAdjacency(tile: Tile) {
    tile.n = this.at(tile.x, tile.y - 1);
    if (tile.n) {
      tile.n.s = tile;
      this.checkTileIsEdge(tile, true);
      this.checkTileIsEdge(tile.n);
    }
    tile.s = this.at(tile.x, tile.y + 1);
    if (tile.s) {
      tile.s.n = tile;
      this.checkTileIsEdge(tile, true);
      this.checkTileIsEdge(tile.s);
    }
    tile.e = this.at(tile.x + 1, tile.y);
    if (tile.e) {
      tile.e.w = tile;
      this.checkTileIsEdge(tile, true);
      this.checkTileIsEdge(tile.e);
    }
    tile.w = this.at(tile.x - 1, tile.y);
    if (tile.w) {
      tile.w.e = tile;
      this.checkTileIsEdge(tile, true);
      this.checkTileIsEdge(tile.w);
    }
  }

  addBiome(x: number, y: number, growthRate: number, colour: string = '#000000') {
    const newBiome = new Biome(growthRate, colour)
    this.biomes.push(newBiome)
    const newBiomeTile = newBiome.addTile(x, y)
    newBiome.edgeTiles.push(newBiomeTile)
    this.tileArray[x][y] = newBiomeTile;
  }

  grow(): Tile[] {
    const grownTiles: Tile[] = [];
    this.biomes.forEach(biome => {
      for (let i = 0; i < biome.growthRate; i++) {
        const newBiomeTile = biome.grow()
        if (newBiomeTile) {
          this.tileArray[newBiomeTile.x][newBiomeTile.y] = newBiomeTile;
          this.addTileAdjacency(newBiomeTile)
          grownTiles.push(newBiomeTile)
        }
      }
    })
    return grownTiles;
  }
}
