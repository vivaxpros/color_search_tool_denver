import AddressInput from './AddressInput';
import FilterInput from './FilterInput';
import menu_icon from '../data/list.svg';
import { useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

const MIN_WIDTH = 768;

function SideBar({ applyFilters, map, updateCurrLocPin }) {
    const size = useWindowSize();
    const [collapseState, updateCollapseState] = useState(false);
    const displayState = size.width > MIN_WIDTH || collapseState;

    const toggleCollapse = () => {
        size.width > MIN_WIDTH
            ? updateCollapseState(false)
            : updateCollapseState((prev) => !prev);
    };

    if (size)
        return (
            <div className="sidebar_container">
                <img
                    className="menu_icon"
                    src={menu_icon}
                    onClick={toggleCollapse}
                ></img>
                <AddressInput
                    map={map}
                    collapse={toggleCollapse}
                    updateCurrLocPin={updateCurrLocPin}
                    displayState={displayState}
                />
                <FilterInput
                    applyFilters={applyFilters}
                    collapse={toggleCollapse}
                    displayState={displayState}
                />
            </div>
        );
}

export default SideBar;
