import React, {useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
} from "@pbe/react-yandex-maps";
import logo from "../icons/custom-icon.svg";


const MapContainer = ({countries: markers}) => {
  let mapRef = useRef();
  const mapState = {
    center: [55.751574, 37.573856], // Центр карты
    zoom: 9, // Уровень масштабирования
  };

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
                //   iconContent: marker.id,
                }}
                options={{
                  iconLayout: "default#imageWithContent",
                  //   iconLayout: "default#image",
                  iconImageHref: logo,
                  iconImageSize: [48, 48],
                  iconImageOffset: [-24, -24],
                  iconContentOffset: [-36, -28],
                //   iconContentLayout: layout.content,
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
