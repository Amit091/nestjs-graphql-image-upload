// graphql-upload.d.ts

declare module 'graphql-upload' {
  import { GraphQLScalarType } from 'graphql';
  import { IncomingMessage, ServerResponse } from 'http';

  // Define GraphQLUpload as a GraphQLScalarType
  export const GraphQLUpload: GraphQLScalarType;

  // Interface for Upload object
  export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  }

  export interface FileUpload {
    resolve: (value: File) => void;
    reject: (reason?: any) => void;
    promise: Promise<File>;
    file: File;
  }

  // Type definition for processRequest options
  export interface ProcessRequestOptions {
    maxFieldSize?: number;
    maxFileSize?: number;
    maxFiles?: number;
  }

  // processRequest function type
  export function processRequest(
    request: IncomingMessage,
    response: ServerResponse,
    options?: ProcessRequestOptions,
  ): Promise<any>;

  // Middleware options type definition
  export interface UploadOptions {
    maxFieldSize?: number;
    maxFileSize?: number;
    maxFiles?: number;
  }

  // Middleware function type definition
  export function graphqlUploadExpress(
    uploadOptions?: UploadOptions,
  ): (
    request: IncomingMessage,
    response: ServerResponse,
    next: (error?: any) => void,
  ) => void;

  // Koa middleware function type definition
  export function graphqlUploadKoa(uploadOptions?: UploadOptions): (
    ctx: {
      req: IncomingMessage;
      res: ServerResponse;
    },
    next: () => Promise<any>,
  ) => Promise<void>;
}
