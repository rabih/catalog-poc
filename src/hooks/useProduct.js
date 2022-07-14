import { useQuery } from "react-query";

const useProduct = ({companyId}) => {

  const getProduct = async () => {

    /* hasMore: bool
      next: string (url)
      previous: string (url)
      data: [{}]
      error: Error */

    const res = await fetch("https://api.convictional.com/buyer/products", {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'DLKMRheFhC9IZL40pAgkHWB98aye8epC',
        'Access-Control-Allow-Origin': '*',
      }
    });
    let products = await res.json();
    if (companyId) {
      products.data = products?.data?.filter(product => product.companyId === companyId)
    }
    return products
  }

  const { data: productResponse, isLoading: productLoading } = useQuery(
    'product',
    () => getProduct(),
    {
      staleTime: 30000, // 30 seconds until stale
      enabled: true,
      onError: err => {
          console.error(`Failed to fetch price list ${err}`);
      },
    }
  );

  return {
    productResponse,
    productLoading,
  };
};

export default useProduct;