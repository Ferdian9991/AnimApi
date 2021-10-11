class Oploverz {
    oploverz = (info, thumb, $) => {

        let t = info.filter(function(data) {
            return data.includes('Judul')
        })[0] !== undefined ? info.filter(function(data) {
            return data.includes('Judul')
        })[0].replace('Judul: ', '') : '';
        const txt = $('.sinops').text().toString().replace(/\s\s+/g, '').replace(`Sinopsis : ${t}`, '')
        const result = {
            images: thumb,
            title:info.filter(function(data) {
                return data.includes('Judul')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Judul')
            })[0].replace('Judul: ', '') : '',
            synopsis: txt,
            japanese: info.filter(function(data) {
                return data.includes('Japanese')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Japanese')
            })[0].replace('Japanese: ', '') : '',
            status: info.filter(function(data) {
                return data.includes('Status')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Status')
            })[0].replace('Status: ', '') : '',
            studio: info.filter(function(data) {
                return data.includes('Studio')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Studio')
            })[0].replace('Studio: ', '') : '',
            duration: info.filter(function(data) {
                return data.includes('Durasi')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Durasi')
            })[0].replace('Durasi: ', '') : '',
            season: info.filter(function(data) {
                return data.includes('Season')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Season')
            })[0].replace('Season: ', '') : '',
            info: info.filter(function(data) {
                return data.includes('Info')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Info')
            })[0].replace('Info: ', '') : '',
            episode: info.filter(function(data) {
                return data.includes('Episodes')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Episodes')
            })[0].replace('Episodes: ', '') : '',
            genre: info.filter(function(data) {
                return data.includes('Genre')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Genre')
            })[0].replace('Genre: ', '') : '',
        }
        return result
    }
}
module.exports = new Oploverz()