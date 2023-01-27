import LocationRepresentation from "./LocationRepresentation";


function App() {
  
 
  let tsrikvaliData = [42.345548, 43.277142, "წირქვალი"]
  let tbilisiData = [41.719024, 44.786648, "თბილისი"]
  let kutaisiData = [42.267241, 42.709247, "ქუთაისი"]


  
  return (
    <div className="App">
      <LocationRepresentation data={tsrikvaliData}/>
      <LocationRepresentation data={tbilisiData}/>
      <LocationRepresentation data={kutaisiData}/>
    </div>
  );
}

export default App;
