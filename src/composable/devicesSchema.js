import * as yup from 'yup'

export const addDeviceSchema = yup.object({
  code: yup.string().required().label('ID'),
  password: yup.string().required().min(8),
  name: yup.string().required().label('Name'),
  // no: yup.number().required().label('No'),
  type: yup.string().required().label('Type'),
  coordinate: yup.string().required().label('Coordinate'),
});

export const updateDeviceSchema = yup.object({
  deviceId: yup.string().required(),
  name: yup.string().required().label('Name')
});