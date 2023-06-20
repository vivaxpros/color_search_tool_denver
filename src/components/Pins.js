import { Marker, Popup, useMap } from "react-leaflet";
import { HouseIcon } from "./Icons";
import bounded_pins from "../helpers/bounded_pins";
import { useCallback, useState, useEffect } from "react";

function Pins({ map, displayPins }) {
  const [bounded_arr, set_bounded_arr] = useState(null);

  const onMove = useCallback(() => {
    let bounds = map.getBounds().toBBoxString().split(",");
    set_bounded_arr(bounded_pins(bounds, displayPins));
  });

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    onMove();
  }, [displayPins]);

  useEffect(() => {
    let bounds = map.getBounds().toBBoxString().split(",");
    set_bounded_arr(bounded_pins(bounds, displayPins));
  }, []);

  return (
    <>
      {bounded_arr
        ? bounded_arr.map((pin) => {
            return (
              <Marker
                position={[pin.Lat, pin.Lon]}
                key={pin.KF_Job_ID}
                icon={HouseIcon}
              >
                <Popup>
                  <a
                    target="_blank"
                    href={`http://maps.google.com/maps?q=${pin.Address},+${pin.City},+${pin.State}+${pin.Zip}`}
                  >
                    {`${pin.Address}, ${pin.City}, ${pin.State} ${pin.Zip}`}
                  </a>
                  <br />
                  <p>{`Substrate: ${pin.Substrate}`}</p>
                  <p>{`Year Completed: ${pin.Complete}`}</p>
                  {pin.Color.map((color) => {
                    return (
                      <div key={color.color_number}>
                        <p className="color_names">
                          {`${color.location}: ${color.color_name} - ${color.color_number}`}
                        </p>
                        <br />
                      </div>
                    );
                  })}
                </Popup>
              </Marker>
            );
          })
        : null}
    </>
  );
}

export default Pins;
