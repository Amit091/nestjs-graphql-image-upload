import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { File } from 'graphql-upload';
import { join } from 'path';

@Injectable()
export class FilesService {
  async saveFile(file: File): Promise<string> {
    const { filename, createReadStream } = file;

    // Define the path to save the uploaded file
    const path = join('./', 'uploads', filename);
    console.log('🚀 ~ FilesService ~ saveFile ~ path:', path);

    return await new Promise((resolve, reject) => {
      // Save the file using a writable stream
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => resolve(path))
        .on('error', () => reject(null));
    });
  }
}
