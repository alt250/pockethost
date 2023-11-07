<<<<<<< HEAD:src/services/CentralDbService.ts
import { MOTHERSHIP_NAME } from '$constants'
import { LoggerService, mkSingleton, SingletonBaseConfig } from '$shared'
=======
import { PUBLIC_MOTHERSHIP_NAME } from '$constants'
import {
  LoggerService,
  mkSingleton,
  SingletonBaseConfig,
} from '@pockethost/common'
>>>>>>> 8c38aa1d (Squashed commit of the following:):packages/daemon/src/services/CentralDbService.ts
import { proxyService } from './ProxyService'

export type CentralDbServiceConfig = SingletonBaseConfig

export const centralDbService = mkSingleton(
  async (config: CentralDbServiceConfig) => {
    const { dbg } = LoggerService().create(`centralDbService`)

    ;(await proxyService()).use(
      MOTHERSHIP_NAME(),
      ['/api(/*)', '/_(/*)', '/'],
      (req, res, meta, logger) => {
        const { dbg } = logger
        const { coreInternalUrl, proxy } = meta

        const target = coreInternalUrl
        dbg(
          `Forwarding proxy request for ${req.url} to central instance ${target}`,
        )
        proxy.web(req, res, { target })
        return true
      },
      `CentralDbService`,
    )

    return {
      shutdown() {},
    }
  },
)
