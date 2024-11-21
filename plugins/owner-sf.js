import fs from 'fs'

// Daftar nomor yang diizinkan
const allowedNumbers = ['19419318284', '33189313251']

let handler = async (m, { text, usedPrefix, command }) => {
    // Cek apakah nomor pengirim ada dalam daftar allowedNumbers
    if (allowedNumbers.includes(m.sender.replace(/[^\d]/g, ''))) {  // Hanya angka yang diperiksa
        if (!text) return m.reply('Mohon masukkan nama file untuk menyimpan teks.')
        if (!m.quoted || !m.quoted.text) throw `Balas pesan yang ingin disimpan!`
        
        let path = `${text}`
        await fs.writeFileSync(path, m.quoted.text)
        m.reply(`Tersimpan di ${path}`)
    } else {
        m.reply('Perintah ini hanya untuk nomor tertentu saja.')
    }
}
handler.command = /^(sf)$/i

export default handler