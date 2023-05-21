import { Response, NextFunction } from 'express'
import { UserModel } from '../models/user.model'
import { HTTP_STATUS } from '../constants/http'
import { AppRequest } from '../interfaces'
import { verify } from 'jsonwebtoken'

export const authenticate = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7)

      const decodedToken = verify(token, 'secreto')
      if (decodedToken) {
        const user = await UserModel.findOne({ _id: decodedToken['oid'] }).select('permissions').exec()

        if (!user) {
          res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Not access.' })
        }
        req.user = user
        next()
      } else {
        res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Not access.' })
      }
    } else {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Not access.' })
    }
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: { type: error.name, details: error.message } })
  }
}

export const authorize = (permissions: string[]) => {
  return (req: AppRequest, res: Response, next: NextFunction): void => {
    const userPermissions: string[] = req.user.permissions

    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Not access.' })
    }

    const hasPermission = permissions.some((permission) => userPermissions.includes(permission))

    if (hasPermission) {
      next()
    } else {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Not access.' })
    }
  }
}
