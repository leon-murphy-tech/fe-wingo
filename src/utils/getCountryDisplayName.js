import { countriesList } from './countries';

export const getCountryDisplayName = (code) => {
  const countryName = countriesList.find((item) => item.code === code);
  return countryName?.label;
};
