import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { getRequest } from "utils/requests";

const PRODUCTS_QUERY_KEY = 'products';
const PRODUCTS_PAGE_LIMIT = 30;
const TEN_MINUTES = 10 * 60 * 1000;

const useProduct = ({companyId, enabled}) => {
  const [products, setProducts] = useState([]);

  const getProducts = async (params) => {

    const res =  await getRequest('/buyer/products', params);
    if (companyId && products) {
      res.data = res?.data?.filter(product => product.companyId === companyId);
    }
    return res;
  }

  const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    PRODUCTS_QUERY_KEY,
    ({ pageParam = 0 }) => getProducts({ limit: PRODUCTS_PAGE_LIMIT, page: pageParam }),
    {
      enabled,
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
      onSuccess: ({ pages }) => {
        const lastPage = pages[pages.length - 1];
        const shouldFetchMore = lastPage.data?.length === PRODUCTS_PAGE_LIMIT;
        if (shouldFetchMore) {
          fetchNextPage({ pageParam: pages.length });
          return;
        }
        const allProducts = pages.reduce((list, page) => [...list, ...page.data], []);
        setProducts(allProducts);
      },
    }
  );

  return {
    products,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  };
};

export default useProduct;