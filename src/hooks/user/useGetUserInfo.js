import { useQuery } from '@tanstack/react-query';
import userApi from 'api/userApi';

const useGetUserInfo = (uuid) => {
  return useQuery({
    queryKey: ['userInfo', uuid],
    queryFn: async () => await userApi.get(uuid),
    enabled: !!uuid
  });
};

export { useGetUserInfo };
