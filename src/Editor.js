import { useCallback } from 'react';

function Editor({steps, setSteps, config}) {
  const setStepValue = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    const value = event.target.value;
    setSteps(s => {
      const newSteps = [...s];
      newSteps.splice(index, 1, {...s[index], text: value});
      return newSteps;
    });
  }, [setSteps]);
  const setStepColor = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    const value = event.target.value;
    setSteps(s => {
      const newSteps = [...s];
      newSteps.splice(index, 1, {...s[index], color: value});
      return newSteps;
    });
  }, [setSteps]);
  const removeStep = useCallback((event) => {
    const index = parseInt(event.target.attributes.xstepindex.value, 10);
    setSteps(s => s.filter((_, stepIndex) => stepIndex !== index));
  }, [setSteps]);
  const addStep = useCallback(() => {
    setSteps(s => [...s, {text: ""}]);
  }, [setSteps]);

  return (
    <>
      {steps.map((step, index) => (
        <div key={index} className="editor--step">
          <input className="editor--step--field" type="text" xstepindex={index} value={step.text} onChange={setStepValue} />
          <input className="editor--step--field" type="text" xstepindex={index} value={step.color} onChange={setStepColor} placeholder={config["--step-color"]} />
          <button onClick={removeStep} xstepindex={index} className="editor--step--remove">🗑</button>
        </div>
      ))}
      <button onClick={addStep}>➕</button>
    </>
  );
}

export default Editor;
