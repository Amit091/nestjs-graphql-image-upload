import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { join } from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { FilesModule } from '../files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      introspection: true,
      context: (req: Request, res: Response) => ({ req, res }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './../../', 'uploads'),
      serveRoot: '/uploads', // The URL path to access your static files
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
