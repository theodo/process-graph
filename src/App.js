import './App.css';
import { useCallback, useState } from 'react';

const INITIAL_VALUE = [{ text: "Document" }, { text: "some" }, { text: "colorfull", color: "coral" }, { text: "processes" }];
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
  const setStepValue = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    const value = event.target.value;
    setSteps(s => {
      const newSteps = [...s];
      newSteps.splice(index, 1, {...s[index], text: value});
      return newSteps
    });
  }, []);
  const setStepColor = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    const value = event.target.value;
    setSteps(s => {
      const newSteps = [...s];
      newSteps.splice(index, 1, {...s[index], color: value});
      return newSteps
    });
  }, []);
  const removeStep = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    setSteps(s => {
      const newSteps = [...s];
      newSteps.splice(index, 1);
      return newSteps
    });
  }, []);
  const addStep = useCallback(() => {
    setSteps(s => [...s, {text: ""}]);
  }, []);
  const updateConfig = useCallback((event) => {
    const key = event.target.attributes.xconfigkey.value;
    setConfig(config => ({...config, [key]: event.target.value}))
  }, [])

  return (
    <>
    <section className="process" style={config}>
      {steps.map((step, index) => (
        <div key={index} className="process--step" style={{ zIndex: steps.length - index, "--step-color": step.color }}>{step.text}</div>
      ))}
    </section>
    <section className="config">
      <div className="config--panel">
        {steps.map((step, index) => (
          <div key={index} className="editor--step">
            <input className="editor--step--field" type="text" xstepindex={index} value={step.text} onChange={setStepValue} />
            <input className="editor--step--field" type="text" xstepindex={index} value={step.color} onChange={setStepColor} placeholder={config["--step-color"]} />
            <button onClick={removeStep} xstepindex={index} className="editor--step--remove">🗑</button>
          </div>
        ))}
        <button onClick={addStep}>➕</button>
      </div>
      <div className="config--panel">
        {Object.keys(config).map(key => (
          <div >
            <label key={key} className="config--panel--control">
              {key.substring(2)}
              <input value={config[key]} onChange={updateConfig} xconfigkey={key}></input>
            </label>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}

export default App;
