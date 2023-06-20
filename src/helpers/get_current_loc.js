function get_current_loc(map, _callback) {
  navigator.geolocation.getCurrentPosition(
    (loc) => {
      map.setView([loc.coords.latitude, loc.coords.longitude], 16);
      _callback({ lat: loc.coords.latitude, lon: loc.coords.longitude });
    },
    () => {
      window.alert(
        "You location could not be determined. Please enter your address."
      );
    }
  );
}

export default get_current_loc;
