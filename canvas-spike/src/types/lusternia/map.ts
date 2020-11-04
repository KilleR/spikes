import {Room} from "./room";
import {Environment} from "./environment";

export interface Zone {
  Rooms: Room[];
  Environments: Environment[];
}
