export interface ITracking {
  AddressFrom: Address
  AddressTo: Address
  _id: string
  TrackingNumber: string
  created_at: string
  updated_at: string
  ChangeZipCode: any
  Content: string
  CouponCode: any
  CourierCode: string
  CourierHeight: number
  CourierLength: number
  CourierName: string
  CourierService: string
  CourierServiceId: string
  CourierVolumetricWeight: number
  CourierWeight: number
  CourierWidth: number
  CoveredAmount: number
  CoveredWeight: number
  CreatedAt: string
  DeliveredAt: any
  DiasEnTransito: number
  DiscountAmount: number
  ExpiresAt: string
  ExtrasAmount: number
  HasChangeZipCode: boolean
  HasExceptions: boolean
  HasLost: number
  History: History[]
  InsuranceAmount: number
  InsuredAmount: number
  OriginalHeight: number
  OriginalLength: number
  OriginalVolumetricWeight: number
  OriginalWeight: number
  OriginalWidth: number
  OverWeight: number
  OverWeightCounterAmount: number
  OverWeightPrice: number
  Owner: string
  OwnerId: string
  Parcel: Parcel
  QuotedAmount: number
  QuotedWeight: number
  RealWeight: number
  ReceivedAt: any
  ReceivedBy: any
  Recipient: Recipient
  ResellerId: string
  ResellerReference: string
  SendRecipientNotifications: boolean
  Sender: Recipient
  ShipmentId: string
  Status: string
  TotalAmount: number
  TrackingStatus: string
  TransitAt: any
  WaybillNumber: string
  transactions: Transaction[]
}

interface Address {
  City: string
  ZipCode: string
  State: string
  Neighborhood: string
  Address1: string
  Address2: string
  Residential: boolean
  UserState: string
}

interface History {
  Date: string
  Details: string
}

interface Parcel {
  Height: number
  Width: number
  Length: number
  Weight: number
  VolumetricWeight: number
}

interface Recipient {
  CompanyName: string
  Phone1: string
  Email: string
  Name: string
}

interface Transaction {
  id: string
  Date: string
  Type: string
  Amount: number
  Status: number
  TypeId: number
  ParentId: any
  MovementType: number
}
