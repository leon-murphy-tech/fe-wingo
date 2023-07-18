import { useQuery } from '@tanstack/react-query';
import userApi from 'api/userApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetAllUSer = () => {
  return useQuery({
    queryKey: ['allUser'],
    queryFn: async () => await userApi.getAll()
  });
};

export { useGetAllUSer };
