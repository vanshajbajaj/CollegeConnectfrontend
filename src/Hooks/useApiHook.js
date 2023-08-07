import { useCallback, useState } from "react";

const useApiHook = (callback, body = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiCall = useCallback(async () => {
    try {
      setLoading(true);
      const response = await callback(body);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [callback, body]);

  return { data, error, loading, apiCall };
};

export default useApiHook;
