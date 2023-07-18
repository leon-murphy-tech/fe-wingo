import { useQuery } from '@tanstack/react-query';
import trackingApi from 'api/trackingShipmentApi';

const useGetTracking = () => {
  return useQuery({
    queryKey: ['tracking'],
    queryFn: async () => await trackingApi.getAll()
  });
};

export { useGetTracking };
