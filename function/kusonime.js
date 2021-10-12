class Kusonime {
    kusonime = (info, thumb, $) => {
        let t = info.filter(function(data) {
            return data.includes('Judul')
        })[0] !== undefined ? info.filter(function(data) {
            return data.includes('Judul')
        })[0].replace('Judul: ', '') : '';
        const txt = $('.sinops').text().toString().replace(/\s\s+/g, '').replace(`Sinopsis : ${t}`, '').replace(/\n/g, '')
        const result = {
            images: thumb,
            title: $('.container').find('.main-col').find('.ptitle').text(),
            synopsis: txt,
            japanese: info.filter(function(data) {
                return data.includes('Japanese')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Japanese')
            })[0].replace('Japanese: ', '') : '',
            genre: info.filter(function(data) {
                return data.includes('Genre')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Genre')
            })[0].replace('Genre :', '') : '',
            seasons: info.filter(function(data) {
                return data.includes('Seasons')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Seasons')
            })[0].replace('Seasons :', '') : '',
            producers: info.filter(function(data) {
                return data.includes('Producers')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Producers')
            })[0].replace('Producers: ', '') : '',
            type: info.filter(function(data) {
                return data.includes('Type')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Type')
            })[0].replace('Type: ', '') : '',
            status: info.filter(function(data) {
                return data.includes('Status')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Status')
            })[0].replace('Status: ', '') : '',
            episode: info.filter(function(data) {
                return data.includes('Total Episode')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Total Episode')
            })[0].replace('Total Episode: ', '') : '',
            score: info.filter(function(data) {
                return data.includes('Score')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Score')
            })[0].replace('Score: ', '') : '',
            duration: info.filter(function(data) {
                return data.includes('Duration')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Duration')
            })[0].replace('Duration: ', '') : '',
            duration: info.filter(function(data) {
                return data.includes('Duration')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Duration')
            })[0].replace('Duration: ', '') : '',
            released: info.filter(function(data) {
                return data.includes('Released on')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Released on')
            })[0].replace('Released on: ', '') : '',
        }
        return result
    }
}
module.exports = new Kusonime()