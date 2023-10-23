import axios from 'axios'
import logger from '../../logger'

export interface GoogleSearchResults {
  searchParameters: SearchParameters
  organic: Organic[]
  peopleAlsoAsk: PeopleAlsoAsk[]
  relatedSearches: RelatedSearch[]
}

export interface Organic {
  title: string
  link: string
  snippet: string
  date?: string
  position: number
  attributes?: Attributes
  rating?: number
  ratingCount?: number
}

export interface Attributes {
  Missing?: string
  Duration?: string
  Date?: string
  Rating?: string
}

export interface PeopleAlsoAsk {
  question: string
  snippet: string
  title: string
  link: string
}

export interface RelatedSearch {
  query: string
}

export interface SearchParameters {
  q: string
  gl: string
  type: string
  engine: string
}

export type GoogleSearchConfig = {
  apiKey: string
  gl: string
  youtube?: boolean
}

/**
 * The `searchOnGoogle` function is an asynchronous function that takes a query string and a
 * configuration object as parameters and returns a promise that resolves to the search results from
 * Google.
 * @param {string} query - The query parameter is a string that represents the search query you want to
 * perform on Google. It can be any text that you want to search for.
 * @param {GoogleSearchConfig}  - - `query`: The search query string.
 * @returns The function `searchOnGoogle` returns a Promise that resolves to an object of type
 * `GoogleSearchResults`.
 */
export async function searchOnGoogle(
  query: string,
  { apiKey, gl, youtube }: GoogleSearchConfig
): Promise<GoogleSearchResults> {
  logger.info(`----------------- Search Google :${youtube ? 'youtube' : 'google'} ----------------- `)
  const data = JSON.stringify({ q: query + (youtube ? ' + youtube' : ''), gl })
  const config = {
    method: 'post',
    url: 'https://google.serper.dev/search',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    data: data,
  }

  const results = await axios(config)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error?.response?.data?.message || "Couldn't fetch data from Google")
    })
  logger.info('----------------- Complete Search Google ----------------- ')
  return results
}
