import { createContentLoader } from 'vitepress';
import { webcrypto } from 'crypto';
import { generatePassword } from './generate-password';

const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

const SALT_POSITION = 0;
const IV_POSITION = SALT_POSITION + SALT_LENGTH;
const TAG_POSITION = IV_POSITION + IV_LENGTH;
const CIPHER_POSITION = TAG_POSITION + TAG_LENGTH;

const hexTable = new TextEncoder().encode('0123456789abcdef');
// https://deno.land/std@0.203.0/encoding/hex.ts
function encodeHex(src) {
  const dst = new Uint8Array(src.length * 2);
  for (let i = 0; i < dst.length; i++) {
    const v = src[i];
    dst[i * 2] = hexTable[v >> 4];
    dst[i * 2 + 1] = hexTable[v & 0x0f];
  }
  return new TextDecoder().decode(dst);
}

async function getKey(salt, password) {
  const secret = new TextEncoder().encode(password);
  const baseKey = await webcrypto.subtle.importKey('raw', secret, 'PBKDF2', false, ['deriveKey', 'deriveBits']);

  return webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-512', salt, iterations: 100000 },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptString(text) {
  const iv = webcrypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const salt = webcrypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const password = await generatePassword();
  console.log(password);

  const key = await getKey(salt, password);

  const encrypted = new Uint8Array(
    await webcrypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        additionalData: new Uint8Array(),
        tagLength: TAG_LENGTH * 8,
      },
      key,
      new TextEncoder().encode(text)
    )
  );

  const cipher = encrypted.subarray(0, encrypted.length - TAG_LENGTH);
  const authTag = encrypted.subarray(encrypted.length - TAG_LENGTH);

  const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);

  result.set(salt, SALT_POSITION);
  result.set(iv, IV_POSITION);
  result.set(authTag, TAG_POSITION);
  result.set(cipher, CIPHER_POSITION);
  return encodeHex(result);
}

export default {
  vite: {
    build: {
      // assetsInlineLimit: 0,
    },
    plugins: [],
  },
  srcDir: 'src',
  outDir: 'docs',
  title: 'Rebecca Deakin - Game Artist',
  description: 'Rebecca Deakin - Game Artist',
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'rebecca deakin, beccy deakin, deakin, brighton, illustrator, illustration, animation, animator, games, games development, unity, unity3d, blender, 3d modelling, concept art',
      },
    ],
    ['meta', { name: 'viewport', content: 'width=device-width' }],
    ['meta', { name: 'theme-color', content: '#16CAB1' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  siteTitle: 'Rebecca Deakin',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://rebeccadeakin.com',
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: 'Portfolio',
        link: '/',
      },
      {
        text: 'About',
        link: '/about/',
      },
      {
        text: 'me@rebeccadeakin.com',
        link: 'mailto:me@rebeccadeakin.com',
      },
      /* {
        text: '@BeccyDeakin',
        link: 'https://twitter.com/BeccyDeakin',
        icon: 'twitter',
      }, */
    ],
  },
  async transformPageData(pageData, { siteConfig }) {
    let portfolioItems = await createContentLoader('./src/portfolio/**/index.md', {}).load();
    portfolioItems = portfolioItems
      .filter((page) => page.frontmatter.portfolioHub !== true)
      .filter((page) => page.frontmatter.hidden !== true);
    portfolioItems.sort((a, b) => {
      if (a.frontmatter.featured) {
        return a.frontmatter.featured ? -1 : 1;
      }
      return a.frontmatter.sort > b.frontmatter.sort ? -1 : 1;
    });
    pageData.portfolioItems = portfolioItems;
  },
  async transformHtml(code, id, { pageData }) {
    if (pageData.frontmatter.encrypt !== true) return code;
    console.time('encryptedTime');
    console.log(id);
    const encrypted = await encryptString(code);
    console.timeEnd('encryptedTime');
    return `
    <html>
    <script type="encrypted">${encrypted}</script>
    
    <script>
    const IV_LENGTH = 16;
    const SALT_LENGTH = 64;
    const TAG_LENGTH = 16;

    const SALT_POSITION = 0;
    const IV_POSITION = SALT_POSITION + SALT_LENGTH;
    const TAG_POSITION = IV_POSITION + IV_LENGTH;
    const CIPHER_POSITION = TAG_POSITION + TAG_LENGTH;

    async function getKey(salt, password) {
      const secret = new TextEncoder().encode(password);
      const baseKey = await crypto.subtle.importKey('raw', secret, 'PBKDF2', false, ['deriveKey', 'deriveBits']);

      return crypto.subtle.deriveKey(
        { name: 'PBKDF2', hash: 'SHA-512', salt, iterations: 100000 },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    }


    function fromHexChar(byte) {
      // https://deno.land/std@0.203.0/encoding/hex.ts?source=#L46
      if (48 <= byte && byte <= 57) return byte - 48;
      if (97 <= byte && byte <= 102) return byte - 97 + 10;
      if (65 <= byte && byte <= 70) return byte - 65 + 10;
    
      throw new Error('invalid byte ' + byte);
    }
    function decodeHex(src) {
      const u8 = new TextEncoder().encode(src);
      const dst = new Uint8Array(u8.length / 2);
      for (let i = 0; i < dst.length; i++) {
        const a = fromHexChar(u8[i * 2]);
        const b = fromHexChar(u8[i * 2 + 1]);
        dst[i] = (a << 4) | b;
      }
      // if (u8.length % 2 === 1) {
        return dst;
      // }
    }
    async function go() {
      const ciphertext = document.querySelector('script[type=encrypted]').textContent;
      const params = new URL(document.location).searchParams;
      const password = params.get('password');
      const data = decodeHex(ciphertext);

      const salt = data.subarray(SALT_POSITION, SALT_LENGTH);
      console.log(salt.join(''));

      const iv = data.subarray(IV_POSITION, IV_POSITION + IV_LENGTH);
      const authTag = data.subarray(TAG_POSITION, TAG_POSITION + TAG_LENGTH);
      const cipher = data.subarray(CIPHER_POSITION);

      const encrypted = new Uint8Array(cipher.length + TAG_LENGTH);
      encrypted.set(cipher);
      encrypted.set(authTag, cipher.length);

      const key = await getKey(salt, password);
      let decrypted;

      try {
        decrypted = await crypto.subtle.decrypt(
          {
            name: 'AES-GCM',
            iv,
            additionalData: new Uint8Array(),
            tagLength: TAG_LENGTH * 8,
          },
          key,
          encrypted
        );
      } catch (error) {
        console.log(error);
      }

      document.querySelector('html').innerHTML = new TextDecoder().decode(decrypted);
    }
    go();
    </script>
    <body>
    Loading...
    </body>
    </html>
    `;
  },
};
