import { formatDate, buildPdfUrl } from './helpers.js'

export async function pdfCachingService(env) {
    const publicBaseUrl = "https://nyt-redirect-cache.nitinkhanna.com";

    // true for r2-style url
    const key = formatDate(true)+".pdf";

    const objectUrl = `${publicBaseUrl}/${key}`;

    const metadata = await env.PDF_CACHE.head(key);

    if (metadata) {
        return new Response.json({ url: objectUrl });
    }

    const pdfUrl = buildPdfUrl();
    const response = await fetch(pdfUrl);

    await env.PDF_CACHE.put(key, response.body);
    return new Response.json({ url: objectUrl });
}

module.exports.pdfCachingService = pdfCachingService;