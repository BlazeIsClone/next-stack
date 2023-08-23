import { type NextApiRequest, type NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Storage } from '~/bootstrap/storage/storage';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const storageBuilder = Storage.disk('s3');
  const url = await storageBuilder.put(data.get('file').name, buffer).execute();

  if (!url.status) {
    return NextResponse.json({ message: url.error });
  }

  const payload = await storageBuilder
    .put(data.get('file').name, buffer)
    .getUrl();

  return NextResponse.json({
    message: url.response,
    payload,
  });
};

export { handler as POST };
