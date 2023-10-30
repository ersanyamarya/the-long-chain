import { ServiceAccount } from 'firebase-admin'

import { existsSync, readFileSync } from 'fs'
import { exit } from 'process'

export const getFirebaseConfig = (fireBaseAdminFilePath: string): ServiceAccount => {
  let serviceAccount = null
  if (!existsSync(fireBaseAdminFilePath)) {
    console.error(`Keys not found at ${fireBaseAdminFilePath}`)
    exit(0)
  } else {
    serviceAccount = JSON.parse(readFileSync(fireBaseAdminFilePath, 'utf8'))
  }

  return serviceAccount
}
