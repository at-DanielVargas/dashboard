import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { ICredentials, IUser, UserModel } from '../models/user.model'
import { Repository } from './Repository'
import { HTTP_STATUS } from '../constants/http'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { buildPermissions } from '../helpers/permissionsBuilder'
import { EModule } from '../constants/app'
import axios from 'axios'
import { conekta } from '../helpers/conekta'

export class AuthRepository extends Repository<typeof UserModel> {
  constructor() {
    super(UserModel)
  }

  public async registerUser(user: IUser): Promise<RepositoryResult> {
    try {
      user.permissions = buildPermissions([EModule.SALES, EModule.PAYMENTS])

      const conektaData = await (
        await conekta('customers')
      ).post({ email: user.email, name: `${user.firstname} ${user.lastname}`, phone: user.phone })

      user.conektaCustomerId = conektaData.id

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
}
