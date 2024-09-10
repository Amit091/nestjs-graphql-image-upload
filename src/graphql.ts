
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class FactDetail {
    title: string;
    detail: string;
}

export abstract class IQuery {
    abstract fact(): Nullable<FactDetail> | Promise<Nullable<FactDetail>>;
}

export abstract class IMutation {
    abstract uploadFile(uploadFile?: Nullable<FileUpload>): Nullable<string> | Promise<Nullable<string>>;

    abstract uploadFiles(uploadFiles?: Nullable<Nullable<FileUpload>[]>): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;
}

export type FileUpload = any;
type Nullable<T> = T | null;
