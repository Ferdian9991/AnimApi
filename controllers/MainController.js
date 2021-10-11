const scraperjs = require('scraperjs')
const axios = require("axios");
const cheerio = require("cheerio");
const _url = require('url');
const _math = require('mathjs');
const zsExtract = require('zs-extract');
const request = require('request')
var cookie = require('tough-cookie')
const wrapper = require('axios-cookiejar-support')
const baseUrl = "https://otakupoi.com/"
const portalLists = [
    'anitoki',
    'kusonime',
    'maxnime',
    'meownime',
    'oploverz',
    'otakudesu'
]

class MainController {
    async search ({params: {portal, query}}, req) {
        let obj = {};
        const filter = portalLists.filter(function(data) {
            return data === portal
        }).join("")
        if (filter === portal) {
            const search = `${baseUrl}${portal}/search/?q=${query}`
            const jar = new cookie.CookieJar();
            const client = wrapper.wrapper(axios.create({ jar }));

            const response = await client.get(search);
            const $ = cheerio.load(response.data);
            const getRow = $('.row').find('.container')
            const result = []
            const element = getRow.find('.main-col')
            element.find('.bg-white').find('a').each(function() {
                const scrape = {
                    title: $(this).find('.titlelist').text(),
                    image: $(this).find('img').attr('src'),
                    url: $(this).attr('href'),
                    rating: $(this).find('.starlist').text(),
                    endpoint: $(this).attr('href').replace(`${baseUrl}${portal}/`, ''),
                }
                result.push(scrape)
            })
            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = portal
            obj.result = result
            req.send(obj)
        } else {
            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = 'unknown'
            obj.result = []
            req.send(obj)
        }
    }
    
    async animeDetail ({params: {portal, id}}, req) {
        let obj = {};
        const filter = portalLists.filter(function(data) {
            return data === portal
        }).join("")
        if(filter === portal) {
            const url = `${baseUrl}${portal}/anime/${id}` 

            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = portal
            obj.result = []

            console.log(url)

            req.send(obj)
        } else {
            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = 'unknown'
            obj.result = []
            req.send(obj)
        }
    }
}

module.exports = new MainController