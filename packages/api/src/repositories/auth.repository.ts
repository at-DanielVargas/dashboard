import { RepositoryResult } from '../helpers/RepositoryResult'
import { AppServiceOptions } from '../interfaces'
import { IUser, UserModel } from '../models/user.model'
import { Repository } from './Repository'
import '../helpers/passport'
import { HTTP_STATUS } from '../constants/http'

export class AuthRepository extends Repository<typeof UserModel> {
  constructor() {
    super(UserModel)
  }

  public async registerUser(user: IUser): Promise<RepositoryResult> {
    try {
      return new RepositoryResult(await this.model.create(user), null)
    } catch (error) {
      return new RepositoryResult(null, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: error
      })
    }
  }
}
