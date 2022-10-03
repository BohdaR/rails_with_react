import React from 'react';
import Place from "./Place";

const PlacesList = ({placesList}) => {
    return (
        <div>
            {placesList.map((place) =>
                <Place
                    key={place.id}
                    place={place}
                />
            )}
        </div>
    );
};

export default PlacesList;
