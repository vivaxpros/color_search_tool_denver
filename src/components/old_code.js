let access_token =
  "pk.eyJ1IjoiYmNicmlkZ2VzMTQiLCJhIjoiY2tzN3ppNzZpMGR4azJzbno2bDFhM2ZhMiJ9.kf6R5qgu_q4WJ0px59gtVw";
let marker_data;
let map = L.map("map").setView([39.73313, -105.01491], 15);
let markerGroup = L.layerGroup();

console.log("Logging V1.10");

fetch("https://vpcolorsearchtool.s3.amazonaws.com/watson_color_data_2022.json")
  .then((res) => res.json())
  .then((data) => {
    marker_data = data;
    let filtered_arr = filter_markers();
    populate_markers(filtered_arr);
  });

let houseIcon = L.icon({
  iconUrl: "https://vpcolorsearchtool.s3.amazonaws.com/house_pin.png",
  iconSize: [45, 45],
});

let vivaxIcon = L.icon({
  iconUrl: "https://vpcolorsearchtool.s3.amazonaws.com/vivax_logo.png",
  iconSize: [50, 50],
});

L.marker([39.73313, -105.01491], { icon: vivaxIcon })
  .bindPopup(`Vivax Pros <br><br>1050 Yuma St, Denver, CO 80111`)
  .addTo(map);

let swIcon = L.icon({
  iconUrl: "https://vpcolorsearchtool.s3.amazonaws.com/sw_logo.png",
  iconSize: [25, 50],
});

fetch(`https://vpcolorsearchtool.s3.amazonaws.com/sw_store_locations.json`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((item) => {
      L.marker([item.Lat, item.Lon], { icon: swIcon })
        .bindPopup(
          `Sherwin Williams<br><br> ${item.Address}, ${item.City}, ${item.State} ${item.Zip}`
        )
        .addTo(map);
    });
  });

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 13,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: access_token,
  }
).addTo(map);

function populate_markers(mark_arr) {
  markerGroup.clearLayers();

  let [low_lon, low_lat, high_lon, high_lat] = map
    .getBounds()
    .toBBoxString()
    .split(",");

  mark_arr = mark_arr.filter(function (record) {
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

  mark_arr.forEach((marker) => {
    let color_details = "";

    marker.Color.forEach((color) => {
      color_details += `<br>${color.location}: ${color.color_name} - ${color.color_number}`;
    });

    L.marker([marker.Lat, marker.Lon], { icon: houseIcon })
      .bindPopup(
        `Address: ${marker.Address}, ${marker.City}, ${marker.State} ${marker.Zip} <br>Year Completed: ${marker.Complete} <br><br>House Substrate: ${marker.Substrate}
        ${color_details}`
      )
      .addTo(markerGroup);
  });

  markerGroup.addTo(map);
}

// Call to when user applies any new filters
function filter_markers() {
  let substrate = document.getElementById("substrate").value;
  let color = document.getElementById("color").value;
  // Filter by substrate and then filter
  let sub_filter = [];

  if (substrate === "All") {
    console.log("All cond");
    sub_filter = marker_data;
  } else {
    console.log("Else cond");
    sub_filter = marker_data.filter((d) => d.Substrate === substrate);
    console.log("After the sub filter");
  }
  console.log(`Sub Filter: ${sub_filter.length}`);
  let color_filter = [];
  // If user doesn't enter a color, select all colors
  if (color === "") {
    color_filter = sub_filter;
  } else {
    sub_filter.forEach((marker) => {
      if (marker.Color.filter((d) => d.color_name === color).length != 0) {
        color_filter.push(marker);
      }
    });
  }
  console.log(`This is the returned color filter: ${color_filter.length}`);
  return color_filter;
}

document.getElementById("apply_btn").addEventListener("click", () => {
  let filtered_jobs = filter_markers();
  populate_markers(filtered_jobs);
});

map.on("moveend", () => {
  let filtered_jobs = filter_markers();
  populate_markers(filtered_jobs);
});

document.getElementById("submit_btn").addEventListener("click", () => {
  let address = document.getElementById("address").value;
  let state = document.getElementById("state").value;
  let zip = document.getElementById("zip").value;
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address.replace(
      " ",
      "+"
    )}+${state}+${zip}`
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
        map.setView([data[0].lat, data[0].lon], 15);
      }
    });
});
