"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const config = require('../../nightwatch-config.js');
const fs = require('fs');
let coasts;
coasts = require('../model/json/oileain-all.json');
function getCoordinates(browser, grid, report) {
    const coordinates = {
        irishGrid: grid,
        fullIrishGrid: { sheet: '', eastings: 0, northings: 0 },
        tmcGrid: { sheet: '', eastings: 0, northings: 0 },
        geo: { lat: 0, long: 0 }
    };
    browser
        .clearValue('input#txtiNGSq')
        .setValue('input#txtiNGSq', grid.sheet)
        .clearValue('input#txtiNGSqE')
        .setValue('input#txtiNGSqE', grid.eastings)
        .clearValue('input#txtiNGSqN')
        .setValue('input#txtiNGSqN', grid.northings)
        .click("form[name=frmOSIGr] input[type=submit][value='Convert > >'");
    browser.getValue('input#txtiGPSLat', function (result) {
        coordinates.geo.lat = result.value;
        browser.getValue('input#txtiGPSLon', function (result) {
            coordinates.geo.long = result.value;
            browser.getValue('input#txtiGPSLon', function (result) {
                coordinates.geo.long = result.value;
                browser.getValue('input#txtiNGE', function (result) {
                    coordinates.fullIrishGrid.eastings = result.value;
                    browser.getValue('input#txtiNGN', function (result) {
                        coordinates.fullIrishGrid.northings = result.value;
                        browser.getValue('input#txtITME', function (result) {
                            coordinates.tmcGrid.eastings = result.value;
                            browser.getValue('input#txtITMN', function (result) {
                                coordinates.tmcGrid.northings = result.value;
                                report(coordinates);
                            });
                        });
                    });
                });
            });
        });
    });
}
module.exports = {
    GPE: function (browser) {
        //browser.url('http://www.fieldenmaps.info/cconv/cconv_ie.html');
        browser.url('file:////Users/edeleastar/repos/oileain/oileain-model/src/geoconverter/fielden.html');
        browser.waitForElementVisible('body');
        coasts.forEach(coast => {
            coast.pois.forEach(poi => {
                getCoordinates(browser, poi.coordinates.irishGrid, function report(result) {
                    poi.coordinates = result;
                    poi.coordinates.geo.long = -poi.coordinates.geo.long;
                    console.log(poi.coordinates);
                });
            });
        });
        //browser.end();
    },
    after: function (done) {
        const s = JSON.stringify(coasts);
        fs.writeFileSync('./src/model/json/oileain-all-geo.json', s, 'utf8');
    },
};
//# sourceMappingURL=convert.js.map