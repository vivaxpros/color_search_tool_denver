function search_address(map, _callback) {
  let address = document.getElementById("address").value;
  let state = document.getElementById("state").value;
  let zip = document.getElementById("zip").value;
  console.log(`https://nominatim.openstreetmap.org/search?format=json&q=${address.replace(
      " ",
      "+"
  )}+${state}+${zip}`);
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address.replace(
      " ",
      "+"
    )}+${state}+${zip}&viewbox=37,41,25,32`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length === 0) {
        window.alert(
          "Address was not located, please check the entered value."
        );
      } else {
        map.setView([data[0].lat, data[0].lon], 16);
        // return { lat: data[0].lat, lon: data[0].lon };
        _callback({ lat: data[0].lat, lon: data[0].lon });
      }
    });
}

export default search_address;
