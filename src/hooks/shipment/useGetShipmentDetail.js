import { useQuery } from '@tanstack/react-query';
import shipmentApi from 'api/shipmentApi';

const useGetShipmentDetail = (shipmentId) => {
  return useQuery({
    queryKey: ['shipments', shipmentId],
    queryFn: async () => await shipmentApi.get(shipmentId),
    enabled: !!shipmentId
  });
};

export { useGetShipmentDetail };
