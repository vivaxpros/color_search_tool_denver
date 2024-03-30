function filter_pins(pins = [], color, substrate, complete) {
    // color is color name, loc is body, trim, etc, type is painted siding, etc

    let sub_filter = [];

    substrate === 'All Substrates'
        ? (sub_filter = pins)
        : (sub_filter = pins.filter((d) => d.Substrate === substrate));

    let year_filter = [];

    complete === 'All Years'
        ? (year_filter = sub_filter)
        : (year_filter = sub_filter.filter((d) =>
              d.Complete.toString().includes(complete.toString())
          ));

    let color_filter = [];

    color === ''
        ? (color_filter = year_filter)
        : year_filter.forEach((marker) => {
              if (
                  marker.Color.filter(
                      (d) => d.color_name.toUpperCase() === color.toUpperCase()
                  ).length !== 0
              ) {
                  color_filter.push(marker);
              }
          });

    return color_filter;
}

export default filter_pins;
