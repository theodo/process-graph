import { useCallback } from 'react';

function Config({ config, setConfig }) {
  const updateConfig = useCallback((event) => {
    const key = event.target.attributes.xconfigkey.value;
    setConfig(config => ({...config, [key]: event.target.value}))
  }, [setConfig])

  return (
    <>
        {Object.keys(config).map(key => (
          <div key={key}>
            <label className="config--panel--control">
              {key.substring(2)}
              <input value={config[key]} onChange={updateConfig} xconfigkey={key}></input>
            </label>
          </div>
        ))}
    </>
  );
}

export default Config;
