class Meownime {
    meownime = (info, thumb, $) => {
        let t = info.filter(function(data) {
            return data.includes('Judul')
        })[0] !== undefined ? info.filter(function(data) {
            return data.includes('Judul')
        })[0].replace('Judul: ', '') : '';
        const txt = $('.sinops').text().toString().replace(/\s\s+/g, '').replace(`Sinopsis : ${t}`, '').replace(/\n/g, '') || $('.jcontent').find('p').text().replace(/\n/g, ' ')

        const result = {
            images: thumb,
            title:info.filter(function(data) {
                return data.includes('Judul') || data.includes('Title')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Judul') || data.includes('Title')
            })[0].replace('Judul Alternatif : ', '').replace('Title: ', '') : '',
            synopsis: txt.replace('Synopsis', ''),
            episode: info.filter(function(data) {
                return data.includes('Episode')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Episode')
            })[0].replace('Jumlah Episode : ', '').replace('Total Episode: ', '') : '',
            producers: info.filter(function(data) {
                return data.includes('Producers')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Producers')
            })[0].replace('Producers: ', '') : '',
            season: info.filter(function(data) {
                return data.includes('Musim Rilis')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Musim Rilis')
            })[0].replace('Musim Rilis : ', '') : '',
            studio: info.filter(function(data) {
                return data.includes('Studio')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Studio')
            })[0].replace('Studio : ', '') : '',
            duration: info.filter(function(data) {
                return data.includes('Durasi') || data.includes('Duration')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Durasi') || data.includes('Duration')
            })[0].replace('Durasi per Episode : ', '').replace('Duration: ', '') : '',
            genre: info.filter(function(data) {
                return data.includes('Genre')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Genre')
            })[0].replace('Genre : ', '') : '',
            score: info.filter(function(data) {
                return data.includes('Skor') || data.includes('Score')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Skor') || data.includes('Score')
            })[0].replace('Skor di MyAnimeList : ', '').replace('Score: ', '') : '',
            credit: info.filter(function(data) {
                return data.includes('Credit')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Credit')
            })[0].replace('Credit : ', '') : '',
        }
        
        return result
    }
}
module.exports = new Meownime()