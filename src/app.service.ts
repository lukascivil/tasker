// Packages
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getAvailableResources(): Observable<Array<string>> {
    const resources = ['tasks'];

    return of(resources);
  }
}
