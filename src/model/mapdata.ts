import {Coast, PointOfInterest} from './poi';

export const coasts: Coast[] = [
  {
    title: 'North East',
    variable: 'northEast',
    identifier: '**The North East**',
    geo: {
      lat: 54.7,
      long: -6.141,
    },
    pois: new Array<PointOfInterest>(),
  },
  {
    title: 'East Coast',
    variable: 'east',
    identifier: '**The East Coast**',
    geo: {
      lat: 53.306,
      long: -6.437,
    },
    pois: new Array<PointOfInterest>(),
  },
  {
    title: 'South Coast',
    variable: 'south',
    identifier: '**The South Coast**',
    geo: {
      lat: 51.851,
      long: -8.184,
    },
    pois: new Array<PointOfInterest>(),
  },
  {
    title: 'Mid West',
    variable: 'midWest',
    identifier: '**The Mid-West**',
    geo: {
      lat: 53.574,
      long: -9.382,
    },
    pois: new Array<PointOfInterest>(),
  },
  {
    title: 'North West',
    variable: 'northWest',
    identifier: '**The North-West**',
    geo: {
      lat: 54.821,
      long: -7.91,
    },
    pois: new Array<PointOfInterest>(),
  },
];

export const costalZoneNames = [
  coasts[0].identifier,
  coasts[1].identifier,
  coasts[2].identifier,
  coasts[3].identifier,
  coasts[4].identifier,
];
