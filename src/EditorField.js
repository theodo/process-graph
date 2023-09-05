import { useCallback } from 'react';
import DraggableListItem from './DraggableListItem';

function EditorField({step, setSteps, index, config}) {
  const moveStep = useCallback((previousIndex, newIndex) => {
    setSteps(steps => {
      const newSteps = [...steps];
      const movingStep = newSteps.splice(previousIndex, 1)[0];
      newSteps.splice(newIndex, 0, movingStep);
      return newSteps;
    })
  }, [setSteps]);
  const setStepValue = useCallback((event) => {
    const value = event.target.value;
    setSteps(steps => {
      const index = steps.indexOf(step);
      const newSteps = [...steps];
      newSteps.splice(index, 1, {...step, text: value});
      return newSteps;
    });
  }, [setSteps, step]);
  const setStepColor = useCallback((event) => {
    const value = event.target.value;
    setSteps(steps => {
      const index = steps.indexOf(step);
      const newSteps = [...steps];
      newSteps.splice(index, 1, {...step, color: value});
      return newSteps;
    });
  }, [setSteps, step]);
  const removeStep = useCallback(() => {
    setSteps(steps => steps.filter((stepCandidate) => step !== stepCandidate));
  }, [setSteps, step]);

  return (
    <DraggableListItem className="editor--step" id={step.id} index={index} type="editorStep" moveItem={moveStep}>
      <input className="editor--step--field" type="text" value={step.text || ''} onChange={setStepValue} />
      <input className="editor--step--field" type="text" value={step.color || ''} onChange={setStepColor} placeholder={config["--step-color"]} />
      <button onClick={removeStep} className="editor--step--remove">🗑</button>
    </DraggableListItem>
  );
}

export default EditorField;
