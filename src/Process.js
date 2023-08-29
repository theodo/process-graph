function Process({ steps, config }) {
  return (
    <section className="process" style={config}>
      {steps.map((step, index) => (
        <div key={index} className="process--step" style={{ zIndex: steps.length - index, "--step-color": step.color }}>{step.text}</div>
      ))}
    </section>
  );
}

export default Process;
