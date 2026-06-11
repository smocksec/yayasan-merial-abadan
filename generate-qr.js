const QRCode = require('qrcode')
const path = require('path')

const url = process.argv[2] || 'https://merial-abadan-web.vercel.app/pendaftaran'; // Default to a Vercel-like domain if none provided
const outputPath = path.join(__dirname, 'public', 'qr-pendaftaran.png');

QRCode.toFile(outputPath, url, {
  color: {
    dark: '#172E40',  // Deep Navy from the PRD
    light: '#FFFFFF' // Transparent background
  },
  width: 1024,
  margin: 2
}, function (err) {
  if (err) throw err
  console.log('QR Code generated at:', outputPath)
  console.log('URL embedded:', url)
})
