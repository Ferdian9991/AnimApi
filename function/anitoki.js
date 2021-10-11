class Anitoki {
    anitoki = (info, thumb, $) => {
        let t = info.filter(function(data) {
            return data.includes('Judul')
        })[0] !== undefined ? info.filter(function(data) {
            return data.includes('Judul')
        })[0].replace('Judul: ', '') : '';
        const txt = $('.sinops').text().toString().replace(/\s\s+/g, '').replace(`Sinopsis : ${t}`, '')

        const result = {
            images: thumb,
            title: $('.jcontent').find('h3').text().replace('Informasi Anime ', ''),
            synopsis: txt.replace('Sinopsis', ''),
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
            duration: info.filter(function(data) {
                return data.includes('Durasi')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Durasi')
            })[0].replace('Durasi: ', '') : '',
            released: info.filter(function(data) {
                return data.includes('Released on')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Released on')
            })[0].replace('Released on: ', '') : '',
        }
        return result
    }
}
module.exports = new Anitoki()