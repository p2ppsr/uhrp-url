const base58check = require('base58check')
const crypto = require('crypto')

const getURLForHash = hash => {
  if (hash.byteLength !== 32) {
    throw new Error('Hash length must be 32 bytes (sha256)')
  }
  return base58check.encode(hash, Buffer.from('ce00', 'hex'))
}

const getURLForFile = file => {
  const hashFunc = crypto.createHash('sha256')
  hashFunc.update(file)
  const hash = hashFunc.digest('buffer')
  return getURLForHash(hash)
}

const getHashFromURL = URL => {
  if (URL.startsWith('uhrp:')) URL = URL.slice(5)
  const { prefix, data } = base58check.decode(URL)
  if (data.byteLength !== 33) {
    throw new Error('Invalid length!')
  }
  if (prefix.toString('hex') !== 'ce') {
    throw new Error('Invalid prefix!')
  }
  if (data.slice(0, 1).toString('hex') !== '00') {
    throw new Error('Invalid prefix!')
  }
  return data.slice(1, 33)
}

const isValidURL = URL => {
  try {
    getHashFromURL(URL)
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  getURLForFile,
  getURLForHash,
  getHashFromURL,
  isValidURL
}
