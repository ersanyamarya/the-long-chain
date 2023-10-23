import { readEnvVariable } from '@the-long-chain/utils'

export const authConfig = {
  adminToken: {
    header: readEnvVariable('NX_ADMIN_TOKEN_HEADER'),
    token: readEnvVariable('NX_ADMIN_TOKEN'),
  },
  jwt: {
    header: readEnvVariable('NX_AUTH_HEADER'),
  },
}
