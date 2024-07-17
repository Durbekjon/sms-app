import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/auth/dto/IUser';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
