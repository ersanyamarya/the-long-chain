import { logger } from '@the-long-chain/utils'
import { openAIConfig } from './config/open_ai'
import { serperAIConfig } from './config/serper_ai'
import { mainServiceServerConfig } from './config/server'

logger.info('Starting blaze_api service')
logger.info(JSON.stringify({ serperAIConfig, openAIConfig, mainServiceServerConfig }, null, 2))
console.log({ serperAIConfig, openAIConfig, mainServiceServerConfig })
