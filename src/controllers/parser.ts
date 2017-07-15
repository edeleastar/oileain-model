import * as fs from 'fs';
import {
  isCapitalLetter,
  isGridRef,
  isNumeric,
  normalizeGridref,
} from '../utils/charutils';
import { PointOfInterest } from '../model/poi';
const marked = require('../utilsjs/marked');


export class Parser {
  content: string;
  words: string[];
  pois: Array<PointOfInterest> = [];

  constructor(fileName: string) {
    this.content = fs.readFileSync(fileName).toString();
    this.words = this.content.split(' ');
  }

  harvestDescriptions() {
    this.pois.forEach((poi, index) => {
      let start = poi.cursor;
      let end = this.words.length - 1;
      if (index < this.pois.length - 1) {
        end = this.pois[index + 1].cursor;
      }
      this.pois[index].description = marked(
        this.words.slice(start, end).join(' '),
      );
    });
  }

  getPoiName(index: number): [string, number] {
    let poiName = this.words[index];
    let max = 6;
    while (!poiName.startsWith('**') && max > 0) {
      poiName = `${this.words[index - 1]} ${poiName}`;
      index--;
      max--;
    }
    return [poiName, index];
  }

  generatePois() {
    let i = 0;
    this.words.forEach((token, index) => {
      if (token.length > 7) {
        if (isGridRef(token)) {
          const gridRef = normalizeGridref(token);
          let prevToken = this.words[index - 1];
          if (prevToken.endsWith('**')) {
            const poiName = this.getPoiName(index - 1);
            i++;
            this.pois.push(
              new PointOfInterest(poiName[0], gridRef, poiName[1]),
            );
          }
        }
      }
    });
  }

  save(fileName: string) {
    const s = JSON.stringify(this.pois);
    fs.writeFileSync(fileName, s, 'utf8');
  }
}
