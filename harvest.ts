//#!/usr/bin/env node

import { Oileain } from './src/model/oileain';
import { Parser } from './src/controllers/parser';

const parser = new Parser('./src/model/text/oileain.md');
const oileain = new Oileain();

parser.generatePois();
parser.harvestDescriptions();
parser.save('./src/model/json/oileain-poi.json');
oileain.categorize(parser);
oileain.save('./src/model/json/oileain-all.json');
