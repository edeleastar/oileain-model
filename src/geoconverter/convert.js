var config = require('../../nightwatch-config.js');
const fs = require('fs');

var layers = require('../model/json/oileain-all.json');

function getLatLong(browser, grid, report) {
  browser
      .clearValue('input#txtiNGSq')
      .setValue('input#txtiNGSq', grid.sheet)
      .clearValue('input#txtiNGSqE')
      .setValue('input#txtiNGSqE', grid.eastings)
      .clearValue('input#txtiNGSqN')
      .setValue('input#txtiNGSqN', grid.northings)
      .click("form[name=frmOSIGr] input[type=submit][value='Convert > >'");

  browser.getValue('input#txtiGPSLat', function (result) {
    const lat = result.value;
    browser.getValue('input#txtiGPSLon', function (result) {
      report(lat, result.value);
    });
  });
}

module.exports = {
  GPE: function (browser) {
    //browser.url('http://www.fieldenmaps.info/cconv/cconv_ie.html');
    browser.url('file:////Users/edeleastar/repos/oileain/oileain-model/src/geoconverter/fielden.html');
    browser.waitForElementVisible('body');

    layers.forEach(layer => {
      layer.pois.forEach(poi => {
        getLatLong(browser, poi.grid, function report(lat, long) {
          const geo = {
            lat: lat,
            long: -long,
          };
          poi.geo = geo;
          console.log(poi.grid);
          console.log(lat + ':' + long);
        });
      });
    });
    browser.end();
  },

  after: function (done) {
    const s = JSON.stringify(layers);
    fs.writeFileSync('./src/model/json/oileain-all-geo.json', s, 'utf8');
  },
};
