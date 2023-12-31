var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var bs58 = require('base-x')(BASE58)


export function isTxid(input: string): boolean {
    // Regular expression for a Bitcoin txid (64 hexadecimal characters)
    const txidRegex = /^[0-9a-fA-F]{64}$/;
  
    // Test if input matches the regex
    const isTxid = txidRegex.test(input);
  
    return isTxid;
}

export function hexToBase58(hexString: string): string {
    
    const hexBuffer = Buffer.from(hexString, 'hex');
    const base58String = bs58.encode(hexBuffer);

    return base58String;
}

export function encodeWithLeadingZero(bytes: Uint8Array): string {
    // Add a leading 0 byte to the byte array
    const dataWithZero = new Uint8Array([0, ...bytes]);
    
    // Encode the byte array using Base58
    const encoded = bs58.encode(dataWithZero);
  
    return encoded;
}

const changeEndianness = (string:string) => {// change endianess of hex value before placing into ASM script
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
      result.push(string.substr(len, 2));
      len -= 2;
    }
    return result.join('');
}

export function hex2Int(hex:string){
    const reversedHex = changeEndianness(hex);
    return parseInt(reversedHex, 16);
}