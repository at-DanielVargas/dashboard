import { Request, Response } from 'express'
import { AuthRepository } from '../repositories/auth.repository'

export class AuthHandler {
  repository: AuthRepository
  constructor() {
    this.repository = new AuthRepository()
  }

  // metodo para la generacion de los tokens de acceso y refresco
  public authorize = async (req: Request, res: Response) => {}
  // metodo para el registro de nuevos usuarios en la plataforma
  public register = async (req: Request, res: Response) => {
    const { error, data } = await this.repository.registerUser(req.body)
    if (error) {
      return res.status(error.statusCode).json({ error: error.details })
    }
    return res.send(data)
  }
  // metodo para invalidar el token de acceo actual y generar uno nuevo dependiendo si el token de refresco es valido
  public refresh = async (req: Request, res: Response) => {}
  // recuperacion de contrasena
  public recovery = async (req: Request, res: Response) => {}
  // confirmacion de cuentas nuevas accesible para los usuarios que se registen a comprar en la platafoma
  public confirm = async (req: Request, res: Response) => {}
}
