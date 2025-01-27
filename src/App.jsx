import { useState } from "react";
import "./App.css";
import WeatherData from "./Components/WeatherData";

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <WeatherData theme={[city, setCity]} />
    </>
  );
}

export default App;
