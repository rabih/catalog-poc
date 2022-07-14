import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { getRequest } from "utils/requests";

const PRODUCTS_QUERY_KEY = 'products';
const PRODUCTS_PAGE_LIMIT = 10;
const TEN_MINUTES = 10 * 60 * 1000;

const useProduct = ({companyId, enabled}) => {
  const [products, setProducts] = useState([]);

  const getProducts = async ({limit, page}) => {

    const res =  await getRequest('/buyer/products', {limit, page});
    if (companyId && res?.data) {
      res.data = res?.data?.filter(product => product.companyId === companyId);
    }
    return {data: res?.data, hasMore: res.hasMore};
  }

  const { isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    PRODUCTS_QUERY_KEY,
    ({ pageParam = 0 }) => getProducts({ limit: PRODUCTS_PAGE_LIMIT, page: pageParam }),
    {
      enabled,
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasMore) return pages.length + 1;
        return undefined;
      },
      onSuccess: ({ pages }) => {
        const allProducts = pages.reduce((list, page) => [...list, ...page.data], []);
        setProducts(allProducts);
      },
    }
  );

  return {
    hasNextPage,
    products,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  };
};

export default useProduct;