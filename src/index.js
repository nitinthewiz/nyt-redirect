/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { buildPdfUrl } from './helpers.js';
import { pdfCachingService } from './cache.js';


export default {
    async scheduled(controller, env, ctx) {
        pdfCachingService(env);
        console.log("cron processed");
    },

    async fetch(request) {
        console.log("------------------>");
        console.log("request.url - ");
        console.log(request.url);

        var {pathname} = new URL(request.url);

        pathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
        pathname = decodeURI(pathname);
        console.log("pathname - ");
        console.log(pathname);

        console.log("<------------------");

        var redir_link = "";

        if (pathname == "frontpage" || pathname == "front"){
            redir_link = buildPdfUrl()
        } else if (pathname == "todayspaper" || pathname == "today"){
            redir_link = "https://www.nytimes.com/section/todayspaper";
        } else if (pathname == "about"){
            redir_link = "https://www.nitinkhanna.com";
        } else {
            redir_link = buildPdfUrl()
        }


        // const object = await env.PDF_CACHE.get(key);

        return Response.redirect(redir_link, 302);
    },
};
