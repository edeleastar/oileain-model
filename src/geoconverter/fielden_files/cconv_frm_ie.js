// FieldenMaps.info
// Co-ordinate Converter (Web) 'Page Interaction' JavaScript Functions [Ireland]
// Version 1.2.003
// Partly ported from original Visual Basic code
// Revision Date: 4 May 2009
// Copyright © 2004-2009 Ed Fielden


// AddLoadEvent function by Simon Willison (http://simonwillison.net/)

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}


// Display and convert initial position (Ireland = 53.35 deg N, 6.25 deg W)

addLoadEvent(function() {
  getELID("txtiLat").value = "53.35";
  getELID("txtiLon").value = "6.25";
  cmdiGeoD();
});


// Functions for disabling/enabling all input fields

function disableallinput() {
    var x=document.getElementsByTagName("input");
    for (var i=0;i<x.length;i++) { x[i].disabled = true; }
    var y=document.getElementsByTagName("select");
    for (var i=0;i<y.length;i++) { y[i].disabled = true; }
}

function enableallinput() {
    var x=document.getElementsByTagName("input");
    for (var i=0;i<x.length;i++) { x[i].disabled = false; }
    var y=document.getElementsByTagName("select");
    for (var i=0;i<y.length;i++) { y[i].disabled = false; }
}


// Initialise variable memory space

var georesult = new geodesic;
var tempgeoresult = new geodesic;
var latdms = new dmsdata;
var londms = new dmsdata;
var cooresult = new coord;
var tempcooresult = new coord;
var yardresult = new coord;
var refresult = new gridref;
var tempNGSq = new gridref;
var tempWOCGSq = new gridref;
var tempLat = new dmsdata;
var tempLon = new dmsdata;
var ctyresult = null;

var merid = false;
var nnnnn = 0;


// Initialise colours for text boxes

var txt_derived = '#0033FF';
var txt_altered = '#FF0033';
var txt_origin = '#000033';


// Input retrieval functions

function getELID(strelid) { return document.getElementById(strelid); }

function getDMS(strlat,strlon) {
   var LatDref = getELID(strlat+"D"); var LatMref = getELID(strlat+"M"); var LatSref = getELID(strlat+"S");
   var LonDref = getELID(strlon+"D"); var LonMref = getELID(strlon+"M"); var LonSref = getELID(strlon+"S");
   var inlatD = RoundDec(stringmask(LatDref.value, numerics), 0);
   var inlatM = RoundDec(stringmask(LatMref.value, numerics), 0);
   var inlatS = RoundDec(stringmask(LatSref.value, numerics_d), 4);
   var inlonD = RoundDec(stringmask(LonDref.value, numerics), 0);
   var inlonM = RoundDec(stringmask(LonMref.value, numerics), 0);
   var inlonS = RoundDec(stringmask(LonSref.value, numerics_d), 4);
   if (!isvalidigeodms(inlatD, inlatM, inlatS, inlonD, inlonM, inlonS)) { alert('Invalid Geodetic co-ordinate entry'); return false; }
     else { LatDref.value = inlatD; LatMref.value = inlatM; LatSref.value = inlatS;
            LonDref.value = inlonD; LonMref.value = inlonM; LonSref.value = inlonS; }
   var getDMSresult = new geodesic(deg2rad(inlatD+(inlatM/60)+(inlatS/3600)),deg2rad((inlonD+(inlonM/60)+(inlonS/3600))*-1));
   return getDMSresult;
}

function getD(strlat,strlon) {
   var inlata = RoundDec(stringmask(getELID(strlat).value, numerics_d), 8);
   var inlona = RoundDec(stringmask(getELID(strlon).value, numerics_d), 8);
   var newlat = getELID(strlat); var newlon = getELID(strlon);
   if (!isvalidigeo(inlata,inlona*-1)) { alert('Invalid Geodetic co-ordinate entry'); return false; }
     else { newlat.value = inlata; newlon.value = inlona; }
   var getDresult = new geodesic(deg2rad(inlata),deg2rad(inlona*-1));
   return getDresult;
}

