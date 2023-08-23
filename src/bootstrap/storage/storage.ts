import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '~/utils/env.mjs';
import { type StorageInterface } from './storage.interface';

export class Storage implements StorageInterface {
  private client: S3Client;
  private command: PutObjectCommand;

  private constructor(client: S3Client, command: PutObjectCommand) {
    this.client = client;
    this.command = command;
  }

  static disk(storageType: string): StorageBuilder {
    // Set up the S3Client instance based on the storageType (e.g., 's3')
    const client = new S3Client({
      endpoint: env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
      region: env.AWS_DEFAULT_REGION,
    });

    // Return a new StorageBuilder instance
    return new StorageBuilder(client);
  }
}

class StorageBuilder {
  private client: S3Client;
  private command: PutObjectCommand;
  private fileName: string;

  constructor(client: S3Client) {
    this.client = client;
    this.command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: '',
      Body: '',
    });
    this.fileName = '';
  }

  put(fileName: string, buffer: ArrayBuffer): this {
    this.command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: fileName,
      Body: buffer,
    });
    this.fileName = fileName;

    return this;
  }

  async execute(): Promise<{ status: boolean; response?: any; error?: any }> {
    try {
      const response = await this.client.send(this.command);
      return { status: true, response: response };
    } catch (error) {
      return { status: false, error: error };
    }
  }

  async getUrl(): Promise<any> {
    // Generate and return the URL for the specified file
    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: this.fileName,
    });

    return await getSignedUrl(this.client, command);
  }
}
