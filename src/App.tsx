import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes  from "./pages/routes";
import "./App.css";



function App() {
  const [count, setCount] = useState(0);
  
  const config = useRoutes(routes);
  return (
    <div className="App">
      <React.Suspense fallback={<>...</>}>{config}</React.Suspense>
    </div>
  );
}

export default App;
