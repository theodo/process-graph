import './App.css';
import { useState } from 'react';
import Process from './Process';
import Config from './Config';
import Editor from './Editor';

const INITIAL_VALUE = [{ text: "Document" }, { text: "some" }, { text: "colorful", color: "coral" }, { text: "processes" }];
const INITIAL_CONFIG = {
  "--step-color": "teal",
  "--background-color": "white",
  "--step-height": "80px",
  "--step-spacing": "5px",
  "--step-line-spacing": "10px",
  "--step-padding": "10px",
  "--arrow-ratio": 0.7,
  "--font-size": "1.5rem",
  "--font-color": "white",
}

function App() {
  const [steps, setSteps] = useState(INITIAL_VALUE);
  const [config, setConfig] = useState(INITIAL_CONFIG);

  return (
    <>
      <Process steps={steps} config={config} />
      <section className="config">
        <div className="config--panel">
          <Editor config={config} steps={steps} setSteps={setSteps} />
        </div>
        <div className="config--panel">
          <Config config={config} setConfig={setConfig} />
        </div>
      </section>
    </>
  );
}

export default App;
