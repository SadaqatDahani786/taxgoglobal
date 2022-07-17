import { useState, useCallback } from "react";

/**
 ** ====================================
 ** CUSTOM HOOK [useFetch]
 ** ====================================
 */
const useFetch = ({ url, options }) => {
  //State
  const [optionsState] = useState(options);
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Request API
  const request = useCallback(
    async (body, onResponse, onError) => {
      //Set status
      setLoading(true);
      setError(false);

      //Add body in options if given in params
      const newOptions = body ? { ...optionsState, body: body } : optionsState;

      //Make request
      try {
        //Response
        const res = await fetch(url, newOptions);

        //If http status 204(No content) return imediately
        if (res.status === 204) return onResponse();

        //Response as json
        const resJson = await res.json();

        //If status not success, throw an error
        if (resJson.status !== "success")
          throw new Error(resJson.error_message);

        //Set Response
        setResponse(resJson);

        //Call callback with a response
        onResponse(resJson);
      } catch (err) {
        //Error status and callback
        setError(true);
        onError(
          new Error(
            "Connection to server failed, it seems the server is down. Please try again later."
          )
        );
      } finally {
        //Loading status
        setLoading(false);
      }
    },
    [url, optionsState]
  );

  return [request, response, loading, error];
};

export default useFetch;
