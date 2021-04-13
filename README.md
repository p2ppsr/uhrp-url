# uhrp-url

Tools for dealing with UHRP URLs

## Overview

Unlike traditional URLs, URLs used by the Universal Hash Resolution Protocol (UHRP) are calculated based on the cryptographic hash of the content being referenced. This allows for self-verifying content. This library allows you to calculate and decode UHRP URLs.

## API

### getURLForHash(hash)

Given the hash of a file, returns a UHRP URL string.

**hash**: a `Buffer` that is the 32-byte sha256 hash of a file

**returns**: A base58 URL string

### getURLForFile(file)

Given the file data as a buffer, returns a UHRP URL string.

**file**: a `Buffer` that is the data in a file

**returns**: A base58 URL string

### getHashFromURL(URL)

Given a URL string, verifies its checksum and if valid, returns the hash of the file.

**URL**: The base58 URL string

**returns**: The 32-byte buffer that is the hash of the data represented by the URL

## License

The license for the code in this repository is the Open BSV License.
