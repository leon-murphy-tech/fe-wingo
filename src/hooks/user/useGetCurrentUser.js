import { useQuery } from '@tanstack/react-query';
import userApi from 'api/userApi';

const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => await userApi.getCurrentUser()
  });
};

export { useGetCurrentUser };
