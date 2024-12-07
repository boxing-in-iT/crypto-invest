import { useState, useEffect } from "react";
import { useSeacrhCoinByNameQuery } from "../store/api/coinApi";

export const useSearchCoin = (searchQuery: string) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { data, error, isFetching } = useSeacrhCoinByNameQuery(searchQuery);

  useEffect(() => {
    if (data && data.coins) {
      // Обновление searchResults на основе полученных монет
      setSearchResults(data.coins);
    }
  }, [data]);

  return { searchResults, setSearchResults, isFetching, error };
};
