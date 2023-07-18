import { yupResolver } from '@hookform/resolvers/yup';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useGetManifestDetail } from 'hooks/manifest/useGetManifestDetail';
import { useUpDateManifest } from 'hooks/manifest/useUpdateManifest';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { HeaderManifestFrom, ListManifestHistory, ListManifestShipment } from 'sections/manifest';
import { countriesList } from 'utils';
import * as yup from 'yup';
import { getListShipment } from './createManifest';

const schema = yup
  .object({
    date: yup.date().required(''),
    airway_bill_number: yup.string().required(''),
    airline: yup.string().required(''),
    country: yup.object().required(),
    status: yup.string().required(''),
    total_hawb: yup.string().required(''),
    total_gross_weight: yup.string().required(''),
    total_charge_weight: yup.string().required(''),
    list_shipments: yup.array().of(
      yup.object().shape({
        hawb: yup.string().required(),
        receiver_name: yup.string().required(),
        gross_weight: yup.string().required(),
        volume_weight: yup.string().required()
      })
    ),
    Manifest_history: yup.array().of(
      yup.object().shape({
        date: yup.date().required(''),
        flight: yup.string().required(),
        detail: yup.string().required(),
        location: yup.string().required()
      })
    )
  })
  .required();

export default function EditManifest() {
  const { id } = useParams();

  const { data } = useGetManifestDetail(id);
  const { mutate } = useUpDateManifest();

  const countryValue = countriesList.find((item) => item.code === data?.manifest_Shipment?.country);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      date: dayjs(),
      airway_bill_number: '',
      airline: '',
      country: countryValue ? countryValue : null,
      status: '',
      total_hawb: '',
      total_gross_weight: '',
      total_charge_weight: '',
      list_shipments: [],
      Manifest_history: []
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (data && id) {
      setValue('date', dayjs(data?.manifest_Shipment?.created_at));
      setValue('airway_bill_number', data?.manifest_Shipment?.airway_bill_number);
      setValue('airline', data?.manifest_Shipment?.airline);
      setValue('country', countryValue);
      setValue('status', data?.manifest_Shipment?.status);
      setValue('total_hawb', data?.manifest_Shipment?.total_hawb);
      setValue('total_gross_weight', data?.manifest_Shipment?.total_gross_weight);
      setValue('total_charge_weight', data?.manifest_Shipment?.total_charge_weight);

      setValue(
        'list_shipments',
        data?.list_shipments?.map((item) => ({
          hawb: item.hawb,
          receiver_name: item.receiver_name,
          gross_weight: item.gross_weight,
          volume_weight: item.volume_weight
        }))
      );

      setValue(
        'Manifest_history',
        data?.Manifest_History?.map((item) => {
          const newEl = {
            date: dayjs(item?.date),
            flight: item?.flight,
            detail: item?.detail,
            location: item?.location
          };
          return newEl;
        })
      );
    }
  }, [data, setValue, countryValue, id]);

  const getHistory = (data) => {
    let history = [];
    data.forEach((item) => {
      const newItem = { ...item, date: dayjs(item?.date).format('YYYY-MM-DD') };
      history.push(newItem);
    });
    return history;
  };

  const onConfirm = (data) => {
    const payload = new FormData();
    payload.append('date', dayjs(data?.date).format('YYYY-MM-DD'));
    payload.append('airway_bill_number', data?.airway_bill_number);
    payload.append('airline', data?.airline);
    payload.append('country', data?.country?.code);
    payload.append('status', data?.status);
    payload.append('total_hawb', data?.total_hawb);
    payload.append('total_gross_weight', data?.total_gross_weight);
    payload.append('total_charge_weight', data?.total_charge_weight);
    payload.append('list_shipments', JSON.stringify([...getListShipment(data?.list_shipments)]));
    payload.append('Manifest_history', JSON.stringify([...getHistory(data?.Manifest_history)]));

    mutate({ payload, id });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onConfirm)}>
        <MainCard boxShadow={true}>
          <HeaderManifestFrom control={control} />
          <ListManifestShipment control={control} isEdit={true} />
          <ListManifestHistory control={control} />
        </MainCard>
      </form>
    </>
  );
}
