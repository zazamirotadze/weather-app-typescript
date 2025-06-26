import React, { useState, useRef, useEffect } from "react";
import { Language } from "../types/weather.types";
import { useUpdateSearchParam } from "../utils/weatherRenderers";
import { translations } from "../data/translations";
import { SupportedLanguages } from '../types/weather.types'

const Languages: React.FC<{languages: Language[], selectedLanguage: string, supportedLanguage: SupportedLanguages | null , setSelectedLanguage: (language: string) => void}> = (props) => {
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
     <button className="menu-button" onClick={toggleDropdown}>{translations.chooseLanguage[props.supportedLanguage ?? 'ka']}</button>
     {isOpen && (
       <div className="options-container">
           {props.languages.map((language, index) => (
            <div 
             onClick={() => {
              props.setSelectedLanguage(language.name);
              updateSearchParam("language", language.name)
              setIsOpen(false);
             }}
            key={index} className="option">
             <img key={index} src={language.iconUrl} alt={language.label} 
             width={24} height={16}
            />
             </div>
           ))}
         </div>  
       )}
     </div>
   );
 };

export default Languages;