function getcoord(strest,strnth,proj) {
   var east = RoundDec(stringmask(getELID(strest).value, numerics_d), 3);
   var north = RoundDec(stringmask(getELID(strnth).value, numerics_d), 3);
   var objrefe = getELID(strest); var objrefn = getELID(strnth);
   if (!isvalidcoord(east,north,proj)) { alert('Invalid Co-ordinate entry'); return false; }
     else { objrefe.value = east; objrefn.value = north;}
   var getcoordresult = new coord(east,north);
   return getcoordresult;
}

function getref(strsqr,strsqe,strsqn,proj,sqrary) {
   var objsq = getELID(strsqr); var objsqe = getELID(strsqe); var objsqn = getELID(strsqn);
   var insq = objsq.value;
   if (sqrary == OSIG_GS) { insq = stringmask(insq, alphabetics); insq = insq.toUpperCase(); }
   if (sqrary == WOIG_GS) { insq = stringmask(insq, alphabetics); var insqL = insq.toLowerCase(); var insqU = insq.toUpperCase(); if (insq.length == 2) { insq = insqL.substring(0,1) + insqU.substring(1); } }
   var inge = fivefig(stringmask(objsqe.value, numerics)); var ingn = fivefig(stringmask(objsqn.value, numerics));
   if (!isvalidgridref(insq,inge,ingn,proj,sqrary)) { alert('Invalid Grid Reference entry'); return false; }
      else { objsq.value = insq; objsqe.value = inge; objsqn.value = ingn; }
   var getrefresult = new gridref(insq,inge,ingn);
   return getrefresult;
}

function getcoordcmb(strest,strnth,strcbe,strcbn,proj) {
   var obje = getELID(strest); var objn = getELID(strnth);
   var east = RoundDec(stringmask(obje.value, numerics_d), 2); var north = RoundDec(stringmask(objn.value, numerics_d), 2);
   var wore = getELID(strcbe).value; var sorn = getELID(strcbn).value;
   if (!isvalidcoord(east*wore,north*sorn,proj)) { alert('Invalid Co-ordinate entry'); return false; }
     else { obje.value = east; objn.value = north;}
   var getcoordcmbresult = new coord(east*wore,north*sorn);
   return getcoordcmbresult;
}


// Button functions


