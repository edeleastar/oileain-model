import {generateSafeName} from "../utils/charutils";
const marked = require('../utilsjs/marked');

export interface GridRef {
  sheet: string;
  eastings: string;
  northings: string;
}

export interface GeoLocation {
  lat: number;
  long: number;
}

export class PointOfInterest {
  name: string;
  safeName: string;
  nameHtml: string;
  costalZone: string;
  grid: GridRef;
  geo: GeoLocation;
  cursor: number;
  description: string;

  constructor(name: string, grid: GridRef, cursor: number) {
    this.name = name;
    this.nameHtml = marked(name);
    this.safeName = generateSafeName(name);
    this.grid = grid;
    this.cursor = cursor;
  }
}

export interface Coast {
  title: string;
  variable: string;
  identifier: string;
  pois: Array<PointOfInterest>;
}