import { readEnvVariable } from '@the-long-chain/utils'

export const openAIConfig = {
  apiKey: readEnvVariable('NX_OPENAI_API_KEY'),
}
