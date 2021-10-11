class Otakudesu {
    otakudesu = (info, thumb) => {
        const result = {
            images: thumb,
            title:info.filter(function(data) {
                return data.includes('Judul')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Judul')
            })[0].replace('Judul: ', '') : '',
            japanese: info.filter(function(data) {
                return data.includes('Japanese')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Japanese')
            })[0].replace('Japanese: ', '') : '',
            Skor: info.filter(function(data) {
                return data.includes('Skor')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Skor')
            })[0].replace('Skor: ', '') : '',
            produser: info.filter(function(data) {
                return data.includes('Produser')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Produser')
            })[0].replace('Produser: ', '') : '',
            tipe: info.filter(function(data) {
                return data.includes('Tipe')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Tipe')
            })[0].replace('Tipe: ', '') : '',
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
            duration: info.filter(function(data) {
                return data.includes('Durasi')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Durasi')
            })[0].replace('Durasi: ', '') : '',
            release: info.filter(function(data) {
                return data.includes('Tanggal Rilis')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Tanggal Rilis')
            })[0].replace('Tanggal Rilis: ', '') : '',
            genre: info.filter(function(data) {
                return data.includes('Genre')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Genre')
            })[0].replace('Genre: ', '') : '',
            studio: info.filter(function(data) {
                return data.includes('Studio')
            })[0] !== undefined ? info.filter(function(data) {
                return data.includes('Studio')
            })[0].replace('Studio: ', '') : '',
        }
        return result
    }
}
module.exports = new Otakudesu()