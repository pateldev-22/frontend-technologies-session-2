import { useFetch } from "./useFetch";

export function fetchAllProducts(url : string) {
  const apiUrl = url;

  const { data, loading, error } = useFetch(apiUrl);


  return { data, loading, error };
}

