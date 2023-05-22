import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { model, PaginateModel, Schema } from 'mongoose'
import { array, number, object, string } from 'yup'
import { Shape } from '../interfaces'

export interface IPayment {
  amout: number
  sale: any // -> referencia a conekta u otro servicio
  client: any
  paginate?: PaginateModel<IPayment>
  createdAt?: Date
  updatedAt?: Date
}

const PaymentSchema = new Schema(
  {
    amout: {
      type: Schema.Types.Number,
      required: true
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
  amout: number().required(),
  client: string().required(),
  sale: string().required()
})
