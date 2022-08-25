/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

function formatDate(date) {
    const dt = new Date(date)
    var month = '' + (dt.getMonth() + 1),
        day = '' + dt.getDate(),
        year = dt.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('/');
};

export default {
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

        if (pathname == "frontpage"){
            var localDate = Date.now();
            console.log(localDate);
            var curr_date = formatDate(localDate);
            redir_link = "https://static01.nyt.com/images/" + curr_date + "/nytfrontpage/scan.pdf";
        } else if (pathname == "todayspaper"){
            redir_link = "https://www.nytimes.com/section/todayspaper";
        } else if (pathname == "about"){
            redir_link = "https://nitin.omg.lol";
        // } else if (!Number.isNaN(Date.parse(pathname))){
        //     console.log("in pathname day");
        //     var localDate = new Date(pathname);
        //     var curr_date = formatDate(localDate);
        //     redir_link = "https://static01.nyt.com/images/" + curr_date + "/nytfrontpage/scan.pdf";
        } else {
            var localDate = Date.now();
            var curr_date = formatDate(localDate);
            redir_link = "https://static01.nyt.com/images/" + curr_date + "/nytfrontpage/scan.pdf";
        }

        return Response.redirect(redir_link, 302);
	},
};
