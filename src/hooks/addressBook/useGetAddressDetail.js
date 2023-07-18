import { useQuery } from '@tanstack/react-query';
import adddressBookApi from 'api/addressBookApi';

const useGetAddressDetail = (id) => {
  return useQuery({
    queryKey: ['addressBook', id],
    queryFn: async () => await adddressBookApi.get(id),
    enabled: !!id
  });
};

export { useGetAddressDetail };
