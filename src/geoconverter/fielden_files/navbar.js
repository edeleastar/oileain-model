// FieldenMaps.info
// Navigation Bar JavaScript Functions
// Version 1.41
// Revision Date: 26 Jan 2017
// Copyright 2007-2017 Ed Fielden


// URL modifier - forces browser location to www.fieldenmaps.info and deletes any 'index.html' suffixes

 // var redir = false; var redirurl = document.URL;
 //    // check for and remove "index.html" except when reached through localhost
 // if (redirurl.indexOf('/index.html') != -1 && document.domain != 'localhost' && document.domain != '') {
 //   redirurl = redirurl.substring(0, redirurl.indexOf('/index.html') + 1);
 //   redir = true; }
 //    // if redir flag set, redirect the page to the new location
 // if (redir == true) { window.location.replace(redirurl); }


// Object creator - Defines the structure of the combined string/uri variables

function cmb() {
	this.str = '';  // Navbar wording
	this.sts = '';	// Browser Title Bar wording
	this.uri = '';  // URL for link
}


// String Variables - creates string/uri variables for each of the levels in the website

	var cmb_home = new cmb;
		cmb_home.str = 'HOME';
		cmb_home.uri = 'http://www.fieldenmaps.info/';

	var cmb_cconv = new cmb;
		cmb_cconv.str = 'Co-ordinate Converter';
		cmb_cconv.uri = 'http://www.fieldenmaps.info/cconv/';

	var cmb_info = new cmb;
		cmb_info.str = 'Illustrated Guide to Ordnance Survey Map Series';
		cmb_info.sts = 'OS Map Series Illustrated Guide';
		cmb_info.uri = 'http://www.fieldenmaps.info/info/';

	var cmb_arti = new cmb;
		cmb_arti.str = 'Articles &amp; Research';
		cmb_arti.sts = 'Articles & Research';
		cmb_arti.uri = 'http://www.fieldenmaps.info/articles/';

	var cmb_ciren = new cmb;
		cmb_ciren.str = 'Ed\'s Map Collection - Cirencester Area';
		cmb_ciren.sts = 'Map Collection';
		cmb_ciren.uri = 'http://www.fieldenmaps.info/cirenmap/';
	var cmb_25k = new cmb;
		cmb_25k.str = 'OS 1:25&nbsp;000 Maps';
		cmb_25k.sts = 'OS 1:25 000 Maps';
		cmb_25k.uri  = 'http://www.fieldenmaps.info/cirenmap/25k/';
	var cmb_50k = new cmb;
		cmb_50k.str = 'OS 1:50&nbsp;000 Maps';
		cmb_50k.sts = 'OS 1:50 000 Maps';
		cmb_50k.uri  = 'http://www.fieldenmaps.info/cirenmap/50k/';
	var cmb_1in = new cmb;
		cmb_1in.str = 'OS 1-inch Maps';
		cmb_1in.uri  = 'http://www.fieldenmaps.info/cirenmap/1in/';
	var cmb_1in_mil = new cmb;
		cmb_1in_mil.str = 'OS 1-inch Military Maps';
		cmb_1in_mil.uri  = 'http://www.fieldenmaps.info/cirenmap/1in_mil/';
	var cmb_osoth_hq = new cmb;
		cmb_osoth_hq.str = 'OS Half-inch & Quarter-inch Maps';
		cmb_osoth_hq.uri  = 'http://www.fieldenmaps.info/cirenmap/halfquar/';
	var cmb_osoth_tm = new cmb;
		cmb_osoth_tm.str = 'Ordnance Survey \'Ten-Mile\' Maps';
		cmb_osoth_tm.sts = 'OS \'Ten-Mile\' Maps';
		cmb_osoth_tm.uri  = 'http://www.fieldenmaps.info/cirenmap/tenmile/';
	var cmb_osoth_mil = new cmb;
		cmb_osoth_mil.str = 'OS Small-Scale Military & Aviation Maps';
		cmb_osoth_mil.uri  = 'http://www.fieldenmaps.info/cirenmap/military/';
	var cmb_osoth_dt = new cmb;
		cmb_osoth_dt.str = 'OS Tourist & District Maps';
		cmb_osoth_dt.uri  = 'http://www.fieldenmaps.info/cirenmap/tourist/';
	var cmb_osoth_ls = new cmb;
		cmb_osoth_ls.str = 'Ordnance Survey Large Scale Maps';
		cmb_osoth_ls.sts = 'OS Large Scale Maps';
		cmb_osoth_ls.uri  = 'http://www.fieldenmaps.info/cirenmap/lscale/';
	var cmb_osoth_hs = new cmb;
		cmb_osoth_hs.str = 'Ordnance Survey Historical Maps';
		cmb_osoth_hs.sts = 'OS Historical Maps';
		cmb_osoth_hs.uri  = 'http://www.fieldenmaps.info/cirenmap/hist/';
	var cmb_osoth_cs = new cmb;
		cmb_osoth_cs.str = 'Custom Ordnance Survey Maps';
		cmb_osoth_cs.sts = 'Custom OS Maps';
		cmb_osoth_cs.uri  = 'http://www.fieldenmaps.info/cirenmap/custom/';
	var cmb_osoth_ot = new cmb;
		cmb_osoth_ot.str = 'Other Ordnance Survey Maps';
		cmb_osoth_ot.sts = 'Other OS Maps';
		cmb_osoth_ot.uri  = 'http://www.fieldenmaps.info/cirenmap/osother/';
	var cmb_other = new cmb;
		cmb_other.str = 'Other Maps';
		cmb_other.uri  = 'http://www.fieldenmaps.info/cirenmap/other/';

	var cmb_theme = new cmb;
		cmb_theme.str = 'Ed\'s Map Collection - Themed Categories';
		cmb_theme.sts = 'Map Collection';
		cmb_theme.uri = 'http://www.fieldenmaps.info/thememap/';
	var cmb_city = new cmb;
		cmb_city.str = 'OS 1:10&nbsp;000 City, Town & Neighbourhood Maps';
		cmb_city.sts = 'OS 1:10 000 City, Town & Neighbourhood Maps';
		cmb_city.uri  = 'http://www.fieldenmaps.info/thememap/city/';
	var cmb_25kPRW = new cmb;
		cmb_25kPRW.str = 'OS 1:25&nbsp;000 First Series RoW Overprints';
		cmb_25kPRW.sts = 'OS 1:25 000 First Series Rights of Way Overprints';
		cmb_25kPRW.uri = 'http://www.fieldenmaps.info/thememap/25kPRW/';
	var cmb_25kPFM = new cmb;
		cmb_25kPFM.str = 'OS 1:25&nbsp;000 Second Series 1996-logo reprints';
		cmb_25kPFM.sts = 'OS 1:25 000 Second Series 1996-logo reprints';
		cmb_25kPFM.uri = 'http://www.fieldenmaps.info/thememap/25kPFM/';
	var cmb_OL3a = new cmb;
		cmb_OL3a.str = 'OS 1:25&nbsp;000 \'Outdoor Leisure\' Early Photo Covers';
		cmb_OL3a.sts = 'OS 1:25 000 \'Outdoor Leisure\' Early Photo Covers';
		cmb_OL3a.uri = 'http://www.fieldenmaps.info/thememap/OL3a/';
	var cmb_25kEXO = new cmb;
		cmb_25kEXO.str = 'OS 1:25&nbsp;000 \'Explorer\' Original Series';
		cmb_25kEXO.sts = 'OS 1:25 000 \'Explorer\' Original Series';
		cmb_25kEXO.uri = 'http://www.fieldenmaps.info/thememap/25kEXO/';
	var cmb_25kEXGM = new cmb;
		cmb_25kEXGM.str = 'OS 1:25&nbsp;000 \'Explorer\' Greenwich Meridian';
		cmb_25kEXGM.sts = 'OS 1:25 000 \'Explorer\' Greenwich Meridian Editions';
		cmb_25kEXGM.uri = 'http://www.fieldenmaps.info/thememap/25kEXGM/';
	var cmb_50kInt = new cmb;
		cmb_50kInt.str = 'OS 1:50&nbsp;000 Landranger Integral Covers';
		cmb_50kInt.sts = 'OS 1:50 000 Landranger Integral Covers';
		cmb_50kInt.uri = 'http://www.fieldenmaps.info/thememap/50kInt/';
	var cmb_50k3a = new cmb;
		cmb_50k3a.str = 'OS 1:50&nbsp;000 Landranger \'3a\' Covers';
		cmb_50k3a.sts = 'OS 1:50 000 Landranger \'3a\' Covers';
		cmb_50k3a.uri = 'http://www.fieldenmaps.info/thememap/50k3a/';
	var cmb_NPEM = new cmb;
		cmb_NPEM.str = 'OS 1-inch New Popular Edition Ellis Martin Covers';
		cmb_NPEM.uri = 'http://www.fieldenmaps.info/thememap/NPEM/';
	var cmb_HIGB = new cmb;
		cmb_HIGB.str = 'OS Half-inch Map of Great Britain';
		cmb_HIGB.sts = 'OS Half-inch Map of Great Britain';
		cmb_HIGB.uri = 'http://www.fieldenmaps.info/thememap/HIGB/';
	var cmb_citylink = new cmb;
		cmb_citylink.str = 'OS 1:126&nbsp;720 \'City Link\' Maps';
		cmb_citylink.sts = 'OS 1:126 720 \'City Link\' Maps';
		cmb_citylink.uri = 'http://www.fieldenmaps.info/thememap/citylink/';
	var cmb_eire = new cmb;
		cmb_eire.str = 'Ordnance Survey Ireland Maps';
		cmb_eire.sts = 'OS Ireland Maps';
		cmb_eire.uri = 'http://www.fieldenmaps.info/thememap/eire/';
	var cmb_blue = new cmb;
		cmb_blue.str = 'OS Explorer/Landranger Covers w/ blue spine lettering';
		cmb_blue.sts = 'OS Explorer & Landranger Covers with blue spine lettering';
		cmb_blue.uri = 'http://www.fieldenmaps.info/thememap/blueos/';

	var str_mapdt = 'Map Details';


