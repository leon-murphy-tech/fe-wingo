import { EnvironmentOutlined } from '@ant-design/icons';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useController, useWatch } from 'react-hook-form';
import { getGeocode } from 'use-places-autocomplete';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

// ==============================|| GOOGLE MAP - AUTOCOMPLETE ||============================== //

const GoogleMaps = ({ name, control, setValue, index, sender, readOnly, address, user }) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  const [inputValue, setInputValue] = React.useState(value?.description);
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  const watchCountry = useWatch({
    control,
    name: [`senderInfo.${index}.country`, `receiverInfo.${index}.country`, `userForm.${index}.country`, `address.${index}.country`]
  });

  const getCountryCode = (value) => {
    if (value) {
      return value.code;
    } else return '';
  };

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        // eslint-disable-next-line no-undef
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(
          {
            ...request,
            componentRestrictions: {
              country: sender
                ? getCountryCode(watchCountry[0])
                : address
                ? getCountryCode(watchCountry[3])
                : user
                ? getCountryCode(watchCountry[2])
                : getCountryCode(watchCountry[1])
            }
          },
          callback
        );
      }, 200),
    [sender, watchCountry, address, user]
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        // if (value) {
        //   newOptions = [value];
        // }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch, value]);

  // console.log('----', value);
  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        } else {
          const customOption = option.description.split(',');
          customOption.splice(-3, 3);

          return customOption.join();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      value={value}
      selectOnFocus
      handleHomeEndKeys
      options={options}
      readOnly={readOnly}
      freeSolo
      fullWidth
      autoHighlight
      onClose={(event, reason) => {
        if (reason === 'blur') {
          onChange(inputValue);
        }
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          onChange(newValue);
        } else {
          setOptions(newValue ? [newValue, ...options] : options);
          onChange(newValue);
        }

        let address1 = '';
        getGeocode({ address: newValue?.description }).then((results) => {
          results[0].address_components.filter((locData) => {
            if (locData.types[0] === 'route') {
              if (locData.long_name !== undefined) address1 = address1 !== '' ? `${locData.long_name} ${address1}` : locData.long_name;
            }

            if (locData.types[0] === 'street_number') {
              if (locData.long_name !== undefined) address1 = address1 !== '' ? `${address1} ${locData.long_name}` : locData.long_name;
            }

            if (locData.types[0] === 'administrative_area_level_2' && watchCountry[0]?.code === 'VN') {
              if (sender) {
                locData.long_name !== undefined && setValue(`senderInfo.${index}.city`, locData.long_name, { shouldValidate: true });
              }
            }

            if (locData.types[0] === 'locality' || (locData.types[0] === 'postal_town' && watchCountry[0]?.code !== 'VN')) {
              if (user) {
                locData.long_name !== undefined && setValue(`userForm.${index}.city`, locData.long_name, { shouldValidate: true });
              }
              if (address) {
                locData.long_name !== undefined && setValue(`address.${index}.city`, locData.long_name, { shouldValidate: true });
              }

              locData.long_name !== undefined && setValue(`receiverInfo.${index}.city`, locData.long_name, { shouldValidate: true });
              locData.long_name !== undefined && setValue(`city`, locData.long_name, { shouldValidate: true });
            }

            if (locData.types[0] === 'administrative_area_level_1') {
              if (sender) {
                locData.long_name !== undefined && setValue(`senderInfo.${index}.state`, locData.long_name, { shouldValidate: true });
              } else {
                if (user) {
                  locData.long_name !== undefined && setValue(`userForm.${index}.state`, locData.long_name, { shouldValidate: true });
                }
                if (address) {
                  locData.long_name !== undefined && setValue(`address.${index}.state`, locData.long_name, { shouldValidate: true });
                }
                locData.long_name !== undefined && setValue(`receiverInfo.${index}.state`, locData.long_name, { shouldValidate: true });
              }
            }

            if (locData.types[0] === 'postal_code') {
              if (sender) {
                locData.long_name !== undefined && setValue(`senderInfo.${index}.zipcode`, locData.long_name, { shouldValidate: true });
                locData.long_name !== undefined && setValue(`senderInfo.${index}.zip`, locData.long_name, { shouldValidate: true });
              } else {
                if (user) {
                  locData.long_name !== undefined && setValue(`userForm.${index}.zip`, locData.long_name, { shouldValidate: true });
                }
                if (address) {
                  locData.long_name !== undefined && setValue(`address.${index}.zip`, locData.long_name, { shouldValidate: true });
                }
                locData.long_name !== undefined && setValue(`receiverInfo.${index}.zipcode`, locData.long_name, { shouldValidate: true });
              }
            }
            return false;
          });
        });
      }}
      onInputChange={(event, newInputValue) => {
        // console.log('---inpute', newInputValue);
        setInputValue(newInputValue);
      }}
      inputValue={inputValue}
      renderInput={(params) => {
        return <TextField {...params} placeholder="Search your address" fullWidth error={error} autoComplete="off"></TextField>;
      }}
      renderOption={(props, option) => {
        const typeString = typeof option === 'string';
        let parts;
        if (!typeString) {
          const matches = option?.structured_formatting?.main_text_matched_substrings;
          parts = parse(
            option?.structured_formatting?.main_text,
            matches?.map((match) => [match?.offset, match?.offset + match?.length])
          );
        }

        return (
          <>
            {typeString && ''}
            {!typeString && (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Box component={EnvironmentOutlined} sx={{ color: 'text.secondary', mr: 2 }} />
                  </Grid>
                  <Grid item xs>
                    {parts?.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400
                        }}
                      >
                        {part?.text}
                      </span>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                      {option?.structured_formatting?.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            )}
          </>
        );
      }}
    />
  );
};

export default GoogleMaps;

GoogleMaps.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string,
  index: PropTypes.number,
  sender: PropTypes.bool,
  setValue: PropTypes.func,
  readOnly: PropTypes.bool,
  address: PropTypes.bool,
  user: PropTypes.bool
};

GoogleMaps.defaultProps = {
  readOnly: false,
  adress: false,
  user: false
};
