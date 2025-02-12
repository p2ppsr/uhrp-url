import * as base58check from 'base58check'
import { createHash } from 'crypto'

/**
 * Takes a UHRP URL and removes any prefixes.
 * @param {string} URL - The UHRP URL.
 * @returns {string} - Normalized URL.
 */
export const normalizeURL = (URL: string) => {
  if (URL.toLowerCase().startsWith('uhrp:')) URL = URL.slice(5)
  if (URL.startsWith('//')) URL = URL.slice(2)
  return URL
}

/**
 * Generates a UHRP URL from a given SHA-256 hash.
 * @param {Buffer} hash - 32-byte SHA-256 hash.
 * @returns {string} - Base58Check encoded URL.
 */
export const getURLForHash = (hash: Buffer) => {
  if (hash.byteLength !== 32) {
    throw new Error('Hash length must be 32 bytes (sha256)')
  }
  return base58check.encode(hash, Buffer.from('ce00', 'hex'))
}

/**
 * Generates a UHRP URL for a given file.
 * @param {Buffer | string} file - File content as Buffer or string.
 * @returns {string} - Base58Check encoded URL.
 */
export const getURLForFile = (file: Buffer) => {
  const hashFunc = createHash('sha256')
  hashFunc.update(file)
  const hash = hashFunc.digest('hex')
  return getURLForHash(Buffer.from(hash, 'hex'))
}

/**
 * Extracts the hash from a UHRP URL.
 * @param {string} URL - UHRP URL.
 * @returns {Buffer} - Extracted SHA-256 hash.
 */
export const getHashFromURL = (URL: string) => {
  URL = normalizeURL(URL)
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

/**
 * Checks if a URL is a valid UHRP URL.
 * @param {string} URL - The URL to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidURL = (URL: string) => {
  try {
    getHashFromURL(URL)
    return true
  } catch (e) {
    return false
  }
}