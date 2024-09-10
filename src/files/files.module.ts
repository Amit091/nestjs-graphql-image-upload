import { Module } from '@nestjs/common';
import { FilesResolver } from './files.resolver';
import { GraphQLUpload } from 'graphql-upload';
import { FilesService } from './files.service';

@Module({
  providers: [
    FilesResolver,
    FilesService,
    {
      provide: 'UPLOAD_SCALAR',
      useValue: GraphQLUpload,
    },
  ],
})
export class FilesModule {}
