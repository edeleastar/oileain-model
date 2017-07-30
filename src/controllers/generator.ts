import {Coast} from "../model/poi";
import * as fs from "fs";
import {verifyFolder} from "../utils/futils";

function generateJson(obj:any, path:string) {
  const s = JSON.stringify(obj);
  fs.writeFileSync(path, s, 'utf8');
}

export function generateCoasts(coasts: Array<Coast>, path:string) {
  let coastsObj:any = [];
  coasts.forEach(coast => {
    let coastObj:any = {};
    coastObj.title = coast.title;
    coastObj.geo = coast.geo;
    coastObj.variable = coast.variable;
    coastsObj.push(coastObj);
  });
  generateJson(coastsObj, path);
}

export function generateEachCoast(coasts: Array<Coast>, path:string) {
  coasts.forEach(coast => {
    let coastObj:any = [];
    coast.pois.forEach(poi =>{
      let poiObj:any = {};
      poiObj.safeName = poi.safeName;
      poiObj.nameHtml = poi.nameHtml;
      poiObj.geo = poi.coordinates.geo;
      coastObj.push(poiObj);
    });
    generateJson(coastObj, path + '/' + coast.variable + '.json');
  });
}

export function generateAllSlim(coasts: Array<Coast>, path:string) {
  let coastsObj:any = [];
  coasts.forEach(coast => {
    let coastObj:any = {};
    coastObj.title = coast.title;
    coastObj.geo = coast.geo;
    coastObj.variable = coast.variable;
    coastObj.pois = [];
    coast.pois.forEach(poi=>{
      let poiObj:any = {};
      poiObj.nameHtml = poi.nameHtml;
      poiObj.safeName = poi.safeName;
      poiObj.coordinates = {geo:poi.coordinates.geo};
      coastObj.pois.push(poiObj);
    });
    coastsObj.push(coastObj);
  });
  generateJson(coastsObj, path);
}

export function generateAllIslands(coasts: Array<Coast>, path:string) {
  coasts.forEach(coast => {
    verifyFolder(path + '/' + coast.variable);
    coast.pois.forEach(poi=>{
       generateJson(poi, path + '/' + coast.variable + '/' + poi.safeName + '.json');
    });
  });

}