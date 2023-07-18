import { useQuery } from '@tanstack/react-query';
import notificationApi from 'api/noticationApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetNotification = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: async () => await notificationApi.getAll()
  });
};

export { useGetNotification };