// Path Variables - creates path variables for each of the levels in the website (except map detail pages)

	var pth_cconv = new Array (cmb_cconv);

	var pth_info = new Array (cmb_info);

	var pth_arti = new Array (cmb_arti);

	var pth_ciren = new Array (cmb_ciren);
	var pth_25k = new Array (cmb_ciren, cmb_25k);
	var pth_50k = new Array (cmb_ciren, cmb_50k);
	var pth_1in = new Array (cmb_ciren, cmb_1in);
	var pth_1in_mil = new Array (cmb_ciren, cmb_1in_mil);
	var pth_osoth_hq = new Array (cmb_ciren, cmb_osoth_hq);
	var pth_osoth_tm = new Array (cmb_ciren, cmb_osoth_tm);
	var pth_osoth_mil = new Array (cmb_ciren, cmb_osoth_mil);
	var pth_osoth_dt = new Array (cmb_ciren, cmb_osoth_dt);
	var pth_osoth_ls = new Array (cmb_ciren, cmb_osoth_ls);
	var pth_osoth_hs = new Array (cmb_ciren, cmb_osoth_hs);
	var pth_osoth_cs = new Array (cmb_ciren, cmb_osoth_cs);
	var pth_osoth_ot = new Array (cmb_ciren, cmb_osoth_ot);
	var pth_other = new Array (cmb_ciren, cmb_other);

	var pth_theme = new Array (cmb_theme);
	var pth_city = new Array (cmb_theme, cmb_city);
	var pth_25kPRW = new Array (cmb_theme, cmb_25kPRW);
	var pth_25kPFM = new Array (cmb_theme, cmb_25kPFM);
	var pth_OL3a = new Array (cmb_theme, cmb_OL3a);
	var pth_25kEXO = new Array (cmb_theme, cmb_25kEXO);
	var pth_25kEXGM = new Array (cmb_theme, cmb_25kEXGM);
	var pth_50kInt = new Array (cmb_theme, cmb_50kInt);
	var pth_50k3a = new Array (cmb_theme, cmb_50k3a);
	var pth_NPEM = new Array (cmb_theme, cmb_NPEM);
	var pth_HIGB = new Array (cmb_theme, cmb_HIGB);
	var pth_citylink = new Array (cmb_theme, cmb_citylink);
	var pth_eire = new Array (cmb_theme, cmb_eire);
	var pth_blue = new Array (cmb_theme, cmb_blue);


