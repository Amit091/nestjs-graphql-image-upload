import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the example of nestjs appplication graphql to uplaod images';
  }
}
