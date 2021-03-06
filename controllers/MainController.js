const axios = require("axios");
const cheerio = require("cheerio");
const zsExtract = require('zs-extract');
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
const puppeteer = require('puppeteer');
const { data } = require('cheerio/lib/api/attributes');

const UserAgent = async (page) => {
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
}

const onload = {
    args: [
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
        '--disable-gl-drawing-for-tests',
    ],
    devtools: false,
    headless: true
}
  

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
                const result = $(this).text() || $(this).find('span').text() || $(this).find('b').text()
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
                    const browser = await puppeteer.launch(onload);
                    const page = await browser.newPage();
                    await UserAgent(page);
                    await page.setRequestInterception(true)
                    page.on('request', (request) => {
                        if (request.resourceType() === 'image') request.abort()
                        else request.continue()
                    })
                    await page.goto(url, {
                        waitUntil: 'networkidle2',
                    });
                    const downloadList = await page.evaluate(() => {
                        let list = []
                        const data = document.querySelectorAll(`a[class="othereps"]`)
                        data.forEach((item) => {
                            const obj = {
                                title: item.innerText,
                                url: item.getAttribute('href'),
                                id: item.getAttribute('href').replace('/anime/', '')
                            }
                            list.push(obj)
                        });
                        return list
                    })

                    obj.episode_list = downloadList
                    
                    await browser.close();
                }

                if (portal === 'oploverz') {
                    obj.detail = oploverz.oploverz(info, thumb, $);
                    const browser = await puppeteer.launch(onload);
                    const page = await browser.newPage();
                    await UserAgent(page);
                    await page.setRequestInterception(true)
                    page.on('request', (request) => {
                        if (request.resourceType() === 'image') request.abort()
                        else request.continue()
                    })
                    await page.goto(url, {
                        waitUntil: 'networkidle2',
                    });
                    const downloadList = await page.evaluate(() => {
                        let list = []
                        const data = document.querySelectorAll(`a[class="othereps"]`)
                        data.forEach((item) => {
                            const obj = {
                                title: item.innerText,
                                url: item.getAttribute('href'),
                                id: item.getAttribute('href').replace('/oploverz/anime/', '')
                            }
                            list.push(obj)
                        });
                        return list
                    })

                    obj.episode_list = downloadList
                    
                    await browser.close();
                }
                if (portal === 'kusonime') {
                    obj.detail = kusonime.kusonime(info, thumb, $)
                }

                if (portal === 'anitoki') {
                    obj.detail = anitoki.anitoki(info, thumb, $)
                    const browser = await puppeteer.launch(onload);
                    const page = await browser.newPage();
                    await UserAgent(page);
                    await page.setRequestInterception(true)
                    page.on('request', (request) => {
                        if (request.resourceType() === 'image') request.abort()
                        else request.continue()
                    })
                    await page.goto(url, {
                        waitUntil: 'networkidle2',
                    });
                    const downloadList = await page.evaluate(() => {
                        let list = []
                        const data = document.querySelectorAll(`a[class="othereps"]`)
                        data.forEach((item) => {
                            const obj = {
                                title: item.innerText,
                                url: item.getAttribute('href'),
                                id: item.getAttribute('href').replace('/anitoki/anime/', '')
                            }
                            list.push(obj)
                        });
                        return list
                    })

                    obj.episode_list = downloadList
                    
                    await browser.close();
                }

                if (portal === 'meownime') {
                    obj.detail = meownime.meownime(info, thumb, $)
                    const browser = await puppeteer.launch(onload);
                    const page = await browser.newPage();
                    await UserAgent(page);
                    await page.setRequestInterception(true)
                    page.on('request', (request) => {
                        if (request.resourceType() === 'image') request.abort()
                        else request.continue()
                    })
                    await page.goto(url, {
                        waitUntil: 'networkidle2',
                    });
                    const urlList = []
                    const section = await page.evaluate(() => {
                        const url = document.querySelector('.maxdl.nw') !== null ? document.querySelector('.maxdl.nw').innerHTML.split('</section>') : undefined;
                        url !== undefined ? url.splice(0,1) : undefined;
                        return url
                    })

                    const maxdl = $('.main-col').find('.bg-white.shadow')
                        .find('.bg-white.shadow')
                        .find('.white')
                        .find('.maxdl')
                    
                    maxdl.each(function() {
                        const download_list = []
                        $(this).find('.maxurl').each(function() {
                            const mirror_list = []
                            $(this).find('a').each(function() {
                                const mirror = {
                                    link_id: $(this).text(),
                                    url: "https://otakupoi.com" + $(this).attr('href')
                                }
                                mirror_list.push(mirror)
                            })
                            const links = {
                                id: $(this).find('strong').text(),
                                data: mirror_list
                            }
                            download_list.push(links)
                        })
                        const data = {
                            title: $(this).find('.maxtitle').text(),
                            download_url: download_list
                        }
                        urlList.push(data)
                    })

                    obj.download_list = urlList;

                    if (section !== undefined) {
                        for (let i = 0; i < section.length; i++) {
                            const links = [];
                            const scrape = cheerio.load(section[i]);
                            scrape('.maxurl').each(function() {
                                const data = []
                                scrape(this).find('a').each(function() {
                                    const result = {
                                        link_id: scrape(this).text(),
                                        url: "https://otakupoi.com" + scrape(this).attr('href')
                                    }
                                    data.push(result)
                                })
                                const list = {
                                    id: scrape(this).find('strong').text(),
                                    data: data
                                }
                                links.push(list)
                            })
                            const data = {
                                title: scrape('.maxtitle').text(),
                                download_url: links
                            }
                            urlList.push(data)
                        }
                        obj.download_list = urlList
                    }
                    await browser.close();
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