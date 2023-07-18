export const getAddressFromGGmaps = (value) => {
  console.log('value', value);

  if (typeof value === 'string') {
    return value;
  } else {
    const customOption = value?.description?.split(',');
    customOption?.splice(-3, 3);

    return customOption?.join();
  }
};
