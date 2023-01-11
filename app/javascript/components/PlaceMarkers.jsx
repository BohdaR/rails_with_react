import React, {Fragment} from 'react';
import FreePlaceMarker from "./placeMarkers/FreePlaceMarker";
import BookedPlaceMarker from "./placeMarkers/BookedPlaceMarker";

const PlaceMarkers = ({freePlaces, bookedPlaces, width, height, ...props}) => {
  return (
    <Fragment>
      {freePlaces.map((place) =>
        <FreePlaceMarker key={place.id} place={place} height={height} width={width} radius={0.03} available={true} {...props}/>
      )}
      {bookedPlaces.map((place) =>
        <BookedPlaceMarker key={place.id} place={place} height={height} width={width} radius={0.03}/>
      )}
    </Fragment>
  );
};

export default PlaceMarkers;
