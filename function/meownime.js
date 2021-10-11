class Meownime {
    meownime = (info, thumb) => {
        const result = {
            images: thumb,
            title:info.filter(function(data) {
                return data.includes('Judul Alternatif')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Judul Alternatif')
            })[0].replace('Judul Alternatif : ', '') : '',
            episode: info.filter(function(data) {
                return data.includes('Jumlah Episode')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Jumlah Episode ')
            })[0].replace('Jumlah Episode : ', '') : '',
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
                return data.includes('Durasi')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Durasi')
            })[0].replace('Durasi : ', '') : '',
            genre: info.filter(function(data) {
                return data.includes('Genre')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Genre')
            })[0].replace('Genre : ', '') : '',
            score: info.filter(function(data) {
                return data.includes('Skor')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Skor')
            })[0].replace('Skor di MyAnimeList : ', '') : '',
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