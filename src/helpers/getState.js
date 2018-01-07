// @flow

const statesObj = {
  AnnArbor: 'MI',
  Atlanta: 'GA',
  Austin: 'TX',
  Blacksburg: 'VA',
  Boston: 'MA',
  Bryan: 'TX',
  Chicago: 'IL',
  Clemson: 'SC',
  Clover: 'SC',
  Denver: 'CO',
  Detroit: 'MI',
  Houston: 'TX',
  LosAngeles: 'CA',
  NewOrleans: 'LA',
  NorthBillerica: 'MA',
  SanFrancisco: 'CA',
  StLouis: 'MO',
};

const getState = (city: string): string => {
  const modifiedCity = city.split(' ').join('');
  return statesObj[modifiedCity];
};

export default getState;