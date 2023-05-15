export enum EOrderKind {
    REFUND = 'refund',
    CANCELLATION = 'cancellation',
    WARRANTY = 'warranty',
    ADDITION = 'addition',
    PROMO = 'promo',
  }
  
  export interface IOrder {
    _id: string;
    kind: string;
    time: number;
    orderId: string;
    productSKU: string;
    RMA: string;
    address: string;
    trackingCode: string;
    __v: number;
    trackingCourier: string;
    trackingStatus: string;
    notes: string;
    addressFrom?: Record<string, string>;
    addressTo?: Record<string, string>;
  }
  