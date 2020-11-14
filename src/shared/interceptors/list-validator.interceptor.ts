import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ListValidatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log({ context: context.getArgs() });
    let request = context.switchToHttp().getRequest();

    request.headers['content-range'] = '33';
    console.log(request);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // });

    return next.handle();

    // return next.handle().pipe(
    //   map(val => {
    //     console.log('cafe', val);
    //   }),
    // );
  }
}
