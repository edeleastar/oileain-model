import * as fs from 'fs';
import { Categories } from '../controllers/categoriser';
import { PointOfInterest, Coast } from './poi';
import { costalZoneNames, coasts } from './mapdata';
import { Parser } from '../controllers/parser';

export class Oileain {
  pois: Array<PointOfInterest>;
  coasts: Array<Coast> = coasts;

  constructor() {}

  categorize(parser: Parser) {
    const costalZones = new Categories('Costal Zones', costalZoneNames);
    costalZones.harvestCategories(parser.words);
    parser.pois.forEach(poi => {
      poi.costalZone = costalZones.getCategory(poi.cursor);
    });
    this.coasts.forEach(coast => {
      coast.pois = parser.pois.filter(poi => {
        if (poi.costalZone === coast.identifier) return poi;
      });
    });
  }

  printStats() {
    let count = 0;
    this.coasts.forEach(layer => {
      console.log(`${layer.title} : ${layer.pois.length}`);
      count += layer.pois.length;
    });
    console.log(`${count}`);
  }

  save(fileName: string) {
    const s = JSON.stringify(coasts);
    fs.writeFileSync(fileName, s, 'utf8');
  }
}
