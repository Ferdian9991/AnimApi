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
    'Anitoki',
    'Kusonime',
    'Meownime',
    'Oploverz',
    'Otakudesu'
]
const oploverz = require('../function/oploverz')
const otakudesu = require('../function/otakudesu')
const kusonime = require('../function/kusonime')
const anitoki = require('../function/anitoki')
const meownime = require('../function/meownime')

class MainController {
    async search ({params: {portal, query}}, req) {
        let obj = {};
        const filter = portalLists.filter(function(data) {
            return data.toLowerCase() === portal
        }).join("")
        if (filter.toLowerCase() === portal) {
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
            obj.source = filter
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
            return data.toLowerCase() === portal
        }).join("")
        if(filter.toLowerCase() === portal) {
            const url = `${baseUrl}${portal}/${id}/` 
            const jar = new cookie.CookieJar();
            const client = wrapper.wrapper(axios.create({ jar }));

            const response = await client.get(url);
            const $ = cheerio.load(response.data);
            const element = $('.jcontent').find('ul');
            const info = []

            element.find('li').each(function() {
                const result = $(this).find('span').text() || $(this).find('b').text()
                info.push(result)
            })
            const thumb = $('.container').find('.main-col').find('.bg-white').find('img').attr('src')

            obj.status = req.statusCode === 200 ? "success" : "server error";
            obj.statusCode = req.statusCode
            obj.source = filter
            obj.detail = []

            if (info[0] !== undefined) {
                if (portal === 'otakudesu') {
                    obj.detail = otakudesu.otakudesu(info, thumb, $)
                }

                if (portal === 'oploverz') {
                    obj.detail = oploverz.oploverz(info, thumb, $)
                }
    
                if (portal === 'kusonime') {
                    obj.detail = kusonime.kusonime(info, thumb, $)
                }

                if (portal === 'anitoki') {
                    obj.detail = anitoki.anitoki(info, thumb, $)
                }

                if (portal === 'meownime') {
                    obj.detail = meownime.meownime(info, thumb, $)
                }
            }

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