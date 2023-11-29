import React, { useMemo, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  ObjectManager,
} from "@pbe/react-yandex-maps";
import logo from "./custom-icon.svg";

const getRandomCoordinates = () => {
  // Генерация случайных координат в пределах Москвы
  const latitude = 55.75 + Math.random() * 0.1;
  const longitude = 37.6 + Math.random() * 0.1;
  return [latitude, longitude];
};

const generateMarkers = (count) => {
  const markers = [];
  for (let i = 0; i < count; i++) {
    const coordinates = getRandomCoordinates();
    markers.push({ id: i, coordinates, name: `Маркер ${i + 1}` });
  }
  return markers;
};

const MapContainer = () => {
  let mapRef = useRef();
  const mapState = {
    center: [55.751574, 37.573856], // Центр карты
    zoom: 9, // Уровень масштабирования
  };

  const markers = generateMarkers(76);

  const [layout, setLayout] = useState();

  const handlerOnLoadMap = (ymaps) => {
    console.log(ymaps);
    const locationMarkBalloonContainer = ({ ymaps }) =>
      ymaps.templateLayoutFactory.createClass(
        '<div style="color: #000000;max-width: 120px; width: 120px; display: flex; align-items: end;justify-content: center; height: 26px">1sdfgsgdsgfdfg dfgdf</div>'
      );

    const content = locationMarkBalloonContainer({ ymaps });
    //   setLayout(locationMarkBalloonContainer({ ymaps }));
    setLayout({ content });
  };
  //   console.log(layout);

  const handlePlacemarkClick = (e) => {
    // Обработка клика по Placemark
    const placemarkId = e.get("target").properties.get("id");
    console.log(`Клик по метке с идентификатором ${placemarkId}`);
  };

  //   console.log("mapRef", mapRef.current);

  return (
    <YMaps
      query={{
        apikey: "8334e7a6-6bb1-44c2-a061-4d1f8662219d",
        // load: "package.full",
      }}
    >
      <Map
        state={mapState}
        width="100%"
        height="100vh"
        modules={[
          "templateLayoutFactory",
          "layout.ImageWithContent",
          //   "geoObject.addon.balloon",
          //   "geoObject.addon.hint",
        ]}
        onLoad={handlerOnLoadMap}
        instanceRef={mapRef}
      >
        <Clusterer
          options={{
            groupByCoordinates: false,
            // gridSize: 128,
            // preset: "islands#invertedVioletClusterIcons",
          }}
          propertie={{ hintContent: "Мало меток" }}
        >
          {layout &&
            markers.map((marker) => (
              <Placemark
                key={marker.id}
                geometry={marker.coordinates}
                properties={{
                  id: marker.id,
                  hintContent: "Собственный значок метки с контентом",
                  balloonContent: "А эта — новогодняя",
                  iconContent: marker.id,
                }}
                options={{
                  iconLayout: "default#imageWithContent",
                  //   iconLayout: "default#image",
                  iconImageHref: logo,
                  iconImageSize: [48, 48],
                  iconImageOffset: [-24, -24],
                  iconContentOffset: [-36, -28],
                  iconContentLayout: layout.content,
                }}
                onClick={handlePlacemarkClick}
              />
            ))}
        </Clusterer>
      </Map>
    </YMaps>
  );
};

export default MapContainer;
