import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "../style.css";
import { VivaxIcon, HouseIconRed } from "./Icons";
import Pins from "./Pins";

function Map({ displayPins, map, setMap, currLocPin }) {
  let currLat = currLocPin.lat ? parseFloat(currLocPin.lat) : 0;
  let currLon = currLocPin.lon ? parseFloat(currLocPin.lon) : 0;

  console.log(currLat);

  return (
    <>
      <MapContainer
        center={[39.73313, -105.01491]}
        zoom={15}
        // make minZoom smaller to allow greater 'zoom-out'
        minZoom={13}
        scrollWheelZoom={true}
        ref={setMap}
        className="map_container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[39.73313, -105.01491]} icon={VivaxIcon}>
          <Popup>
            Vivax Pros <br /> 1050 Yuma St, Denver, CO 80204
          </Popup>
        </Marker>
        <Marker
          position={[currLat, currLon]}
          icon={HouseIconRed}
          key={currLocPin}
        >
          <Popup>Your Location</Popup>
        </Marker>
        {map ? <Pins map={map} displayPins={displayPins} /> : null}
      </MapContainer>
    </>
  );
}

export default Map;
