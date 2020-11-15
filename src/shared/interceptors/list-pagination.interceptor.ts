import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ListPaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const resource = data.contentRange[0] || 'no-name';
        const start = data.contentRange[1];
        const end = data.contentRange[2];
        const total = data.contentRange[3];
        const contentRange = `${resource} - ${start}-${end}/${total}`;

        request.res.header('Access-Control-Allow-Headers', 'content-range');
        request.res.header('content-range', contentRange);

        return data;
      })
    );
  }
}
