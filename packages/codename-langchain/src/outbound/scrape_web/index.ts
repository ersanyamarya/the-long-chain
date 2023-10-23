import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import { YoutubeTranscript } from 'youtube-transcript'
import logger from '../../logger'

const isLinkYoutube = (link: string) => {
  return link.includes('youtube.com')
}

/**
 * The function `scrapeDataFromUrl` is an async function that takes a URL as input and returns a
 * Promise that resolves to a string. It scrapes data from the given URL by either fetching the
 * transcript from a YouTube video or extracting the text content from a web page using Puppeteer and
 * Readability.
 * @param {string} url - The `url` parameter is a string that represents the URL of the webpage you
 * want to scrape data from.
 * @returns The function `scrapeDataFromUrl` returns a Promise that resolves to a string.
 */
async function scrapeDataFromUrl(url: string): Promise<string> {
  logger.info('----------------- Scrape: Starting ----------------- ')
  logger.info(`Scraping ${url}`)
  if (isLinkYoutube(url)) {
    const transcript = await YoutubeTranscript.fetchTranscript(url)
    return transcript.map(t => t.text).join(' ')
  } else {
    const browser = await puppeteer.launch({
      headless: 'new',
    })

    const page = await browser.newPage()
    await page.goto(url)
    const content = await page.content()
    const doc = new JSDOM(content, {
      url,
    })
    await browser.close()
    const reader = new Readability(doc.window.document)
    const article = reader.parse().textContent

    logger.info('----------------- Scrape: Done ----------------- ')
    return article.replace(/\s\s+/g, ' ').replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, ' ').toString()
  }
}

export { isLinkYoutube, scrapeDataFromUrl }