// NAVBAR ELEMENT FUNCTIONS

function navbarhead() {

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89968786-1', 'auto');
  ga('send', 'pageview');

	document.write('<div style="width: 100%; border-bottom: dotted 1px #000099; padding: 0 0 8px 0">');
        document.write('<div style="padding: 0; width: 732px; margin-left: auto; margin-right: auto"><table class="navbar"><tr><td class="topbar" width=720><a href="http://www.fieldenmaps.info/"><img src="http://www.fieldenmaps.info/navlogo.gif" width=165 height=29 border=0 alt="FieldenMaps.info"></a></td></tr>');
	document.write('<tr><td class="botbar" width=714><font class="navhere">You are here:<br></font>');
}

function navbarhome(){
	document.write('<a class="nav" href="' + cmb_home.uri + '">' + cmb_home.str + '</a><font class="navlevel">&nbsp;&gt;&nbsp;</font>');
}

function navbarnav(uri, text){
	document.write('<a class="nav" href="' + uri + '">' + text + '</a><font class="navlevel">&nbsp;&gt;&nbsp;</font>');
}

function navbarend(location){
	document.write('<font class="navloc">' + location + '</font></td></tr></table></div></div>');
}


function navbariter(path_p){
	var ctr = 0;
	while (ctr < (path_p.length)) {
		navbarnav(path_p[ctr].uri, path_p[ctr].str);
		ctr++;
	}
}


