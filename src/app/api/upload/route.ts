import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { env } from '~/utils/env.mjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new S3Client({
    endpoint: env.AWS_ENDPOINT,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_DEFAULT_REGION,
  });

  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: data.get('file').name,
    Body: buffer,
  });

  try {
    const response = await client.send(command);
    return NextResponse.json({ message: response });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
};

export { handler as POST };
