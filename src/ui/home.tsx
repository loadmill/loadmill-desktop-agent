import React, { useState } from 'react';

export const Home = () => {
  const [token, setToken] = useState<string>('');

  const handleSubmit = (event: any) => {
    console.log('A token was submitted: ' + token)
    event.preventDefault();
    console.log(window.api)
    window.api.startAgent(token);
  }

  const handleStop = (event: any) => {
    console.log('Stopping the agent...');
    window.api.stopAgent();
  }

  const handleChange = (event: any) => {
    setToken(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          TOKEN:
          <input type="text" value={token} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleStop}>Stop Agent</button>
    </>
  );
};
