import L from "leaflet";

const VivaxIcon = new L.Icon({
  iconUrl: require("../data/vivax_logo.png"),
  iconSize: [50, 50],
});

const HouseIcon = new L.Icon({
  iconUrl: require("../data/house_pin.png"),
  iconSize: [45, 45],
});

const HouseIconRed = new L.Icon({
  iconUrl: require("../data/house_pin_red.png"),
  iconSize: [45, 45],
});

export { VivaxIcon, HouseIcon, HouseIconRed };
