import { useQuery } from '@tanstack/react-query';
import serviceApi from 'api/servicesApi';

export function useServices() {
  const { data: serviceList } = useQuery({
    queryKey: ['services'],
    queryFn: async () => await serviceApi.getAll()
  });

  const getServiceName = (id) => {
    const service = serviceList?.find((item) => item.uuid === id);
    return service?.description;
  };

  return { serviceList, getServiceName };
}
