import { Request, Response } from 'express';

export class AuthHandler {
  public authorize = async (req: Request, res: Response) => {};
  public register = async (req: Request, res: Response) => {};
  public refresh = async (req: Request, res: Response) => {};
  public forgot = async (req: Request, res: Response) => {};
  public confirm = async (req: Request, res: Response) => {};
}
