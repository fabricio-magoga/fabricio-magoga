import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// It's more efficient to reuse the connection
let conn: any = null;

async function dbConnect() {
  if (conn) {
    return conn;
  }
  conn = await mongoose.connect(mongoUri);
  return conn;
}

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

export async function GET(request: Request, { params }: { params: { shortId: string } }) {
  try {
    await dbConnect();
    const { shortId } = params;
    const url = await Url.findOne({ shortUrl: shortId });

    if (!url) {
      return NextResponse.json({ message: 'URL not found' }, { status: 404 });
    }

    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Ocorreu um erro interno no servidor' }, { status: 500 });
  }
}
