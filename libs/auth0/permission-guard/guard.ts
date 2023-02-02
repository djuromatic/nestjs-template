import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();

    const userPermissions =
      this.parseJwt(req?.headers?.authorization).permissions || [];
    console.log(userPermissions);
    const requiredPermissions =
      this.reflector.get('permissions', context.getHandler()) || [];

    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      return true;
    }

    throw new ForbiddenException('Insufficient Permissions');
  }

  parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
}
