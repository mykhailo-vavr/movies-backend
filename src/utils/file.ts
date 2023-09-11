import readline from 'readline';
import busboy from 'busboy';
import { Headers, Request } from '@/types';
import { Readable } from 'stream';

export const readFormDataFile = <T = unknown>(
  headers: Headers,
  pipe: Request['pipe'],
  onFile: (resolve: (value: T) => void, name: string, file: Readable) => Promise<void>,
) => {
  return new Promise<T>((resolve, reject) => {
    const bb = busboy({ headers });

    bb.on('file', (name, file) => {
      onFile(resolve, name, file).catch(reject);
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
