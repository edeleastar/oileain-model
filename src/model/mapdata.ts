import { PointOfInterest } from './poi';

export const coasts = [
  {
    title: 'North East',
    variable : 'northEast',
    identifier: '**The North East**',
    pois : new Array<PointOfInterest>()
  },
  {
    title: 'East Coast',
    variable : 'east',
    identifier: '**The East Coast**',
    pois : new Array<PointOfInterest>()
  },
  {
    title: 'South Coast',
    variable : 'south',
    identifier: '**The South Coast**',
    pois : new Array<PointOfInterest>()
  },
  {
    title: 'Mid West',
    variable : 'midWest',
    identifier: '**The Mid-West**',
    pois : new Array<PointOfInterest>()

  },
  {
    title: 'North West',
    variable : 'northWest',
    identifier: '**The North-West**',
    pois : new Array<PointOfInterest>()
  },
];

export const costalZoneNames = [
  coasts[0].identifier,
  coasts[1].identifier,
  coasts[2].identifier,
  coasts[3].identifier,
  coasts[4].identifier,
];
