# NYT-Redirect

## What?

This is a Cloudflare worker that simply redirects you to NYT's daily front page PDF.

## Why?

I think it's cool that NYT publishes it's front page as a PDF for anyone to read. I'd like to be able to access it easily, but the way to access it is to plug in today's date, like so - 

https://static01.nyt.com/images/2022/08/25/nytfrontpage/scan.pdf

This is uncool. Cloudflare Workers makes it cool.

I've wanted to play with Cloudflare Workers since some time, so this is my way to do so.

## How?

You can go to the following URLs - 

[nyt.nitin.omg.lol](https://nyt.nitin.omg.lol) - open today's frontpage PDF
[nyt.nitin.omg.lol/about](https://nyt.nitin.omg.lol/about) - open my OMG.LOL profile which should have more info about this
[nyt.nitin.omg.lol/frontpage](https://nyt.nitin.omg.lol/frontpage) - this does the same thing as the first link
[nyt.nitin.omg.lol/todayspaper](https://nyt.nitin.omg.lol/todayspaper) - NYT also has a version that's a proper web app, for logged in users. Go here to read the full news.

## Gratis

- NYT for their reporting and their willingness to keep the PDF online
- Cloudflare for their awesome platform

## Can I help?

Yes! I don't know how to make it happen that if someone puts a date at the end of the URL, like (nyt.nitin.omg.lol/Jan 2nd 2022), then how to send the user to the PDF for that date. Do you? If so, open an Issue or PR!
