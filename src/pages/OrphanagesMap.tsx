import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FiArrowRight } from "react-icons/fi";

import mapMarkerImg from "../images/map-marker.svg";
import "../styles/pages/orphanages-map.css";

import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const stylesMapBox = [
  "light-v10",
  "dark-v10",
  "streets-v11",
  "outdoors-v11",
  "satellite-v9",
  "satellite-streets-v11",
  "navigation-preview-day-v4",
  "navigation-preview-night-v4",
  "navigation-guidance-day-v4",
  "navigation-guidance-night-v4",
];

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((resp) => {
      setOrphanages(resp.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperado a sua visita :)</p>
        </header>

        <footer>
          <strong>Diadema</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.698168, -46.5451525]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${stylesMapBox[2]}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          console.log(orphanage);

          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}
