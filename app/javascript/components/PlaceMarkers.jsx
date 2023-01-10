import React, {Fragment} from 'react';
import Place from "./Place";

const PlaceMarkers = ({freePlaces, bookedPlaces, width, height, ...props}) => {
  return (
    <Fragment>
      {freePlaces.map((place) =>
        <Place key={place.id} place={place} height={height} width={width} radius={0.03} available={true} {...props}/>
      )}
      {bookedPlaces.map((place) =>
        <Place key={place.id} place={place} height={height} width={width} radius={0.03} available={false} {...props}/>
      )}
    </Fragment>
  );
};

export default PlaceMarkers;
