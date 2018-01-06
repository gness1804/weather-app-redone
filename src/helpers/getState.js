// @flow

const statesObj = {
  Atlanta: 'GA',
  Austin: 'TX',
  Blacksburg: 'VA',
  Boston: 'MA',
  Bryan: 'TX',
  Chicago: 'IL',
  Clemson: 'SC',
  Denver: 'CO',
  Detroit: 'MI',
  Houston: 'TX',
};

const getState = (city: string): string => {
  return statesObj[city];
};

export default getState;