import { readEnvVariable } from '@the-long-chain/utils'

export const mainServiceServerConfig = {
  port: Number.parseInt(readEnvVariable('NX_BLAZE_MAIN_SERVICE_PORT') || '5000'),
  host: readEnvVariable('NX_BLAZE_MAIN_SERVICE_HOST'),
  graphqlURL: readEnvVariable('NX_BLAZE_MAIN_SERVICE_HOST') + '/graphql',
  debugStackTrace: true,
  logLevel: process.env['NX_BLAZE_MAIN_SERVICE_LOG_LEVEL'] || 'debug',
}
