import {Coast} from "./src/model/poi";
import {generateAllIslands, generateAllSlim, generateCoasts, generateEachCoast} from "./src/controllers/generator";

let coasts: Array<Coast>;
coasts = require('./src/model/json/oileain-all-geo.json');

//generateCoasts(coasts, './src/model/json/api/coasts.json');

//generateEachCoast(coasts, './src/model/json/api');

generateAllSlim(coasts, './src/model/json/api/oileain-all-slim.json');
//generateAllIslands(coasts, './src/model/json/api');

