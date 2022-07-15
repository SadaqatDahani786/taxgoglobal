import { useCallback, useEffect, useState } from 'react';

/**
 ** ====================================
 ** CUSTOM HOOK [useInput]
 ** ====================================
 */
const useInput = (default_value, validation) => {
  //State
  const [input, setInput] = useState();
  const [inputError, setInputError] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  //Validate Input
  const inputValidate = useCallback(
    (val = input) => {
      //validate input
      const [error, message] = validation(val);
      //set input and error
      setInputError(error);
      setInputTouched(true);
      setInputErrorMessage(message);
    },
    [input, validation]
  );

  //Set default Value
  useEffect(() => {
    setInput(default_value);
    if (default_value) setInputTouched(true);
  }, [default_value]);

  //Blur Handler
  const onBlurHandler = (e) => {
    inputValidate();
  };

  //Change HAndler
  const onChangeHandler = (e) => {
    const val = e.target.value;
    setInput(val);
    inputValidate(val);
  };

  //Reset Input State
  const reset = (resetToDefault) => {
    if (resetToDefault) {
      setInput(default_value);
      inputValidate(default_value);
    } else {
      setInput(undefined);
      setInputError(false);
      setInputTouched(false);
    }
  };

  //return
  return {
    onChangeHandler,
    onBlurHandler,
    value: input,
    validation: {
      error: inputError,
      message: inputErrorMessage,
      touched: inputTouched,
      validate: inputValidate,
    },
    reset,
  };
};

export default useInput;