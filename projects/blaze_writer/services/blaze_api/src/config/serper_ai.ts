import { readEnvVariable } from '@the-long-chain/utils'

export const serperAIConfig = {
  apiKey: readEnvVariable('NX_SERPER_API_KEY'),
}
