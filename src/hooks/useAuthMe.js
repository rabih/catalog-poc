import { useState } from "react";
import { useQuery } from "react-query";
import { getRequest } from "utils/requests";

const AUTH_ME_QUERY_KEY = 'authMe';
const TEN_MINUTES = 10 * 60 * 1000;

const useAuthMe = () => {
  const [company, setCompany] = useState({});
  const [user, setUser] = useState({});

  const getAuthMe = async (params) => {

    return await getRequest('/auth/me', params);
  }

  const { isLoading } = useQuery(
    AUTH_ME_QUERY_KEY,
    () => getAuthMe(),
    {
      enabled: true,
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
      onSuccess: ({ data }) => {
        const { user, company }  = data;
        setCompany(company);
        setUser(user);
      },
    }
  );

  return {
    company,
    user,
    isLoading,
  };
};

export default useAuthMe;