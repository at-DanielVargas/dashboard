import { model, Schema } from 'mongoose';

export interface ITrackingAddress {
  ZipCode: string;
  State: string;
  City: string;
  Neighborhood: string;
  Address1: string;
  Address2: string;
  Residential: boolean;
}

export interface ITracking {
  CourierName: string;
  CourierCode: string;
  CourierServiceId: string;
  CourierService: string;
  AddressFrom: ITrackingAddress;
  AddressTo: ITrackingAddress;
  TrackingNumber: string;
  Status: string;
  TrackingStatus: string;
}

const TrackingSchema = new Schema<ITracking>(
  {
    CourierName: {
      type: Schema.Types.String,
    },
    CourierCode: {
      type: Schema.Types.String,
    },
    CourierServiceId: {
      type: Schema.Types.String,
    },
    CourierService: {
      type: Schema.Types.String,
    },
    TrackingNumber: {
      type: Schema.Types.String,
    },
    TrackingStatus: {
      type: Schema.Types.String,
    },
    Status: {
      type: Schema.Types.String,
    },
    AddressFrom: {
      ZipCode: { type: Schema.Types.String },
      State: { type: Schema.Types.String },
      City: { type: Schema.Types.String },
      Neighborhood: { type: Schema.Types.String },
      Address1: { type: Schema.Types.String },
      Address2: { type: Schema.Types.String },
      Residential: { type: Schema.Types.Boolean },
    },
    AddressTo: {
      ZipCode: { type: Schema.Types.String },
      State: { type: Schema.Types.String },
      City: { type: Schema.Types.String },
      Neighborhood: { type: Schema.Types.String },
      Address1: { type: Schema.Types.String },
      Address2: { type: Schema.Types.String },
      Residential: { type: Schema.Types.Boolean },
    },
  },
  { timestamps: true, versionKey: false }
);

export const TrackingModel = model('tracking', TrackingSchema);
