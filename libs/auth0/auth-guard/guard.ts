import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from 'utils/exceptions';
import { promisify } from 'util';
import { expressjwt as jwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ISecretsService } from 'libs/global/secrets/adapter';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private secrets: ISecretsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req, res] = [context.getArgByIndex(0), context.getArgByIndex(1)];
    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.secrets.auth0.issuer}.well-known/jwks.json`,
        }) as any,
        audience: this.secrets.auth0.audiance,
        issuer: this.secrets.auth0.issuer,
        algorithms: ['RS256'],
        // TODO: Caution ignores expired tokens, would need to refreshTokens
        // ignoreExpiration: false,
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      // throwing error
      throw new UnauthorizedException(error);
    }
  }
}
