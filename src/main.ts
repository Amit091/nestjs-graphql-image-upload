import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/graphql', (_req: Request, _res: Response, next: NextFunction) => {
    next();
  });
  await app.listen(3000);
}
bootstrap();
