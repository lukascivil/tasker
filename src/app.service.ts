// Packages
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getAvailableResources(): Observable<Array<string>> {
    const resources: Array<string> = ['tasks', 'users', 'health'];

    return of(resources);
  }
}
