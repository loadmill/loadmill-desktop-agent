import React, { SyntheticEvent, useState } from 'react';

export const Token = (): JSX.Element => {
  const [token, setToken] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.api.startAgent(token);
  };

  const handleStop = (_event: SyntheticEvent) => {
    window.api.stopAgent();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label>
          TOKEN:
          <input
            onChange={ handleChange }
            type="text"
            value={ token }
          />
        </label>
        <input
          type="submit"
          value="Submit"
        />
      </form>
      <button onClick={ handleStop }>Stop Agent</button>
    </>
  );
};
