import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { z } from 'zod';

const mongoUri = process.env.MONGO_URI ?? '';

if (!mongoUri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// It's more efficient to reuse the connection
let conn: any = null;

async function dbConnect() {
  if (conn) {
    return conn;
  }
  conn = await mongoose.connect(mongoUri as string);
  return conn;
}

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

async function generateUniqueShortUrl() {
  let shortUrl;
  let urlExists = true;
  while (urlExists) {
    shortUrl = Math.random().toString(36).substring(2, 8);
    const existingUrl = await Url.findOne({ shortUrl });
    if (!existingUrl) {
      urlExists = false;
    }
  }
  return shortUrl;
}

const urlValidationSchema = z.object({
  originalUrl: z.string().url({ message: 'URL inválida' }),
});

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { originalUrl } = urlValidationSchema.parse(body);

    const shortUrl = await generateUniqueShortUrl();
    const url = new Url({ originalUrl, shortUrl });
    await url.save();

    return NextResponse.json({ originalUrl, shortUrl }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Ocorreu um erro interno no servidor' }, { status: 500 });
  }
}
