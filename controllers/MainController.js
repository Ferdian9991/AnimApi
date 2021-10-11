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
            const url = `${baseUrl}${portal}/${id}/` 
            const jar = new cookie.CookieJar();
            const client = wrapper.wrapper(axios.create({ jar }));

            const response = await client.get(url);
            const $ = cheerio.load(response.data);
            const element = $('.jcontent').find('ul');
            const info = []

            element.find('li').each(function() {
                const result = $(this).find('span').text()
                info.push(result)
            })
            const thumb = $('.container').find('.main-col').find('.bg-white').find('img').attr('src')

            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = portal

            if (portal === 'otakudesu') {
                obj.result = {
                    images: thumb,
                    title: info[0].replace('Judul: ', ''),
                    japanese: info[1].replace('Japanese: ', ''),
                    score: info[2].replace('Skor: ', ''),
                    producer: info[3].replace('Produser: ', ''),
                    type: info[4].replace('Tipe: ', ''),
                    status: info[5].replace('Status: ', ''),
                    episode: info[6].replace('Total Episode: ', ''),
                    duration: info[7].replace('Durasi: ', ''),
                    release: info[8].replace('Tanggal Rilis: ', ''),
                    studio: info[9].replace('Studio: ', ''),
                    genre: info[10].replace('Genre: ', ''),
                }
            }

            if (portal === 'kusonime') {
                obj.result = {
                    images: thumb,
                    title: $('.container').find('.main-col').find('.ptitle').text(),
                    japanese: info[0].replace('Japanese: ', ''),
                    genre: info[1].replace('Genre: ', ''),
                    season: info[2].replace('Seasons: ', ''),
                    producer: info[3].replace('Producers: ', ''),
                    type: info[4].replace('Type: ', ''),
                    status: info[5].replace('Status: ', ''),
                    episode: info[6].replace('Total Episode: ', ''),
                    score: info[7].replace('Score: ', ''),
                    duration: info[8].replace('Duration: ', ''),
                    release: info[9].replace('Released on: ', ''),
                }
            }

            console.log(info)

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