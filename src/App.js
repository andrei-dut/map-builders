import { locationsArray } from "./data/locations";
import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import MapLegend from "./views/MapLegend";
import ObjectSelector from "./views/ObjectSelector";
import MapContainer from "./views/Ymaps";
import PreviewSlide from "./views/PreviewSlide";
import jsonData from "./data/stars.json";

async function getGeolocation(country, city) {
  const apiKey = '2f19b0dc023a43049ecc46c3427bcab8'; // Замените на свой ключ
  const address = `${city}, ${country}`;
  const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&language=ru`;

  try {
      const response = await fetch(geocodingUrl);

      const geocodingData = await response.json();

      console.log(address, geocodingData);

      if (geocodingData && geocodingData.results && geocodingData.results.length > 0) {
          const firstResult = geocodingData.results[0];
          return {
              "latitude": firstResult.geometry.lat,
              "longitude": firstResult.geometry.lng
          };
      } else {
          console.error('Не удалось получить координаты.');
          return null;
      }
  } catch (error) {
      console.error('Произошла ошибка при запросе к API геокодирования.', error);
      return null;
  }
}




async function addGeolocationToCompanies(companyObjects) {
  const companyObjectsCopy = companyObjects.slice();
  for (const company of companyObjectsCopy) {
      const country = company["country"];
      const city = company["address"];

      // Получаем координаты
      const geolocation = await getGeolocation(country, city);

      // Добавляем поле "geolocation" к текущей компании
      if (geolocation) {
          company["geolocation"] = geolocation;
      }
  }

  function generateRandomOffset() {
    // Генерируем случайное число в диапазоне от -0.05 до 0.05 для создания небольшого смещения
    return (Math.random() - 0.5) * 0.1;
  }
  
  function generateCoordinatesAround(centerCoordinates) {
    const numberOfCoordinates = 5;
    const radius = 0.5; // Измените радиус в соответствии с вашими требованиями
  
    const coordinatesAround = [];
  
    for (let i = 0; i < numberOfCoordinates; i++) {
        const offsetLat = generateRandomOffset();
        const offsetLng = generateRandomOffset();
  
        const newCoordinates = {
            "latitude": centerCoordinates.latitude + offsetLat * radius,
            "longitude": centerCoordinates.longitude + offsetLng * radius
        };
  
        coordinatesAround.push(newCoordinates);
    }
  
    return coordinatesAround;
  }

  // Выводим результат
  console.log(companyObjectsCopy);

  companyObjectsCopy.forEach(el => {
    console.log( generateCoordinatesAround(el.geolocation));
   
  });
}





function App() {
  // const [stars, setStars] = useState([]);

  const test = [
    {
        "holding": "ЗАО “Атлант”",
        "country": "Российская Федерация",
        "name": "ООО 'ТЭС'",
        "address": "г. Уфа",
        "status": "Субъект ТПС"
    },
    // ... другие объекты
]

  const getCoordByYmap = (ymaps) => {

    let address;

    for (const company of test) {
      const country = company["country"];
      const city = company["address"];

      address = `${country} ${city}`;

  }
  console.log("getCoordByYmap",address, ymaps);
  if(ymaps) {
    ymaps
    .search(address, { results: 10 })
    .then(function (res) {
      console.log(res);
      // Обрабатываем результаты поиска
      res.geoObjects.each(function (geoObject) {
        console.log(geoObject);
        
        const result = {
          name: geoObject.properties.get("address"),
          description: geoObject.properties.get("description"),
          coordinates: geoObject.geometry.getCoordinates(),
        };
        console.log(result);
      });

    });
  }
    


  }

  


  useEffect(() => {
    // Пример получения ключей из JSON файла
    if (jsonData) {
      const jsonKeys = Object.keys(jsonData);
      const jsonValues = Object.values(jsonData);
      const merged = [].concat(...jsonValues);
      console.log(jsonKeys);
      console.log(jsonValues);
      console.log(merged);
      addGeolocationToCompanies([
        {
            "holding": "ЗАО “Атлант”",
            "country": "Российская Федерация",
            "name": "ООО 'ТЭС'",
            "address": "г. Уфа",
            "status": "Субъект ТПС"
        },
        // ... другие объекты
    ]);
      // addGeolocationToCompanies(merged);
      // mutateStars(jsonKeys);
      // setStars(jsonKeys);
    }
  }, []);

  const newArray = Object.entries(jsonData).map(([city, streets]) => ({
    city,
    streets,
  }));

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

  const [slideId, setSlideId] = useState(null);

  const [stateMap, setStateMap] = useState({ center: [0, 0], zoom: 3 });

  const handleMarkerClickFromList = (coords) => {
    setStateMap({ center: coords, zoom: 8 });
  };

  return (
    <div className="App">
      <ObjectSelector
        countries={countries}
        handleMarkerClick={handleMarkerClickFromList}
      />
      <MapContainer
        markers={locationsArray}
        stateMap={stateMap}
        setSlideId={setSlideId}
        getCoordByYmap={getCoordByYmap}
      />
      <MapLegend />
      <PreviewSlide slideId={slideId} setSlideId={setSlideId} />
    </div>
  );
}

export default App;
