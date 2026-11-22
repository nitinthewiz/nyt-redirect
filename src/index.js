/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { formatDate, buildPdfUrl } from './helpers.js';
import { checkIfCurrentPDFExists, pdfCachingService } from './cache.js';


export default {
    async scheduled(controller, env, ctx) {
        await pdfCachingService(env);
        console.log("cron processed");
    },

    async fetch(request, env, ctx) {
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
            const r2PDFcheck = await checkIfCurrentPDFExists(env);
            redir_link = (await r2PDFcheck.json()).url
            console.log("------------------>");
            console.log("redir_link in frontpage - ");
            console.log(redir_link);
            if (redir_link == null) {
                redir_link = buildPdfUrl();
                console.log("------------------>");
                console.log("redir_link in frontpage in null path - ");
                console.log(redir_link);
                ctx.waitUntil(pdfCachingService(env).catch(console.error))
            }
        } else if (pathname == "todayspaper" || pathname == "today"){
            redir_link = "https://www.nytimes.com/section/todayspaper";
        } else if (pathname == "about"){
            redir_link = "https://www.nitinkhanna.com";
        } else {
            const r2PDFcheck = await checkIfCurrentPDFExists(env);
            redir_link = (await r2PDFcheck.json()).url
            console.log("------------------>");
            console.log("redir_link in else - ");
            console.log(redir_link);
            if (redir_link == null) {
                redir_link = buildPdfUrl();
                console.log("------------------>");
                console.log("redir_link in else in null path - ");
                console.log(redir_link);
                ctx.waitUntil(pdfCachingService(env).catch(console.error))
            }
        }

        return Response.redirect(redir_link, 302);
    },
};
