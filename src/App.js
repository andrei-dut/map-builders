import "./App.css";
import MapLegend from "./views/MapLegend";
import ObjectSelector from "./views/ObjectSelector";
import MapContainer from "./views/Ymaps";
import { locationsArray } from "./locations";
import React, { useMemo, useState } from "react";


function App() {

  const center = [55.755773, 37.617761]; // Центр карты
  const zoom = 10; // Масштаб карты


  const countries = useMemo(() => {
    return locationsArray.reduce((prev, current) => {
      const isCountry = prev.find((_) => _.name === current.country);

      if (isCountry) {
        isCountry.elems = [...isCountry.elems, current];
      } else {
        return [...prev, { name: current.country, elems: [current] }];
      }
      return prev;
    }, []);
  }, []); 
  


  const [selectedCoords, setSelectedCoords] = useState(center);

  const handleMarkerClick = (coords) => {
    setSelectedCoords(coords);
  };


  return (
    <div className="App">
      <ObjectSelector countries={countries} handleMarkerClick={handleMarkerClick}/>
      <MapContainer markers={locationsArray} center={selectedCoords} zoom={zoom}/>
      <MapLegend />
    </div>
  );
}

export default App;
