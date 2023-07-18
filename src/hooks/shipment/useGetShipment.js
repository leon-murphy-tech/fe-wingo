import { useQuery } from '@tanstack/react-query';
import shipmentApi from 'api/shipmentApi';

const useGetShipment = () => {
  return useQuery({
    queryKey: ['shipments'],
    queryFn: async () => await shipmentApi.getAll()
  });
};

export { useGetShipment };
