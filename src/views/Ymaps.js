import React, { useCallback, useRef, useState } from "react";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
// import logo from "../icons/custom-icon.svg";
import BuildingSvg from "../icons/building.svg";
import CrownBSvg from "../icons/crownB.svg";
import CrownRSvg from "../icons/crownR.svg";
import CrownYSvg from "../icons/crownY.svg";
import NotWorkSvg from "../icons/notWork.svg";
import SettingsSvg from "../icons/settings.svg";
import ShopHouseSvg from "../icons/shopHouse.svg";
import PredstavSvg from "../icons/predstav.svg";

const MapContainer = ({ markers, center, zoom }) => {
  let mapRef = useRef();
  const [layout, setLayout] = useState();

  const iconContent = useCallback(
    (text) =>
      `<div style="z-index: 99999;color: #1e98ff; max-width: 120px; width: 120px; display: flex; align-items: end; justify-content: center; height: 26px; font-weight: 600;text-shadow: 2px 2px 4px rgba(255, 255, 255, 1)">${text}</div>`,
    []
  );

  const handlerOnLoadMap = (ymaps) => {
    // console.log(ymaps);
    const locationMarkBalloonContainer = ({ ymaps }) =>
      ymaps.templateLayoutFactory.createClass(iconContent("text"));

    const content = locationMarkBalloonContainer({ ymaps });
    setLayout({ content });
  };

  const handlePlacemarkClick = (e) => {
    const placemarkId = e.get("target").properties.get("id");
    console.log(`Клик по метке с идентификатором ${placemarkId}`);
  };

  const getIconByStatus = (status) => {
    switch (`${status}`) {
      case "1":
        return ShopHouseSvg;
      case "2":
        return SettingsSvg;
      case "3":
        return PredstavSvg;
      case "4a":
        return CrownYSvg;
      case "4b":
        return CrownRSvg;
      case "4c":
        return CrownBSvg;
      case "5":
        return BuildingSvg;
      case "6":
        return NotWorkSvg;

      default:
        return null;
    }
  };

  // console.log(markers);

  return (
    <YMaps
      query={{
        apikey: "8334e7a6-6bb1-44c2-a061-4d1f8662219d",
        // load: "package.full",
      }}
    >
      <Map
        defaultState={{ center, zoom }}
        state={{ center, zoom }}
        width="100%"
        height="100vh"
        modules={[
          "templateLayoutFactory",
          "layout.ImageWithContent",
          //   "geoObject.addon.balloon",
          "geoObject.addon.hint",
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
                  hintContent: marker.name,
                  iconContent: iconContent(marker.name),
                }}
                options={{
                  iconLayout: "default#imageWithContent",
                  //   iconLayout: "default#image",
                  iconImageHref: getIconByStatus(marker.status),
                  iconImageSize: [48, 48],
                  iconImageOffset: [-24, -24],
                  iconContentOffset: [-36, -28],
                  // iconContentLayout: layout.content,
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