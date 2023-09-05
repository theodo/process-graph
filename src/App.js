import './App.css';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import JSONCrush from 'jsoncrush';

import Process from './Process';
import Config from './Config';
import Editor from './Editor';

const INITIAL_VALUE = [{ text: "Document" }, { text: "some" }, { text: "colorful", color: "coral" }, { text: "processes" }].map(step => ({...step, id: Math.random()}));
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const param = decodeURIComponent(document.location.hash.replace(/^#/, ""));
      if (param !== '') {
        const { s, c } = JSON.parse(JSONCrush.uncrush(param));
        setSteps(s.map(step => ({...step, id: Math.random()})));
        setConfig(oldConfig => ({...oldConfig, ...c}))
      }
    } catch (e) {
      console.error("could not load saved state");
      console.error(e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    const stepsToSave = steps.map(({ text, color }) => ({ text, color }));
    const configToSave = Object.keys(config).reduce((acc, key) => {
      if(config[key] !== INITIAL_CONFIG[key]) {
        return {...acc, [key]: config[key]};
      }
      return acc;
    }, {});
    const param = JSONCrush.crush(JSON.stringify({s: stepsToSave, c: configToSave }));
    document.location.hash = encodeURIComponent(param);
  }, [steps, config, loaded]);

  return (
    <DndProvider backend={HTML5Backend}>
      { loaded && <>
        <Process steps={steps} config={config} />
        <section className="config">
          <div className="config--panel">
            <Editor config={config} steps={steps} setSteps={setSteps} />
          </div>
          <div className="config--panel">
            <Config config={config} setConfig={setConfig} />
          </div>
        </section>
      </>}
    </DndProvider>
  );
}

export default App;
