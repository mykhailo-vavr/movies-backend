import busboy from 'busboy';
import { Readable } from 'stream';

export interface FileInfo extends busboy.FileInfo {
  extension: string | null;
}

export type ReadableStream = Readable;
