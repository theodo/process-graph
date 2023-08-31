import { useCallback } from 'react';
import EditorField from './EditorField';

function Editor({steps, setSteps, config}) {
  const addStep = useCallback(() => {
    setSteps(s => [...s, {text: "", id: Math.random()}]);
  }, [setSteps]);

  return (
    <>
      <div className="editor--steps">
        {steps.map((step, index) => (
          <EditorField step={step} key={step.id} setSteps={setSteps} index={index} config={config} />
        ))}
      </div>
      <button onClick={addStep}>➕</button>
    </>
  );
}

export default Editor;
