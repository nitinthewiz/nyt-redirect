import { formatDate, buildPdfUrl } from './helpers.js'

const publicBaseUrl = "https://nyt-redirect-cache.nitinkhanna.com";

function getKeyAndObjUrl() {
    // true for r2-style url
    const key = formatDate(true)+".pdf";
    const objectUrl = `${publicBaseUrl}/${key}`;

    return {key: key, objectUrl: objectUrl}
}

export async function checkIfCurrentPDFExists(env) {
    const { key, objectUrl } = getKeyAndObjUrl();
    const metadata = await env.PDF_CACHE.head(key);

    if (metadata) {
        return Response.json({ url: objectUrl });
    }
    return Response.json({ url: null });
}

export async function pdfCachingService(env) {
    const { key, objectUrl } = getKeyAndObjUrl();

    const resp = await checkIfCurrentPDFExists(env);

    if ((await resp.json()).url) {
        return Response.json({ url: objectUrl });
    }

    const pdfUrl = buildPdfUrl();
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}, ${pdfUrl} is probably not available yet.`);
    }

    // Setting content-type so when the file is finally loaded from R2, 
    // it shows up in the browser as a PDF rather than getting downloaded as a file.

    console.log("------------------>");
    console.log("about to cache PDF ");
    console.log(key);

    await env.PDF_CACHE.put(key, response.body, {
        httpMetadata: {contentType: 'application/pdf'}
    });
    return Response.json({ url: objectUrl });
}