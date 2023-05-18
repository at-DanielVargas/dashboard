import { Request, Response, NextFunction } from 'express';

// Función para verificar si el usuario tiene un token de acceso válido
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization');
  // pendiente logica de validacion de token y api_key
  if (token === 'FLDSMDFR') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized.' });
  }
};

export const authorize = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // pendiente implementar logica de obtencion de permisos
    const userPermissions: string[] = [
      'admin',
      'create_category',
      'create_product',
    ];

    const hasPermission = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ error: 'Not access.' });
    }
  };
};
