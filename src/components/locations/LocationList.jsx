import React from 'react';

import CountryGroup from './CountryGroup.jsx';

const LocationList = ({ locations }) => {
    
  const groupedByCountry = locations.reduce((acc, location) => {
    const { country } = location;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(location);
    return acc;
  }, {});

  const countries = Object.keys(groupedByCountry);

  return (
    <div className="location-list">
      {countries.map((country, index) => (
        <CountryGroup
          key={country}
          country={country}
          locations={groupedByCountry[country]}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default LocationList;