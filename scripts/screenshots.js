/* Takes the README screenshots in docs/screenshots/, light and dark, as WebP.

   Opens dist/index.html in Chromium with a fresh browser profile, works
   through a scenario and a practice question, and captures the results.
   Randomness is seeded so the same questions appear each time. Needs Node
   and Playwright with Chromium installed (not a dependency of the course):

     node scripts/screenshots.js */
'use strict';
var fs = require('fs');
var path = require('path');
var url = require('url');
var chromium = require('playwright').chromium;

var ROOT = path.join(__dirname, '..');
var OUT = path.join(ROOT, 'docs', 'screenshots');
var PAGE = url.pathToFileURL(path.join(ROOT, 'dist', 'index.html')).href;

// A small seeded generator in place of Math.random, so shuffles repeat.
function seedRandom() {
  var a = 20261108;
  Math.random = function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

var SHOTS = [
  {
    name: 'scenario', width: 1280, height: 1000, hash: 'scenario/s1',
    prepare: async function (page) {
      await page.getByText('Make the request visible to the other Developers').click();
      await page.getByRole('button', { name: 'Decide' }).click();
      await page.locator('.step-fb').first().waitFor();
      // Feedback takes focus and scrolls; show the scenario from its title.
      await page.evaluate(function () { window.scrollTo(0, 0); });
    }
  },
  {
    name: 'practice', width: 1280, height: 1000, hash: 'practice',
    prepare: async function (page) {
      await page.getByRole('button', { name: 'Start quick set' }).click();
      var form = page.locator('#sq-form');
      await form.waitFor();
      // With the seeded order, the second option is this question's right answer.
      await form.locator('.option input, input[name^="sq"]').nth(1).check();
      await page.getByRole('button', { name: 'Submit answer' }).click();
      await page.locator('#sq-fb *').first().waitFor();
    }
  },
  { name: 'home', width: 1280, height: 1000, hash: '' }
];

/* WebP is a fraction of PNG's size. Chromium's canvas encodes it, so nothing else needs installing. */
async function toWebp(page, png) {
  var dataUrl = await page.evaluate(async function (base64) {
    var image = new Image();
    image.src = 'data:image/png;base64,' + base64;
    await image.decode();
    var canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas.toDataURL('image/webp', 0.9);
  }, png.toString('base64'));
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

(async function () {
  fs.mkdirSync(OUT, { recursive: true });
  var browser = await chromium.launch();
  try {
    for (var scheme of ['light', 'dark']) {
      for (var shot of SHOTS) {
        var context = await browser.newContext({
          viewport: { width: shot.width, height: shot.height },
          deviceScaleFactor: 2,
          colorScheme: scheme,
          reducedMotion: 'reduce'
        });
        await context.addInitScript(seedRandom);
        var page = await context.newPage();
        await page.goto(PAGE + '#/' + shot.hash);
        await page.locator('main h1').first().waitFor();
        if (shot.prepare) await shot.prepare(page);
        await page.evaluate(function () { return document.fonts.ready; });
        await page.waitForTimeout(300);
        var sideways = await page.evaluate(function () { return document.documentElement.scrollWidth > document.documentElement.clientWidth; });
        if (sideways) console.warn(shot.name + ' (' + scheme + ') scrolls sideways');
        var file = path.join(OUT, shot.name + '-' + scheme + '.webp');
        fs.writeFileSync(file, await toWebp(page, await page.screenshot()));
        console.log('Saved ' + file);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch(function (err) { console.error(err); process.exitCode = 1; });
