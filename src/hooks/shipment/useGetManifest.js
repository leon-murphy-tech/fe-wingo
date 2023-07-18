import { useQuery } from '@tanstack/react-query';
import manifestApi from 'api/manifest';
// import { queryKeys } from 'hooks/queryKeys';

const useGetManifest = () => {
  return useQuery({
    queryKey: ['manifest'],
    queryFn: async () => await manifestApi.getAll()
  });
};

export { useGetManifest };
