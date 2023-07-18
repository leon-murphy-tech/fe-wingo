import { yupResolver } from '@hookform/resolvers/yup';
import MainCard from 'components/MainCard';
import { roundToCharge } from 'components/molecules/PackageItem';
import dayjs from 'dayjs';
import { useAddManifest } from 'hooks/manifest/useAddManifest';
import { useForm } from 'react-hook-form';
import { HeaderManifestFrom, ListManifestShipment } from 'sections/manifest';
import * as yup from 'yup';

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
    )
  })
  .required();

export const getListShipment = (arr) => {
  let list_shipments = [];
  arr?.forEach((item) => {
    const grossW = Number(item?.gross_weight);
    const volumeW = Number(item?.volume_weight);
    const charge_weight = grossW > volumeW ? roundToCharge(grossW) : roundToCharge(volumeW);
    list_shipments.push({ ...item, charge_weight });
  });
  return list_shipments;
};

export default function CreateManifest() {
  const { mutate } = useAddManifest();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: dayjs(),
      airway_bill_number: '',
      airline: '',
      country: undefined,
      status: '',
      total_hawb: '',
      total_gross_weight: '',
      total_charge_weight: '',
      list_shipments: [
        {
          hawb: '',
          receiver_name: '',
          gross_weight: '',
          volume_weight: ''
        }
      ]
    },
    resolver: yupResolver(schema)
  });

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

    mutate(payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onConfirm)} noValidate>
        <MainCard boxShadow={true}>
          <HeaderManifestFrom control={control} />
          <ListManifestShipment control={control} isEdit={false} />
        </MainCard>
      </form>
    </>
  );
}