function cmdiEDGeoDMS() {
  disableallinput;

   var getinput = getDMS("txtiEDLat","txtiEDLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iEDGeo(txt_origin);
   disp_iEDGeo_from_iEDGeoDMS(inlat, inlon); colourtext_iEDGeoD(txt_derived);
   disp_UTMED_from_iEDGeo(inlat, inlon); colourtext_UTMED(txt_derived);

   var georesult = disp_iGPSGeo_from_iEDGeo(inlat, inlon); colourtext_iGPSGeoD(txt_derived); colourtext_iGPSGeo(txt_derived);
   disp_ITM_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_UTMWGS(txt_derived);

   var newgeoresult = disp_iGeo_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_iGeoD(txt_derived); colourtext_iGeo(txt_derived);
   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}

function cmdiEDGeoD() {
   disableallinput;

   var getinput = getD("txtiEDLat","txtiEDLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iEDGeoD(txt_origin);
   disp_iEDGeoDMS_from_iEDGeo(inlat, inlon); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(inlat, inlon); colourtext_UTMED(txt_derived);

   var georesult = disp_iGPSGeo_from_iEDGeo(inlat, inlon); colourtext_iGPSGeoD(txt_derived); colourtext_iGPSGeo(txt_derived);
   disp_ITM_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_UTMWGS(txt_derived);

   var newgeoresult = disp_iGeo_from_iGPSGeo(georesult.latitude, georesult.longitude); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var newcooresult = disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);

   enableallinput;
   return true;
}

function cmdiGeoDMS() {
  disableallinput;

   var getinput = getDMS("txtiLat","txtiLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iGeo(txt_origin);
   disp_iGeo_from_iGeoDMS(inlat, inlon); colourtext_iGeoD(txt_derived);

   var newgeoresult = disp_iGPSGeo_from_iGeo(inlat, inlon); colourtext_iGPSGeoD(txt_derived); colourtext_iGPSGeo(txt_derived);
   disp_ITM_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_UTMWGS(txt_derived);

   var georesult2 = disp_iEDGeo_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_OSIG_from_iGeo(inlat, inlon); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_BONI_from_iGeo(inlat, inlon); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(inlat, inlon); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}

function cmdiGPSGeoDMS() {
  disableallinput;

   var getinput = getDMS("txtiGPSLat","txtiGPSLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iGPSGeo(txt_origin);
   disp_iGPSGeo_from_iGPSGeoDMS(inlat, inlon); colourtext_iGPSGeoD(txt_derived);
   disp_UTMWGS_from_iGPSGeo(inlat, inlon); colourtext_UTMWGS(txt_derived);
   disp_ITM_from_iGPSGeo(inlat, inlon); colourtext_ITM(txt_derived);

   var newgeoresult = disp_iGeo_from_iGPSGeo(inlat, inlon); colourtext_iGeoD(txt_derived); colourtext_iGeo(txt_derived);
   var georesult2 = disp_iEDGeo_from_iGPSGeo(inlat, inlon); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMED(txt_derived);

   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}

function cmdiGPSGeoD() {
   disableallinput;

   var getinput = getD("txtiGPSLat","txtiGPSLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iGPSGeoD(txt_origin);
   disp_iGPSGeoDMS_from_iGPSGeo(inlat, inlon); colourtext_iGPSGeo(txt_derived);
   disp_UTMWGS_from_iGPSGeo(inlat, inlon); colourtext_UTMWGS(txt_derived);
   disp_ITM_from_iGPSGeo(inlat, inlon); colourtext_ITM(txt_derived);

   var newgeoresult = disp_iGeo_from_iGPSGeo(inlat, inlon); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   var georesult2 = disp_iEDGeo_from_iGPSGeo(inlat, inlon); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMED(txt_derived);

   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var newcooresult = disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);

   enableallinput;
   return true;
}


function cmdiGeoD() {
   disableallinput;

   var getinput = getD("txtiLat","txtiLon");
   if (getinput == false) { enableallinput; return false; } else { var inlat = getinput.latitude; var inlon = getinput.longitude; }

   colourtext_iGeoD(txt_origin);
   disp_iGeoDMS_from_iGeo(inlat, inlon); colourtext_iGeo(txt_derived);
   disp_BONI_from_iGeo(inlat, inlon); colourtext_BONI(txt_derived);
   disp_OSIG_from_iGeo(inlat, inlon); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_WOIG_from_iGeo(inlat, inlon); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var newgeoresult = disp_iGPSGeo_from_iGeo(inlat, inlon); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_UTMWGS(txt_derived);

   var georesult2 = disp_iEDGeo_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMED(txt_derived);


   enableallinput;
   return true;
}

function cmdITMG() {
   disableallinput;

   var getinput = getcoord("txtITME","txtITMN",ITMG);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_ITM(txt_origin);
   var newgeoresult = disp_iGPSGeo_from_ITM(east, north); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_UTMWGS_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_UTMWGS(txt_derived);
   var georesulted = disp_iEDGeo_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);

   var georesult2 = disp_iGeo_from_iGPSGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_OSIG_from_iGeo(georesult2.latitude, georesult2.longitude); colourtext_OSIG(txt_derived);
   disp_BONI_from_iGeo(georesult2.latitude, georesult2.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(georesult2.latitude, georesult2.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}

function cmdOSIG() {
   disableallinput;

   var getinput = getcoord("txtiNGE","txtiNGN",OSIG);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_OSIG(txt_origin);
   disp_OSIGr_from_OSIG(east, north); colourtext_OSIGr(txt_derived);
   var newgeoresult = disp_iGeo_from_OSIG(east, north); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var georesult2 = disp_iGPSGeo_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMWGS(txt_derived);

   var georesulted = disp_iEDGeo_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);

   disp_ITM_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_ITM(txt_derived);

   enableallinput;
   return true;
}


function cmdOSIGr() {
   disableallinput;

   var getinput = getref("txtiNGSq","txtiNGSqE","txtiNGSqN",OSIG,OSIG_GS);
   if (getinput == false) { enableallinput; return false; } else { var insq = getinput.square; var inge = getinput.eastings; var ingn = getinput.northings; }

   colourtext_OSIGr(txt_origin);
   cooresult = disp_OSIG_from_OSIGr(insq, inge, ingn); colourtext_OSIG(txt_derived);
   var newgeoresult = disp_iGeo_from_OSIG(RoundDec(cooresult.eastings, 3), RoundDec(cooresult.northings, 3)); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var georesult2 = disp_iGPSGeo_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMWGS(txt_derived);

   var georesulted = disp_iEDGeo_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);

   disp_ITM_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_ITM(txt_derived);

   enableallinput;
   return true;
}

function cmdWOIG() {
   disableallinput;

   var getinput = getcoord("txtWOIGE","txtWOIGN",WOIG);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_WOIG(txt_origin);
   disp_WOIGr_from_WOIG(east, north); colourtext_WOIGr(txt_derived);
   var newgeoresult = disp_iGeo_from_WOIG(east, north); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   var georesult2 = disp_iGPSGeo_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMWGS(txt_derived);

   var georesulted = disp_iEDGeo_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);


   enableallinput;
   return true;
}

function cmdWOIGr() {
   disableallinput;

   var getinput = getref("txtWOIGSq","txtWOIGSqE","txtWOIGSqN",WOIG,WOIG_GS);
   if (getinput == false) { enableallinput; return false; } else { var insq = getinput.square; var inge = getinput.eastings; var ingn = getinput.northings; }

   colourtext_WOIGr(txt_origin);
   cooresult = disp_WOIG_from_WOIGr(insq, inge, ingn); colourtext_WOIG(txt_derived);
   var newgeoresult = disp_iGeo_from_WOIG(RoundDec(cooresult.eastings, 3), RoundDec(cooresult.northings, 3)); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   var georesult2 = disp_iGPSGeo_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMWGS(txt_derived);

   var georesulted = disp_iEDGeo_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);

   enableallinput;
   return true;
}


