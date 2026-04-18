import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const RSS_FEEDS = [
  // ENGLISH
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', lang: 'EN', category: 'General' },
  { name: 'NDTV', url: 'https://feeds.feedburner.com/ndtvnews-top-stories', lang: 'EN', category: 'General' },
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', lang: 'EN', category: 'General' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/feeder/default.rss', lang: 'EN', category: 'General' },
  { name: 'India Today', url: 'https://www.indiatoday.in/rss/home', lang: 'EN', category: 'General' },
  { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml', lang: 'EN', category: 'General' },
  // TRENDING / BUSINESS
  { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms', lang: 'TREND', category: 'Business' },
  { name: 'Moneycontrol', url: 'https://www.moneycontrol.com/rss/latestnews.xml', lang: 'TREND', category: 'Finance' },
  { name: 'Business Standard', url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', lang: 'TREND', category: 'Business' },
  { name: 'CNBC TV18', url: 'https://www.cnbctv18.com/rss/business.xml', lang: 'TREND', category: 'Stock Market' },
  { name: 'Livemint', url: 'https://www.livemint.com/rss/news', lang: 'TREND', category: 'Finance' },
  { name: 'Financial Express', url: 'https://www.financialexpress.com/feed/', lang: 'TREND', category: 'Finance' },
  { name: 'CNBC TV18 - Markets', url: 'https://www.cnbctv18.com/rss/markets.xml', lang: 'TREND', category: 'Stock Market' },
  { name: 'Economic Times Markets', url: 'https://economictimes.indiatimes.com/markets/rssfeedsdefault.cms', lang: 'TREND', category: 'Stock Market' },
  { name: 'Moneycontrol - Markets', url: 'https://www.moneycontrol.com/rss/markets.xml', lang: 'TREND', category: 'Stock Market' },
  // HINDI
  { name: 'Aaj Tak', url: 'https://feeds.feedburner.com/aajtaklatestnews', lang: 'HI', category: 'General' },
  { name: 'ABP News Hindi', url: 'https://news.abplive.com/feeds/hindi.xml', lang: 'HI', category: 'General' },
  { name: 'Dainik Bhaskar', url: 'https://www.bhaskar.com/rss-feed/1061/', lang: 'HI', category: 'General' },
  { name: 'Navbharat Times', url: 'https://navbharattimes.indiatimes.com/rssfeedsdefault.cms', lang: 'HI', category: 'General' },
  { name: 'Zee News Hindi', url: 'https://zeenews.india.com/hindi/rss/india.xml', lang: 'HI', category: 'General' },
  // MARATHI
  { name: 'Lokmat', url: 'https://www.lokmat.com/rss/maharashtra.xml', lang: 'MR', category: 'General' },
  { name: 'Sakal', url: 'https://www.esakal.com/rss/maharashtra', lang: 'MR', category: 'General' },
  { name: 'Maharashtra Times', url: 'https://maharashtratimes.com/rssfeedsdefault.cms', lang: 'MR', category: 'General' },
  { name: 'TV9 Marathi', url: 'https://tv9marathi.com/feed', lang: 'MR', category: 'General' },
  // GUJARATI
  { name: 'Divya Bhaskar', url: 'https://www.divyabhaskar.co.in/rss-feed/1094/', lang: 'GU', category: 'General' },
  { name: 'Gujarat Samachar', url: 'https://www.gujaratsamachar.com/rss', lang: 'GU', category: 'General' },
  { name: 'Sandesh', url: 'https://www.sandesh.com/rss-feed/1093/', lang: 'GU', category: 'General' },
  { name: 'TV9 Gujarati', url: 'https://tv9gujarati.com/feed', lang: 'GU', category: 'General' },
  { name: 'Gujarat Times', url: 'https://www.gujarattimes.com/rss', lang: 'GU', category: 'General' },
  // PUNJABI
  { name: 'Punjab Kesari', url: 'https://www.punjabkesari.in/rss/news', lang: 'PA', category: 'General' },
  {name: 'TV9 Punjabi', url: 'https://tv9punjabi.com/feed', lang: 'PA', category: 'General' },
  { name: 'Jagbani', url: 'https://www.jagbani.com/rss-feed/1096/', lang: 'PA', category: 'General' },
  { name: 'Rozana Spokesman', url: 'https://www.rozanaspokesman.com/rss-feed/1097/', lang: 'PA', category: 'General' },
  { name: 'Punjabi Tribune', url: 'https://www.punjabitribuneonline.com/rss', lang: 'PA', category: 'General' },
  { name: 'ABP Sanjha', url: 'https://punjabi.abplive.com/rss/feed', lang: 'PA', category: 'General' },
  { name: 'The Tribune Punjabi', url: 'https://www.tribuneindia.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Hindustan Times Punjabi', url: 'https://www.hindustantimes.com/feeds/rss/punjabi-news/rssfeed.xml', lang: 'PA', category: 'General' },
  { name: 'The Indian Express Punjabi', url: 'https://indianexpress.com/section/punjabi/feed/', lang: 'PA', category: 'General' },
  { name: 'Dainik Jagran Punjabi', url: 'https://www.jagran.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Amar Ujala Punjabi', url: 'https://www.amarujala.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Zee News Punjabi', url: 'https://zeenews.india.com/punjabi/rss/india.xml', lang: 'PA', category: 'General' },
  { name: 'TV9 Punjabi', url: 'https://tv9punjabi.com/feed', lang: 'PA', category: 'General' },
  { name: 'ABP Sanjha', url: 'https://punjabi.abplive.com/rss/feed', lang: 'PA', category: 'General' },
  { name: 'The Tribune Punjabi', url: 'https://www.tribuneindia.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Hindustan Times Punjabi', url: 'https://www.hindustantimes.com/feeds/rss/punjabi-news/rssfeed.xml', lang: 'PA', category: 'General' },
  { name: 'The Indian Express Punjabi', url: 'https://indianexpress.com/section/punjabi/feed/', lang: 'PA', category: 'General' },
  { name: 'Dainik Jagran Punjabi', url: 'https://www.jagran.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Amar Ujala Punjabi', url: 'https://www.amarujala.com/rss/punjabi.xml', lang: 'PA', category: 'General' },
  { name: 'Zee News Punjabi', url: 'https://zeenews.india.com/punjabi/rss/india.xml', lang: 'PA', category: 'General' },
  
  // TAMIL
  { name: 'Dinamalar', url: 'https://www.dinamalar.com/rss.asp', lang: 'TA', category: 'General' },
  { name: 'Daily Thanthi', url: 'https://www.dailythanthi.com/rss', lang: 'TA', category: 'General' },
  { name: 'Dinamani', url: 'https://www.dinamani.com/rss', lang: 'TA', category: 'General' },
  { name: 'TV9 Tamil', url: 'https://tv9tamil.com/feed', lang: 'TA', category: 'General' },
  { name: 'Hindu Tamil', url: 'https://www.hindutamil.in/rss', lang: 'TA', category: 'General' },
  { name: 'One India Tamil', url: 'https://tamil.oneindia.com/rss', lang: 'TA', category: 'General' },
  { name: 'India Today Tamil', url: 'https://tamil.indiatoday.in/rss/home', lang: 'TA', category: 'General' },
  { name: 'Zee News Tamil', url: 'https://zeenews.india.com/tamil/rss/india.xml', lang: 'TA', category: 'General' },
  { name: 'News18 Tamil', url: 'https://tamil.news18.com/rss', lang: 'TA', category: 'General' },
  { name: 'Puthiyathaalaimurai', url: 'https://www.puthiyathalaimurai.com/rssfeed.aspx', lang: 'TA', category: 'General' },
  // TELUGU
  { name: 'Eenadu', url: 'https://www.eenadu.net/rss.aspx', lang: 'TE', category: 'General' },
  { name: 'TV9 Telugu', url: 'https://tv9telugu.com/feed', lang: 'TE', category: 'General' },
  // KANNADA
  { name: 'Vijay Karnataka', url: 'https://vijaykarnataka.com/rssfeedsdefault.cms', lang: 'KN', category: 'General' },
  { name: 'Prajavani', url: 'https://www.prajavani.net/rss-feed/1098/', lang: 'KN', category: 'General' },
  { name: 'Kannada Prabha', url: 'https://www.kannadaprabha.com/rss-feed/1099/', lang: 'KN', category: 'General' },
  { name: 'TV9 Kannada', url: 'https://tv9kannada.com/feed', lang: 'KN', category: 'General' },
  // MALAYALAM
  { name: 'Mathrubhumi', url: 'https://www.mathrubhumi.com/rss', lang: 'ML', category: 'General' },
  { name: 'Manorama', url: 'https://www.manoramaonline.com/rss', lang: 'ML', category: 'General' },
  { name: 'TV9 Malayalam', url: 'https://tv9malayalam.com/feed', lang: 'ML', category: 'General' },
  { name: 'Asianet News', url: 'https://www.asianetnews.com/rss', lang: 'ML', category: 'General' },
  { name: 'Kerala Kaumudi', url: 'https://www.kaumudi.com/rss', lang: 'ML', category: 'General' },
  // BENGALI
  { name: 'Anandabazar', url: 'https://www.anandabazar.com/rss', lang: 'BN', category: 'General' },
  { name: 'ABP Bengali', url: 'https://bengali.abplive.com/rss/feed', lang: 'BN', category: 'General' },
  { name: 'Eisamay', url: 'https://www.esamay.com/rss', lang: 'BN', category: 'General' },
  { name: 'TV9 Bangla', url: 'https://tv9bangla.com/feed', lang: 'BN', category: 'General' },
  { name: 'ABP Ananda', url: 'https://www.anandabazar.com/rss/abpananda.xml', lang: 'BN', category: 'General' },
  // INTERNATIONAL
  { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', lang: 'INTL', category: 'World' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', lang: 'INTL', category: 'World' },
  
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  cdataPropName: '__cdata',
});

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];

    const text = await res.text();
    const json = parser.parse(text);

    const rawItems =
      json?.rss?.channel?.item ||
      json?.feed?.entry ||
      [];

    const items = Array.isArray(rawItems) ? rawItems : [rawItems];
    if (!items || items.length === 0) return [];

    return items.slice(0, 5).map(item => {
      const title =
        item.title?.__cdata ||
        item.title?.['#text'] ||
        (typeof item.title === 'string' ? item.title : '') ||
        '';

      const link =
        item.link?.href ||
        item.link?.__cdata ||
        (typeof item.link === 'string' ? item.link : '') ||
        item.guid?.['#text'] ||
        (typeof item.guid === 'string' ? item.guid : '') ||
        '#';

      const date =
        item.pubDate ||
        item.updated ||
        item['dc:date'] ||
        '';

      if (!title || title.trim().length < 5) return null;

      return {
        title: title.trim()
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'"),
        link: typeof link === 'string' ? link.trim() : '#',
        date: typeof date === 'string' ? date.trim() : '',
        source: feed.name,
        lang: feed.lang,
        category: feed.category,
      };
    }).filter(Boolean);

  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      RSS_FEEDS.map(feed => fetchFeed(feed))
    );

    const allNews = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value)
      .filter(item => item.title && item.title.length > 5);

    allNews.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

    return NextResponse.json(
      { news: allNews, total: allNews.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ news: [], error: err.message }, { status: 500 });
  }
}