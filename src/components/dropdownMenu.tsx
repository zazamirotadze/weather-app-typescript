import React, { useState, useRef, useEffect } from "react";
import { Location } from "../types/weather.types";
import { useUpdateSearchParam } from "../utils/weatherRenderers";
import { SupportedLanguages, SupportedLocations } from '../types/weather.types'
import { translations } from "../data/translations";

const Dropdown: React.FC<{locations: Location[], supportedLanguage: SupportedLanguages | null, setSelectedLocation: (location: string) => void, selectedLocation: string}> = (props) => {
  const 
      [isOpen, setIsOpen] = useState(false),
      dropdownRef = useRef<HTMLDivElement>(null),
      updateSearchParam = useUpdateSearchParam();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); 

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
  <div ref={dropdownRef}>
    <button className="menu-button" onClick={toggleDropdown}>{translations.chooseLocation[props.supportedLanguage ?? 'ka']}</button>
    {isOpen && (
      <div className="options-container">
          {props.locations.map((location, index) => (
            <div className="option" key={index} onClick={() => {
              updateSearchParam("location", location.name);
              props.setSelectedLocation(location.name);
              setIsOpen(false);
            }}>{translations.locations[location.name as SupportedLocations][props.supportedLanguage ?? 'ka']}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