function cmdBONI() {
   disableallinput;

   var getinput = getcoordcmb("txtBNIE","txtBNIN","cmbBNIE","cmbBNIN",BONI);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_BONI(txt_origin);
   var newgeoresult = disp_iGeo_from_BONI(east, north); colourtext_iGeo(txt_derived); colourtext_iGeoD(txt_derived);
   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);
   var georesult2 = disp_iGPSGeo_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_iGPSGeo(txt_derived); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_UTMWGS(txt_derived);

   var georesulted = disp_iEDGeo_from_iGPSGeo(georesult2.latitude, georesult2.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(georesulted.latitude, georesulted.longitude); colourtext_UTMED(txt_derived);


   enableallinput;
   return true;
}


function cmdUTMWGS() {
   disableallinput;

   var utmzonesel = getELID("cmbUTMWGS").value;
   if (utmzonesel == -2) { projtemp = UTM29_WGS; }
   if (utmzonesel == -1) { projtemp = UTM30_WGS; }
   var getinput = getcoord("txtUTMWGSE","txtUTMWGSN",projtemp);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_UTMWGS(txt_origin);

   var gpsgeoresult = disp_iGPSGeo_from_UTMWGS(east,north,projtemp); colourtext_iGPSGeoD(txt_derived); colourtext_iGPSGeo(txt_derived);
   if (gpsgeoresult == false) { alert('UTM co-ordinate is out of range'); enableallinput; return false; }

   disp_iGPSGeo_from_iGPSGeoDMS(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_ITM(txt_derived);
   var newgeoresult = disp_iGeo_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_iGeoD(txt_derived); colourtext_iGeo(txt_derived);
   var edgeoresult = disp_iEDGeo_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   disp_UTMED_from_iEDGeo(edgeoresult.latitude, edgeoresult.longitude); colourtext_UTMED(txt_derived);

   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}


function cmdUTMED() {
   disableallinput;

   var utmzonesel = getELID("cmbUTMED").value;
   if (utmzonesel == -2) { projtemp = UTM29_ED; }
   if (utmzonesel == -1) { projtemp = UTM30_ED; }
   var getinput = getcoord("txtUTMEDE","txtUTMEDN",projtemp);
   if (getinput == false) { enableallinput; return false; } else { var east = getinput.eastings; var north = getinput.northings; }

   colourtext_UTMED(txt_origin);

   var edgeoresult = disp_iEDGeo_from_UTMED(east,north,projtemp); colourtext_iEDGeoD(txt_derived); colourtext_iEDGeo(txt_derived);
   if (edgeoresult == false) { alert('UTM co-ordinate is out of range'); enableallinput; return false; }

   var gpsgeoresult = disp_iGPSGeo_from_iEDGeo(edgeoresult.latitude, edgeoresult.longitude); colourtext_iGPSGeoD(txt_derived); colourtext_iGPSGeo(txt_derived);
   disp_iGPSGeo_from_iGPSGeoDMS(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_iGPSGeoD(txt_derived);
   disp_ITM_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_ITM(txt_derived);
   disp_UTMWGS_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_UTMWGS(txt_derived);

   var newgeoresult = disp_iGeo_from_iGPSGeo(gpsgeoresult.latitude, gpsgeoresult.longitude); colourtext_iGeoD(txt_derived); colourtext_iGeo(txt_derived);
   disp_OSIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_OSIG(txt_derived); colourtext_OSIGr(txt_derived);
   disp_BONI_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_BONI(txt_derived);
   disp_WOIG_from_iGeo(newgeoresult.latitude, newgeoresult.longitude); colourtext_WOIG(txt_derived); colourtext_WOIGr(txt_derived);

   enableallinput;
   return true;
}




// Result display functions


function putiGeo(latlon) {
   var newlat = getELID("txtiLat"); var newlon = getELID("txtiLon");
   latt = RoundDec(rad2deg(latlon.latitude), 8);
   lonn = RoundDec(rad2deg(latlon.longitude), 8);
   newlat.value = Math.abs(latt);
   newlon.value = Math.abs(lonn);
   disp_iGeoDMS_from_iGeo(latlon.latitude, latlon.longitude);
      var georesult2 = new geodesic(deg2rad(latt),deg2rad(lonn));
   return georesult2;
}

function putiGPSGeo(latlon) {
   var newlat = getELID("txtiGPSLat"); var newlon = getELID("txtiGPSLon");
   latt = RoundDec(rad2deg(latlon.latitude), 8);
   lonn = RoundDec(rad2deg(latlon.longitude), 8);
   newlat.value = Math.abs(latt);
   newlon.value = Math.abs(lonn);
   disp_iGPSGeoDMS_from_iGPSGeo(latlon.latitude, latlon.longitude);
      var georesult2 = new geodesic(deg2rad(latt),deg2rad(lonn));
   return georesult2;
}

function putiEDGeo(latlon) {
   var newlat = getELID("txtiEDLat"); var newlon = getELID("txtiEDLon");
   latt = RoundDec(rad2deg(latlon.latitude), 8);
   lonn = RoundDec(rad2deg(latlon.longitude), 8);
   newlat.value = Math.abs(latt);
   newlon.value = Math.abs(lonn);
   disp_iEDGeoDMS_from_iEDGeo(latlon.latitude, latlon.longitude);
      var georesult2 = new geodesic(deg2rad(latt),deg2rad(lonn));
   return georesult2;
}

function putref(reftemp,strpfx) {
   getELID(strpfx+"Sq").value = reftemp.square;
   getELID(strpfx+"SqE").value = reftemp.eastings;
   getELID(strpfx+"SqN").value = reftemp.northings;
}

function putcoord(cootemp,strpfx) {
   getELID(strpfx+"E").value = RoundDec(cootemp.eastings, 3);
   getELID(strpfx+"N").value = RoundDec(cootemp.northings, 3);
}

function blankref(strpfx) {
   getELID(strpfx+"Sq").value='-'; getELID(strpfx+"SqE").value='-'; getELID(strpfx+"SqN").value='-';
}

function putcoord2(cootemp,strpfx,proj) {
   var obje = getELID(strpfx+"E"); var objn = getELID(strpfx+"N");
   var roundeast = RoundDec(cootemp.eastings, 3);
   var roundnorth = RoundDec(cootemp.northings, 3);
   if (roundeast < proj.e_min || roundeast >= proj.e_max || roundnorth < proj.n_min || roundnorth >= proj.n_max) {
       obje.value = "-"; objn.value = "-"; return false;
     } else { obje.value = roundeast; objn.value = roundnorth; return cootemp; }
}

function putDMS(latt,lonn,strpfx) {
   var lattt = RoundDec(rad2deg(latt), 8); var lonnn = RoundDec(rad2deg(lonn), 8);
   var newlatD = getELID(strpfx+"LatD"); var newlatM = getELID(strpfx+"LatM"); var newlatS = getELID(strpfx+"LatS");
   var newlonD = getELID(strpfx+"LonD"); var newlonM = getELID(strpfx+"LonM"); var newlonS = getELID(strpfx+"LonS");
   var dmsres = sec2dms(Math.abs(lattt) * 3600);
   newlatD.value = dmsres.degrees; newlatM.value = dmsres.minutes; newlatS.value = dmsres.seconds;
   dmsres = sec2dms(Math.abs(lonnn) * 3600);
   newlonD.value = dmsres.degrees; newlonM.value = dmsres.minutes; newlonS.value = dmsres.seconds;
}

function putcoordcmb(cootemp,strpfx,strcbp,proj) {
   var obje = getELID(strpfx+"E"); var objn = getELID(strpfx+"N");
   var wore = getELID(strcbp+"E"); var sorn = getELID(strcbp+"N");
   var roundeast = RoundDec(cootemp.eastings, 2);
   var roundnorth = RoundDec(cootemp.northings, 2);
   if (roundeast < proj.e_min || roundeast >= proj.e_max || roundnorth < proj.n_min || roundnorth >= proj.n_max) {
       obje.value = "-"; objn.value = "-"; wore.value = 1 ; sorn.value = 1;
      } else {
       obje.value = Math.abs(roundeast); objn.value = Math.abs(roundnorth);
       if (roundeast < 0) { wore.value = -1; } else { wore.value = 1; }
       if (roundnorth < 0) { sorn.value = -1; } else { sorn.value = 1; }
      }
}


function disp_WOIG_from_WOIGr(insq, inge, ingn) {
   var newcooresult = conv_GR2EN(insq, inge, ingn, WOIG_GS);
   putcoord(newcooresult,"txtWOIG");
   return newcooresult;
}

function disp_WOIGr_from_WOIG(east, north) {
   refresult = conv_EN2GR(east, north, WOIG_GS);
   putref(refresult,"txtWOIG");
}


function disp_iGeoDMS_from_iGeo(latt, lonn) {
   putDMS(latt,lonn,"txti");
   return true;
}

function disp_iGPSGeoDMS_from_iGPSGeo(latt, lonn) {
   putDMS(latt,lonn,"txtiGPS");
   return true;
}

function disp_iEDGeo_from_iGPSGeo(latt, lonn) {
   georesult = Geo2Geo(latt, lonn, WGS84, ED50);
   return putiEDGeo(georesult);
}

function disp_iGPSGeo_from_iGPSGeoDMS(latt, lonn) {
   var lattt = rad2deg(latt); var lonnn = rad2deg(lonn);
   var newlat = getELID("txtiGPSLat"); var newlon = getELID("txtiGPSLon");
   newlat.value = RoundDec(Math.abs(lattt), 8);
   lonnn = RoundDec(Math.abs(lonnn), 8);
   if (lonnn < 1)
        { newlon.value = smallnum2string(lonnn) }
   else { newlon.value = lonnn.toString(); }
   return true;
}

function disp_iGeo_from_iGeoDMS(latt, lonn) {
   var lattt = rad2deg(latt); var lonnn = rad2deg(lonn);
   var newlat = getELID("txtiLat"); var newlon = getELID("txtiLon");
   newlat.value = RoundDec(Math.abs(lattt), 8);
   lonnn = RoundDec(Math.abs(lonnn), 8);
   if (lonnn < 1)
        { newlon.value = smallnum2string(lonnn) }
   else { newlon.value = lonnn.toString(); }
   return true;
}

function disp_OSIG_from_iGeo(inlat, inlon) {
   var cooresult = Geo2TM(inlat, inlon, OSIG);
   var temp2 = putcoord2(cooresult,"txtiNG",OSIG);
   if (temp2 == false) { blankref("txtiNG"); }
       else { disp_OSIGr_from_OSIG(cooresult.eastings, cooresult.northings); }
   return cooresult;
}

function disp_WOIG_from_iGeo(inlat, inlon) {
   var cooresult = Geo2CS(inlat, inlon, WOIG);
   var temp2 = putcoord2(cooresult,"txtWOIG",WOIG);
   if (temp2 == false) { blankref("txtWOIG"); }
       else { disp_WOIGr_from_WOIG(cooresult.eastings, cooresult.northings); }
   return cooresult;
}

function disp_iGeo_from_WOIG(eeee, nnnn) {
   georesult = CS2Geo(eeee, nnnn, WOIG);
   var georesult2 = putiGeo(georesult);
   return georesult2;
}

function disp_OSIGr_from_OSIG(east, north) {
   refresult = conv_EN2GR(east, north, OSIG_GS);
   putref(refresult,"txtiNG");
}

function disp_OSIG_from_OSIGr(insq, inge, ingn) {
   var newcooresult = conv_GR2EN(insq, inge, ingn, OSIG_GS);
   putcoord(newcooresult,"txtiNG");
   return newcooresult;
}

function disp_iGeo_from_OSIG(eeee, nnnn) {
   georesult = TM2Geo(eeee, nnnn, OSIG);
   var georesult2 = putiGeo(georesult);
   return georesult2;
}

function disp_iGPSGeo_from_ITM(eeee, nnnn) {
   georesult = TM2Geo(eeee, nnnn, ITMG);
   var georesult2 = putiGPSGeo(georesult);
   return georesult2;
}

function disp_ITM_from_iGPSGeo(inlat, inlon) {
   var cooresult = Geo2TM(inlat, inlon, ITMG);
   putcoord2(cooresult,"txtITM",ITMG);
   return cooresult;
}

function disp_iGeo_from_iGPSGeo(llat, llon) {
   georesult = WGS842OSI65(llat, llon);
   var georesult2 = putiGeo(georesult);
   return georesult2;
}

function disp_UTMWGS_from_iGPSGeo(latt, lonn) {
   if (lonn < deg2rad(-6)) { projtemp = UTM29_WGS; getELID("cmbUTMWGS").value = -2; }
   if (lonn < deg2rad(0) && lonn >= deg2rad(-6)) { projtemp = UTM30_WGS; getELID("cmbUTMWGS").value = -1; }
   var newcooresult = Geo2TM(latt, lonn, projtemp);
   putcoord(newcooresult,"txtUTMWGS");
   return newcooresult;
}

function disp_UTMED_from_iEDGeo(latt, lonn) {
   if (lonn < deg2rad(-6)) { projtemp = UTM29_ED; getELID("cmbUTMED").value = -2; }
   if (lonn < deg2rad(0) && lonn >= deg2rad(-6)) { projtemp = UTM30_ED; getELID("cmbUTMED").value = -1; }
   var newcooresult = Geo2TM(latt, lonn, projtemp);
   putcoord(newcooresult,"txtUTMED");
   return newcooresult;
}

function disp_iEDGeo_from_iEDGeoDMS(latt, lonn) {
   var lattt = rad2deg(latt); var lonnn = rad2deg(lonn);
   var newlat = getELID("txtiEDLat"); var newlon = getELID("txtiEDLon");
   newlat.value = RoundDec(Math.abs(lattt), 8);
   lonnn = RoundDec(lonnn, 8);
   if (Math.abs(lonnn) < 1)
        { newlon.value = smallnum2string(Math.abs(lonnn)) }
   else { newlon.value = Math.abs(lonnn).toString(); }
   return true;
}

function disp_iEDGeoDMS_from_iEDGeo(latt, lonn) {
   putDMS(latt,lonn,"txtiED");
   return true;
}

function disp_iGPSGeo_from_iGeo(llat, llon) {
   georesult = OSI652WGS84(llat, llon);
   var georesult2 = putiGPSGeo(georesult);
   return georesult2;
}

function disp_iGPSGeo_from_iEDGeo(latt, lonn) {
   georesult = Geo2Geo(latt, lonn, ED50, WGS84);
   return putiGPSGeo(georesult);
}

function disp_BONI_from_iGeo(inlat, inlon) {
   var cooresult = Geo2BN(inlat, inlon, BONI);
   putcoordcmb(cooresult,"txtBNI","cmbBNI",BONI);
   return true;
}

function disp_iGeo_from_BONI(eeee, nnnn) {
   georesult = BN2Geo(eeee, nnnn, BONI);
   var georesult2 = putiGeo(georesult);
   return georesult2;
}

function disp_iGPSGeo_from_UTMWGS(east, north, proj) {
   georesult = TM2Geo(east, north, proj);
   if (!isvalidigeo(rad2deg(georesult.latitude),rad2deg(georesult.longitude))) { return false; }
   if (georesult.longitude < (proj.Lon0-deg2rad(3)))
   {
      cooresult = Geo2TM(georesult.latitude,proj.Lon0-deg2rad(3),proj);
      if (east < (cooresult.eastings-40000)) { return false; }
   }
   if (georesult.longitude < (proj.Lon0+deg2rad(3)))
   {
      cooresult = Geo2TM(georesult.latitude,proj.Lon0+deg2rad(3),proj);
      if (east > (cooresult.eastings+40000)) { return false; }
   }
   return putiGPSGeo(georesult);
}

function disp_iEDGeo_from_UTMED(east, north, proj) {
   georesult = TM2Geo(east, north, proj);
   if (!isvalidigeo(rad2deg(georesult.latitude),rad2deg(georesult.longitude))) { return false; }
   if (georesult.longitude < (proj.Lon0-deg2rad(3)))
   {
      cooresult = Geo2TM(georesult.latitude,proj.Lon0-deg2rad(3),proj);
      if (east < (cooresult.eastings-40000)) { return false; }
   }
   if (georesult.longitude < (proj.Lon0+deg2rad(3)))
   {
      cooresult = Geo2TM(georesult.latitude,proj.Lon0+deg2rad(3),proj);
      if (east > (cooresult.eastings+40000)) { return false; }
   }
   return putiEDGeo(georesult);
}


// Text colouring functions

function colourtext(elid, coll) {
   var elhandle = getELID(elid); elhandle.style.color = coll;
   return true;
}

function colourtext_iGeo(colsel) {
   colourtext("txtiLatD", colsel); colourtext("txtiLatM", colsel); colourtext("txtiLatS", colsel);
   colourtext("txtiLonD", colsel); colourtext("txtiLonM", colsel); colourtext("txtiLonS", colsel);
   return true;
}

function colourtext_iGeoD(colsel) {
   colourtext("txtiLat", colsel); colourtext("txtiLon", colsel);
   return true;
}

function colourtext_iEDGeo(colsel) {
   colourtext("txtiEDLatD", colsel); colourtext("txtiEDLatM", colsel); colourtext("txtiEDLatS", colsel);
   colourtext("txtiEDLonD", colsel); colourtext("txtiEDLonM", colsel); colourtext("txtiEDLonS", colsel);
   return true;
}

function colourtext_iEDGeoD(colsel) {
   colourtext("txtiEDLat", colsel); colourtext("txtiEDLon", colsel);
   return true;
}

function colourtext_iGPSGeo(colsel) {
   colourtext("txtiGPSLatD", colsel); colourtext("txtiGPSLatM", colsel); colourtext("txtiGPSLatS", colsel);
   colourtext("txtiGPSLonD", colsel); colourtext("txtiGPSLonM", colsel); colourtext("txtiGPSLonS", colsel);
   return true;
}

function colourtext_iGPSGeoD(colsel) {
   colourtext("txtiGPSLat", colsel); colourtext("txtiGPSLon", colsel);
   return true;
}

function colourtext_UTMWGS(colsel) {
   colourtext("txtUTMWGSE", colsel); colourtext("txtUTMWGSN", colsel); colourtext("cmbUTMWGS", colsel);
   return true;
}

function colourtext_UTMED(colsel) {
   colourtext("txtUTMEDE", colsel); colourtext("txtUTMEDN", colsel); colourtext("cmbUTMED", colsel);
   return true;
}

function colourtext_OSIG(colsel) {
   colourtext("txtiNGE", colsel); colourtext("txtiNGN", colsel);
   return true;
}

function colourtext_OSIGr(colsel) {
   colourtext("txtiNGSq", colsel); colourtext("txtiNGSqE", colsel); colourtext("txtiNGSqN", colsel);
   return true;
}

function colourtext_BONI(colsel) {
   colourtext("txtBNIE", colsel); colourtext("txtBNIN", colsel); colourtext("cmbBNIE", colsel); colourtext("cmbBNIN", colsel);
   return true;
}

function colourtext_ITM(colsel) {
   colourtext("txtITME", colsel); colourtext("txtITMN", colsel);
   return true;
}

function colourtext_WOIG(colsel) {
   colourtext("txtWOIGE", colsel); colourtext("txtWOIGN", colsel);
   return true;
}

function colourtext_WOIGr(colsel) {
   colourtext("txtWOIGSq", colsel); colourtext("txtWOIGSqE", colsel); colourtext("txtWOIGSqN", colsel);
   return true;
}