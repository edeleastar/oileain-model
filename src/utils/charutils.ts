const sanitize = require('sanitize-filename');
import { GridRef } from '../models/poi';

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

export function normalizeGridref(str: string): GridRef {
  let gridstr = str.replace('-', '');
  gridstr = gridstr.replace(' ', '');
  gridstr = gridstr.trim();
  const gridRef = {
    sheet: gridstr.charAt(0),
    eastings: gridstr.substr(1, 3),
    northings: gridstr.substr(4, 7),
  };
  return gridRef;
}

export function generateSafeName(name: string): string {
  let safeName = sanitize(name);
  safeName = safeName.replace(/ /g, '-');
  return safeName;
}
