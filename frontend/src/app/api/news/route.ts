import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch latest news on Indian agriculture and farming from Google News RSS Search
    const res = await fetch(
      'https://news.google.com/rss/search?q=agriculture+india+farming&hl=en-IN&gl=IN&ceid=IN:en',
      { 
        next: { revalidate: 120 }, // Cache for 2 minutes
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: status ${res.status}`);
    }

    const xml = await res.text();
    
    // Parse items using regex
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const sourceMatch = itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/);
      
      if (titleMatch && linkMatch) {
        let title = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
        const link = linkMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
        const source = sourceMatch ? sourceMatch[1].trim() : 'Google News';
        
        // Remove source suffix from title if present
        if (title.endsWith(` - ${source}`)) {
          title = title.substring(0, title.length - (source.length + 3));
        }
        
        items.push({
          title,
          link,
          pubDate,
          source
        });
      }
    }
    
    return NextResponse.json({ success: true, news: items });
  } catch (error: any) {
    console.error('News fetch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
