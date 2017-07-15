const nunjucks = require('nunjucks');
import * as fs from 'fs';

export function publishTemplate(
    fileName: string,
    template: string,
    oileain : any,
): void {
  fs.writeFileSync(
      fileName,
      nunjucks.render(template, { oileain : oileain }),
      'utf8',
  );
}