// NAVBAR FOR USE ON ALL MAIN PAGES (specify path to page)
function navbar(path){
	navbarhead();
	navbarhome();
	var ctr = 0;
	while (ctr < (path.length - 1)) {
		navbarnav(path[ctr].uri, path[ctr].str);
		ctr++;
	}
	navbarend(path[(path.length - 1)].str);

}


// NAVBAR FOR USE ON MAP DETAIL PAGES (specify path to parent page)
function navbardtl(path){
	navbarhead();
	navbarhome();
	navbariter(path);
	navbarend(str_mapdt);
}

// NAVBAR FOR USE ON INFO PAGES (specify path to parent page + string for current page)
function navbarinfo(path, loc){
	navbarhead();
	navbarhome();
	navbariter(path);
	navbarend(loc);
}

// NAVBAR FOR USE ON SUBSIDIARY PAGES (specify path to parent page + string for current page)
function navbarsub(path, loc){
	navbarhead();
	navbarhome();
	navbariter(path);
	navbarend(loc);
}

// NAVBAR FOR USE ON LAYER 1 PAGES [directly below homepage] (specify string for current page)
function navbarhsub(loc){
	navbarhead();
	navbarhome();
	navbarend(loc);
}

// RETURNS TITLE STRING FROM PATH (specify path)
function path2tit(path){
	var result = 'FieldenMaps.info';
	var ctr = 0;
	while (ctr < (path.length)) {
		if (path[ctr].sts == '') {
			result = result + ' / ' + path[ctr].str;
		}
		else {
			result = result + ' / ' + path[ctr].sts;
		}
		ctr++;
	}
	return result;
}

// RETURNS TITLE STRING FROM PATH (specify path)
function path2titsub(path, sub_str){
	var result = 'FieldenMaps.info';
	var ctr = 0;
	while (ctr < (path.length)) {
		if (path[ctr].sts == '') {
			result = result + ' / ' + path[ctr].str;
		}
		else {
			result = result + ' / ' + path[ctr].sts;
		}
		ctr++;
	}
	result = result + ' / ' + sub_str + ''
	return result;
}
