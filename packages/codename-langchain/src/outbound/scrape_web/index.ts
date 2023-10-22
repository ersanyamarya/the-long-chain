import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import { Logger } from 'winston'
import { YoutubeTranscript } from 'youtube-transcript'

const isLinkYoutube = (link: string) => {
  return link.includes('youtube.com')
}

/**
 * The function `scrapeDataFromUrl` is an asynchronous function that takes a URL and a logger as
 * parameters. It scrapes data from the given URL and returns the scraped data as a string. If the URL
 * is a YouTube link, it fetches the transcript of the video and returns it. Otherwise, it uses
 * Puppeteer to launch a headless browser, navigates to the URL, and extracts the main article content
 * using the Readability library. The extracted article is then cleaned up and returned as a string.
 * @param {string} url - The `url` parameter is a string that represents the URL of the webpage you
 * want to scrape data from.
 * @param {Logger} logger - The `logger` parameter is an instance of a logger object that is used to
 * log messages during the scraping process. It is passed to the `scrapeDataFromUrl` function so that
 * it can log information about the progress and status of the scraping operation.
 * @returns The function `scrapeDataFromUrl` returns a Promise that resolves to a string.
 */
async function scrapeDataFromUrl(url: string, logger: Logger): Promise<string> {
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
