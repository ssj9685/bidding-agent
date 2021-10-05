import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const result = (await super.canActivate(context)) as boolean;
    console.log('JwtAuthGuard can active', result);
    return result;
  }

  handleRequest(err, user, info, context) {
    //console.log(err, user, info);
    // You can throw an exception based on either "info" or "err" arguments

    //const [req, res, next] = context.getArgs();
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    if (err || !user) {
      if (req.url !== '/signin') {
        res.redirect('/signin');
      }
      return null;
    }
    //console.log('To check url', req);
    if (req.url === '/signin') {
      res.redirect('/');
    }
    console.log('JwtAuthGuard handleRequest', user);
    return user;
  }
}
