import mime from 'mime';
import readline from 'readline';
import busboy from 'busboy';
import { FileInfo, Headers, ReadableStream, Request } from '@/types';

export const getFileExtensionByMime = (mimeType: string) => mime.getExtension(mimeType);

export const readFormDataFile = <T = unknown>(
  headers: Headers,
  pipe: Request['pipe'],
  onFile: (resolve: (value: T) => void, name: string, file: ReadableStream, info: FileInfo) => Promise<void>,
) => {
  return new Promise<T>((resolve, reject) => {
    const bb = busboy({ headers });

    bb.on('file', (name, file, info) => {
      const extendedInfo: FileInfo = {
        ...info,
        extension: getFileExtensionByMime(info.mimeType),
      };

      onFile(resolve, name, file, extendedInfo).catch(reject);
    });

    bb.on('error', reject);

    pipe(bb);
  });
};

export const getReadFileByLineIterator = (input: NodeJS.ReadableStream) => {
  return readline.createInterface({
    input,
    crlfDelay: Infinity,
  });
};

export enum ExtensionsEnum {
  TXT = 'txt',
}
