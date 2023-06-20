import AddressInput from "./AddressInput";
import FilterInput from "./FilterInput";
import menu_icon from "../data/list.svg";
import { useState, useEffect } from "react";

function SideBar({ applyFilters, map, updateCurrLocPin }) {
  let [collapseState, updateCollapseState] = useState("none");

  const collapse_section = () => {
    if (window.innerWidth <= 768) {
      collapseState === "none"
        ? updateCollapseState("initial")
        : updateCollapseState("none");

      document
        .getElementById("address_section")
        .setAttribute("style", `display: ${collapseState}`);

      document
        .getElementById("filter_section")
        .setAttribute("style", `display: ${collapseState}`);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      collapseState === "none"
        ? updateCollapseState("initial")
        : updateCollapseState("none");
      document
        .getElementById("address_section")
        .setAttribute("style", `display: ${collapseState}`);
      document
        .getElementById("filter_section")
        .setAttribute("style", `display: ${collapseState}`);
    }
  }, []);

  return (
    <div className="sidebar_container">
      <img
        className="menu_icon"
        src={menu_icon}
        onClick={collapse_section}
      ></img>
      <AddressInput
        map={map}
        collapse={collapse_section}
        updateCurrLocPin={updateCurrLocPin}
      />
      <FilterInput applyFilters={applyFilters} collapse={collapse_section} />
    </div>
  );
}

export default SideBar;
