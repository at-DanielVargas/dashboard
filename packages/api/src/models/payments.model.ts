import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { model, PaginateModel, Schema } from 'mongoose'
import { array, number, object, string } from 'yup'
import { Shape } from '../interfaces'

export interface IPayment {
  amount: number
  sale?: any
  client: any
  paginate?: PaginateModel<IPayment>
  createdAt?: Date
  updatedAt?: Date
}

const PaymentSchema = new Schema(
  {
    amount: {
      type: Schema.Types.Number,
      required: true
    },
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'payments'
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      autopopulate: {
        select: 'firstname lastname email '
      }
    }
  },
  { timestamps: true, versionKey: false, strict: false }
)

PaymentSchema.plugin(mongoosePaginate)
PaymentSchema.plugin(autopopulate)

interface PaymentDocument extends Document, IPayment {}

export const PaymentModel = model<PaymentDocument, PaginateModel<PaymentDocument>>('payments', PaymentSchema)

export const CreatePaymentDto = object().shape<Shape<IPayment>>({
  amount: number().required(),
  client: string().required()
})

export const CreateCardTokenDto = object().shape({
  cvc: string().required(),
  expMonth: number().required().max(12),
  expYear: number().required(),
  name: string().required(),
  number: string().required()
})
