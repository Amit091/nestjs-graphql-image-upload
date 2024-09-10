import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { scienceFacts } from './files.constants';
import { FilesService } from './files.service';

@Resolver('FileUpload')
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  private facts = scienceFacts;
  @Query('fact')
  fact(): { title: string; detail: string } {
    const randomIndex = Math.floor(Math.random() * this.facts.length);
    return this.facts[randomIndex];
  }
  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'uploadFile', type: () => GraphQLUpload })
    uploadFile: FileUpload,
  ): Promise<string> {
    const path = await this.filesService.saveFile(uploadFile.file);
    return `http://localhost:3000/${path}`;
  }

  @Mutation('uploadFiles')
  async uploadFiles(
    @Args({ name: 'uploadFiles', type: () => GraphQLUpload })
    uploadFiles: FileUpload[],
  ): Promise<string[]> {
    const files = uploadFiles.map(async (uploadFile) => {
      const data = await uploadFile.promise;
      return this.filesService.saveFile(uploadFile.file || data);
    });
    return (await Promise.all(files)).map(
      (path) => `http://localhost:3000/${path}`,
    );
  }
}
