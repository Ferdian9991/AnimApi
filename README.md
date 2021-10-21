# AnimApi 
AnimApi is a public api built using node js


## Usage Api
1. Clone repository
```bash
git clone https://github.com/Ferdian9991/AnimApi.git
```
2. Install packages (using `yarn` or `npm`)
```bash
npm install
```
3. Start server
```bash
npm run start
```
Heroku Deployment Buildpack
```bash
heroku buildpacks:add jontewks/puppeteer
```
### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Ferdian9991/AnimApi)

## Ex Response

Endpoint : https://anims-api.herokuapp.com/otakudesu/anime/kingdm-season-3-sub-indo/
```json
{
  status: "success",
  statusCode: 200,
  source: "Otakudesu",
  detail: {
    images: "https://otakupoi.com/assets/otakudesu/covers/Kingdom-Season-3-Sub-Indo.jpg",
    title: "Kingdom Season 3",
    synopsis: "Season ke-3 dari anime Kingdom.Tonton juga cerita sebelumnya:1.) Kingdom S12.) Kingdom S23.) Kingdom S3Season ke-3 dari anime Kingdom.Tonton juga cerita sebelumnya:1.) Kingdom S12.) Kingdom S23.) Kingdom S3",
    japanese: "キングダム 第3シリーズ",
    Skor: "7.82",
    produser: "NHK",
    tipe: "TV",
    status: "Ongoing",
    episode: "?",
    duration: "25 Menit",
    release: "Apr 6, 2020",
    genre: "Action, Historical, Military, Seinen",
    studio: "Studio Signpost"
  },
  episode_list: [
    {
      title: "Kingdom Season 3 Episode 2 Subtitle Indonesia",
      url: "/anime/kgdm-s3-episode-2-sub-indo/",
      id: "kgdm-s3-episode-2-sub-indo/"
    },
    {
      title: "Kingdom Season 3 Episode 1 Subtitle Indonesia",
      url: "/anime/kgdm-s3-episode-1-sub-indo/",
      id: "kgdm-s3-episode-1-sub-indo/"
    }
  ]
}
,
```

## Documentation
__Api Path__ : http://anims-api.herokuapp.com/</br>
__API Version__ : v1

| Endpoint | Source | Params | Description |
| -------- | ------ | ------ | -----------|
| /otakudesu/search/(query) | Otakudesu | query | Search Anime |
| /otakudesu/anime/(id) | Otakudesu | id | Anime Detail |
| /kusonime/search/(query) | Kusonime | query | Search Anime |
| /kusonime/anime/(id) | Kusonime | id | Anime Detail |
| /anitoki/search/(query) | Anitoki | query | Search Anime |
| /anitoki/anime/(id) | Anitoki | id | Anime Detail |
| /oploverz/search/(query) | Oploverz | query | Search Anime |
| /oploverz/anime/(id) | Oploverz | id | Anime Detail |
| /meownime/search/(query) | Meownime | query | Search Anime |
| /meownime/anime/(id) | Meownime | id | Anime Detail |

## License
[MIT](https://github.com/Ferdian9991/AnimApi/blob/main/LICENSE.md)