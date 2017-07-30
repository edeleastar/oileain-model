const sanitize = require('sanitize-filename');
import { Grid } from '../model/poi';

export function isNumeric(s: string, pos: number): boolean {
  const char = s.charAt(pos);
  return char >= '0' && char <= '9';
}

export function isCapitalLetter(s: string, pos: number): boolean {
  const char = s.charAt(pos);
  return char >= 'A' && char <= 'Z';
}

export function isGridRef(str: string): boolean {
  return (
    isCapitalLetter(str, 0) &&
    isNumeric(str, 1) &&
    isNumeric(str, 2) &&
    isNumeric(str, 3)
  );
}

export function normalizeGridref(str: string): Grid {
  let gridstr = str.replace('-', '');
  gridstr = gridstr.replace(' ', '');
  gridstr = gridstr.trim();
  const gridRef = {
    sheet: gridstr.charAt(0),
    eastings: Number(gridstr.substr(1, 3)),
    northings: Number(gridstr.substr(4, 7)),
  };
  return gridRef;
}

export function generateSafeName(name: string): string {
  let safeName = sanitize(name);
  safeName = safeName.replace(/ /g, '-');
  return safeName;
}

export function simplifyName(name:string): string {
  return name.replace(/\*/g, '');
}
