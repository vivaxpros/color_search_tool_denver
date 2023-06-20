function bounded_pins(bounds, arr) {
  let [low_lon, low_lat, high_lon, high_lat] = bounds;

  return arr.filter((record) => {
    if (
      record["Lat"] <= high_lat &&
      record["Lat"] >= low_lat &&
      record["Lon"] <= high_lon &&
      record["Lon"] >= low_lon
    ) {
      return true;
    }
    return false;
  });
}

export default bounded_pins;
