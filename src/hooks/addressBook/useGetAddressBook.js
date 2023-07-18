import { useQuery } from '@tanstack/react-query';
import adddressBookApi from 'api/addressBookApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetAddressBook = () => {
  return useQuery({
    queryKey: ['addressBook'],
    queryFn: async () => await adddressBookApi.getAll()
  });
};

export { useGetAddressBook };
