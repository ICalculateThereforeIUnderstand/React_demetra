import React, { useCallback, useEffect } from 'react';

function useAsync(callback, dependencies = []) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [value, setValue] = React.useState();
  
    const callbackMemoized = useCallback(() => {
      setLoading(true);
      setError(undefined);
      setValue(undefined);
      callback().then(setValue).catch(setError).finally(() => setLoading(false))
    }, dependencies);
  
    useEffect(() => {
      callbackMemoized();
    }, [callbackMemoized]);
  
    return [ loading, error, value ]
  }
  
  const DEFAULT_OPTIONS = {
    headers: {"Content-Type": "application/json"},
  }
  
export default function useFetch(url, options={}, dependencies = []) {
    return useAsync(()=> {
      return fetch(url, {...DEFAULT_OPTIONS, ...options}).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
      })
    }, dependencies)
  }

