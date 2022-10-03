import React from 'react';
import Place from "./Place";

const PlacesList = ({placesList}) => (
  <div>
    {placesList.map((place) =>
      <Place
        key={place.id}
        place={place}
      />
    )}
  </div>
);

export default PlacesList;
