import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const isConnected = await testConnection();
    return Response.json({ 
      connected: isConnected,
      message: isConnected ? 'Database connected successfully' : 'Database connection failed'
    });
  } catch (error) {
    return Response.json({ 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

