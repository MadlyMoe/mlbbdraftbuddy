import axios, { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

interface HeroData {
  [key: string]: any;
}

interface ApiResponse {
  data: HeroData[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

interface RequestPayload {
  pageSize: number;
  filters: Array<{
    field: string;
    operator: string;
    value: number | string;
  }>;
  sorts: any[];
  pageIndex: number;
  params: Record<string, any>;
}

async function fetchHeroData(
  heroId: number, 
  pageIndex: number = 1, 
  pageSize: number = 20
): Promise<ApiResponse> {
  const payload: RequestPayload = {
    pageSize,
    filters: [
      {
        field: "main_heroid",
        operator: "eq",
        value: heroId
      }
    ],
    sorts: [],
    pageIndex,
    params: {}
  };

  const response: AxiosResponse<ApiResponse> = await axios.post(
    'https://api.gms.moontontech.com/api/gms/source/2669606/2756569',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }
  );

  return response.data;
}

// GET handler - access via browser
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const heroId = searchParams.get('heroId') || '128';
    const format = searchParams.get('format');
    
    const data = await fetchHeroData(parseInt(heroId));
    
    const response = {
      success: true,
      heroId: parseInt(heroId),
      timestamp: new Date().toISOString(),
      data: data
    };
    
    // If format=html, return pretty HTML view
    if (format === 'html') {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Hero Data - ${heroId}</title>
            <style>
              body { font-family: monospace; padding: 20px; }
              pre { background: #f4f4f4; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>Hero Data for ID: ${heroId}</h1>
            <pre>${JSON.stringify(response, null, 2)}</pre>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    // error handling...
  }
}