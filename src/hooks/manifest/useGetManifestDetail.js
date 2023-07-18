import { useQuery } from '@tanstack/react-query';
import manifestApi from 'api/manifest';

const useGetManifestDetail = (manifesId) => {
  return useQuery({
    queryKey: ['manifest', manifesId],
    queryFn: async () => await manifestApi.get(manifesId),
    enabled: !!manifesId
  });
};

export { useGetManifestDetail };
