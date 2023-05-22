import { RepositoryResult } from '../helpers/RepositoryResult'
import { ICredentials, IUser, UserModel } from '../models/user.model'
import { Repository } from './Repository'
import { HTTP_STATUS } from '../constants/http'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { buildPermissions } from '../helpers/permissionsBuilder'
import { EModule } from '../constants/app'
import { conekta } from '../helpers/conekta'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'
dotenv.config()

export class AuthRepository extends Repository<typeof UserModel> {
  stripe: any
  constructor() {
    super(UserModel)
    this.stripe = new Stripe(process.env['STRIPE_SECRET'] as string, { apiVersion: '2022-11-15' })
  }

  public async registerUser(user: IUser): Promise<RepositoryResult> {
    try {
      user.permissions = buildPermissions([EModule.CART, EModule.PAYMENTS])
      // const conektaData = await (
      //   await conekta('customers')
      // ).post({ email: user.email, name: `${user.firstname} ${user.lastname}`, phone: user.phone })

      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        phone: user.phone,
        currency: 'MXN'
      })

      user.conektaCustomerId = customer.id

      const { _id, firstname, lastname, email, phone } = await this.model.create(user)
      return new RepositoryResult({ _id, firstname, lastname, email, phone }, null)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  public async authorize(credentials: ICredentials): Promise<RepositoryResult> {
    try {
      const user = await this.model.findOne({ email: credentials.email }).select('password permissions').exec()

      if (!user) {
        return new RepositoryResult(null, {
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          details: 'Wrong credentials'
        })
      }

      if (!compareSync(credentials.password, user.password)) {
        return new RepositoryResult(null, {
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          details: 'Wrong credentials'
        })
      }
      return new RepositoryResult(
        {
          accessToken: sign({ oid: user._id }, 'secreto', { expiresIn: '120s' })
        },
        null
      )
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }

  // TODO: metodos para el refresco de token
}
