import { useState } from "react";
import { LocationRepresentation } from "./components/LocationRepresentation";
import { locations } from "./data/locations";
import Dropdown from "./components/dropdownMenu";
import { useSearchParams } from "react-router-dom";
import { languages } from "./data/languages";
import Languages from "./components/Languages";
import { translations } from "./data/translations";
import { SupportedLanguages } from './types/weather.types'

function App() {  
  const 
      [isLoaded, setIsLoaded] = useState(false),
      urlLocation = useSearchParams()[0],
      [selectedLocation, setSelectedLocation] = useState(urlLocation.get("location") || "Tsrikvali"),
      [selectedLanguage, setSelectedLanguage] = useState(urlLocation.get("language") || "ka"),
      supportedLanguage = (languages.find(lang => lang.name === selectedLanguage)?.name) as SupportedLanguages | null,
      supportedLocation = locations.find(loc => loc.name === selectedLocation) || null;

  return (
      <div className="App">
        <div className="menu" >
          <Dropdown 
            locations={locations} 
            setSelectedLocation={setSelectedLocation} 
            supportedLanguage={supportedLanguage} 
            selectedLocation={selectedLocation} 
          />
          <Languages 
            languages={languages} 
            selectedLanguage={selectedLanguage} 
            supportedLanguage={supportedLanguage} 
            setSelectedLanguage={setSelectedLanguage} 
          />
        </div>
        {!isLoaded && (<h2>{translations.loading[supportedLanguage ?? 'ka']}</h2>)}
        {isLoaded && !supportedLanguage && (<h2>{translations.incorrectLanguage[supportedLanguage ?? 'ka']}</h2>)}
        {isLoaded && !supportedLocation && (<h2>{translations.incorrectLocation[supportedLanguage ?? 'ka']}</h2>)}
        <LocationRepresentation 
          isLoaded={isLoaded} 
          setIsLoaded={setIsLoaded} 
          supportedLanguage={supportedLanguage}
          supportedLocation={supportedLocation}        
        />
      </div>
  );
}

export default App;