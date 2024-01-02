import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import mongooseConnect from '@/lib/mongooseConnect';

const bucketName = 'next-e-commerce';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();

  try {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const clientConfig: S3ClientConfig = {
      region: 'ap-south-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
    };

    const client = new S3Client(clientConfig);

    const links: string[] = [];
    for (const file of files.file) {
      const ext = file.originalFilename.split('.').pop();
      const newFilename = Date.now() + '.' + ext;

      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: 'public-read',
          ContentType: mime.lookup(file.path) || undefined,
        })
      );

      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    return res.json({ links });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const config = {
  api: { bodyParser: false },
};
