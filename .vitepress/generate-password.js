import { webcrypto } from 'crypto';

// EFForg/OpenWireless
// ref https://github.com/EFForg/OpenWireless/blob/master/app/js/diceware.js
async function randomNumber(min, max) {
  let rval = 0;
  const range = max - min + 1;
  const bitsNeeded = Math.ceil(Math.log2(range));
  if (bitsNeeded > 53) {
    throw new Error('We cannot generate numbers larger than 53 bits.');
  }

  const bytesNeeded = Math.ceil(bitsNeeded / 8);
  const mask = Math.pow(2, bitsNeeded) - 1;
  // 7776 -> (2^13 = 8192) -1 == 8191 or 0x00001111 11111111

  // Fill a byte array with N random numbers
  const byteArray = webcrypto.getRandomValues(new Uint8Array(bytesNeeded));

  let p = (bytesNeeded - 1) * 8;
  for (let i = 0; i < bytesNeeded; i++) {
    rval += byteArray[i] * Math.pow(2, p);
    p -= 8;
  }

  // Use & to apply the mask and reduce the number of recursive lookups
  rval = rval & mask;

  if (rval >= range) {
    // Integer out of acceptable range
    return randomNumber(min, max);
  }

  // Return an integer that falls within the range
  return min + rval;
}

// ref: https://stackoverflow.com/a/12646864/1090359
async function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = await randomNumber(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// https://github.com/bitwarden/clients/blob/8dc11a6f120cf91b0a2b129514f52528b9deaa43/libs/common/src/tools/generator/password/password-generation.service.ts
export async function generatePassword() {
  const o = {
    length: 32,
    ambiguous: true,
    number: true,
    minNumber: 1,
    uppercase: true,
    minUppercase: 2,
    lowercase: true,
    minLowercase: 2,
    special: false,
    minSpecial: 1,
  };

  const minLength = o.minUppercase + o.minLowercase + o.minNumber + o.minSpecial;
  if (o.length < minLength) {
    o.length = minLength;
  }

  const positions = [];
  if (o.lowercase && o.minLowercase > 0) {
    for (let i = 0; i < o.minLowercase; i++) {
      positions.push('l');
    }
  }
  if (o.uppercase && o.minUppercase > 0) {
    for (let i = 0; i < o.minUppercase; i++) {
      positions.push('u');
    }
  }
  if (o.number && o.minNumber > 0) {
    for (let i = 0; i < o.minNumber; i++) {
      positions.push('n');
    }
  }
  if (o.special && o.minSpecial > 0) {
    for (let i = 0; i < o.minSpecial; i++) {
      positions.push('s');
    }
  }
  while (positions.length < o.length) {
    positions.push('a');
  }

  // shuffle
  await shuffleArray(positions);

  // build out the char sets
  let allCharSet = '';

  let lowercaseCharSet = 'abcdefghijkmnopqrstuvwxyz';
  if (o.ambiguous) {
    lowercaseCharSet += 'l';
  }
  if (o.lowercase) {
    allCharSet += lowercaseCharSet;
  }

  let uppercaseCharSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  if (o.ambiguous) {
    uppercaseCharSet += 'IO';
  }
  if (o.uppercase) {
    allCharSet += uppercaseCharSet;
  }

  let numberCharSet = '23456789';
  if (o.ambiguous) {
    numberCharSet += '01';
  }
  if (o.number) {
    allCharSet += numberCharSet;
  }

  const specialCharSet = '!@#$%^&*';
  if (o.special) {
    allCharSet += specialCharSet;
  }

  let password = '';
  for (let i = 0; i < o.length; i++) {
    let positionChars;
    switch (positions[i]) {
      case 'l':
        positionChars = lowercaseCharSet;
        break;
      case 'u':
        positionChars = uppercaseCharSet;
        break;
      case 'n':
        positionChars = numberCharSet;
        break;
      case 's':
        positionChars = specialCharSet;
        break;
      case 'a':
        positionChars = allCharSet;
        break;
      default:
        break;
    }

    const randomCharIndex = await randomNumber(0, positionChars.length - 1);
    password += positionChars.charAt(randomCharIndex);
  }

  return password;
}
