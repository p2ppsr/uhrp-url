
import { getURLForFile, getURLForHash, getHashFromURL, isValidURL } from '../index';
import * as base58check from 'base58check';

const exampleHash = Buffer.from(
  'a0d4c2cb69837827bae6ad6c717218d6f53708e2ebcaefaebac2639ac27ccbb7',
  'hex'
)

const exampleFile = Buffer.from(
  '687da27f04a112aa48f1cab2e7949f1eea4f7ba28319c1e999910cd561a634a05a3516e6db',
  'hex'
)

const exampleURL = 'XUU7cTfy6fA6q2neLDmzPqJnGB6o18PXKoGaWLPrH1SeWLKgdCKp'

describe('uhrp-url', () => {
  describe('getURLForHash', () => {
    it('Creates the correct URL for the hash', () => {
      const url = getURLForHash(exampleHash)
      expect(url).toEqual(
        'XUU7cTfy6fA6q2neLDmzPqJnGB6o18PXKoGaWLPrH1SeWLKgdCKp'
      )
    })
    it('Throws an error if hash length is invalid', () => {
      expect(() => getURLForHash(exampleFile)).toThrow(new Error(
        'Hash length must be 32 bytes (sha256)'
      ))
    })
  })
  describe('getURLForFile', () => {
    it('Creates the correct URL for the file', () => {
      const url = getURLForFile(exampleFile)
      expect(url).toEqual(
        'XUT6PqWb3GP3LR7dmBMCJwZ3oo5g1iGCF3CrpzyuJCemkGu1WGoq'
      )
    })
  })
  describe('getHashFromURL', () => {
    it('Decodes the URL to the corect hash', () => {
      const hash = getHashFromURL(exampleURL)
      expect(hash.toString('hex')).toEqual(exampleHash.toString('hex'))
    })
    it('Throws an error if checksum is invalid', () => {
      const badURL = 'XUU7cTfy6fA6q2neLDmzPqJnGB6o18PXKoGaWLPrH1SeWLKgdCKq'
      expect(() => getHashFromURL(badURL)).toThrow(new Error(
        'Invalid checksum'
      ))
    })
    it('Throws an error if URL length is invalid', () => {
      const badURL = base58check.encode(exampleFile, Buffer.from('ce00', 'hex'))
      expect(() => getHashFromURL(badURL)).toThrow(new Error(
        'Invalid length!'
      ))
    })
    it('Throws an error if prefix is invalid', () => {
      let badURL = base58check.encode(exampleHash, Buffer.from('cf00', 'hex'))
      expect(() => getHashFromURL(badURL)).toThrow(new Error(
        'Invalid prefix!'
      ))
      badURL = base58check.encode(exampleHash, Buffer.from('ce01', 'hex'))
      expect(() => getHashFromURL(badURL)).toThrow(new Error(
        'Invalid prefix!'
      ))
    })
  })
  describe('isValidURL', () => {
    it('Returns true when URL is valid', () => {
      expect(isValidURL(exampleURL)).toEqual(true)
    })
    it('Returns false if checksum is invalid', () => {
      const badURL = 'XUU7cTfy6fA6q2neLDmzPqJnGB6o18PXKoGaWLPrH1SeWLKgdCKq'
      expect(isValidURL(badURL)).toEqual(false)
    })
    it('Returns false if URL length is invalid', () => {
      const badURL = base58check.encode(exampleFile, Buffer.from('ce00', 'hex'))
      expect(isValidURL(badURL)).toEqual(false)
    })
    it('Returns false if prefix is invalid', () => {
      let badURL = base58check.encode(exampleHash, Buffer.from('cf00', 'hex'))
      expect(isValidURL(badURL)).toEqual(false)
      badURL = base58check.encode(exampleHash, Buffer.from('ce01', 'hex'))
      expect(isValidURL(badURL)).toEqual(false)
    })
  })
})
