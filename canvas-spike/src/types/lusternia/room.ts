export interface Room {
  Id: number;
  Area: number;
  Title: string;
  Environment: number;
  Coord: {
    X: number;
    Y: number;
    Z: number;
  }
  Exits: {
    Direction: string;
    Target: number;
  }[]
}
