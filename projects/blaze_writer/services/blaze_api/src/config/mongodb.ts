import { readEnvVariable } from '@the-long-chain/utils'
import { ConnectOptions } from 'mongoose'

const uri = readEnvVariable('NX_BLAZE_MONGO_URI')
const options: ConnectOptions = {}

export const mongoDbConfig = { uri, options }
