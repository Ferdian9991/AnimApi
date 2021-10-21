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