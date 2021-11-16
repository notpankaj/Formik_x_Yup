import React, { useState } from "react";
import CoreFormikAndYup from "./CoreFormikAndYup";
import MuiFormikAndYup from "./MuiFormikAndYup";

function App() {
  const [view, setView] = useState(true);
  return (
    <>
      <div>
        <button onClick={() => setView(false)}>CoreFormikAndYup</button>
        <button onClick={() => setView(true)}>MuiFormikAndYup</button>
      </div>
      {view ? <MuiFormikAndYup /> : <CoreFormikAndYup />}
    </>
  );
}

export default App;
