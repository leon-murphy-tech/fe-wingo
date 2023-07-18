import { useQuery } from '@tanstack/react-query';
import trackingApi from 'api/trackingShipmentApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetTrackingDetail = (id) => {
  return useQuery({
    queryKey: ['tracking', id],
    queryFn: async () => await trackingApi.get(id),
    enabled: !!id
  });
};

export { useGetTrackingDetail };
