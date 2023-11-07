<<<<<<< HEAD:src/stresser/commands/seed.ts
import {
  MOTHERSHIP_ADMIN_PASSWORD,
  MOTHERSHIP_ADMIN_USERNAME,
} from '$constants'
import { MothershipAdmimClientService } from '$services'
import { InstanceStatus, serialAsyncExecutionGuard } from '$shared'
=======
import { DAEMON_PB_PASSWORD, DAEMON_PB_USERNAME } from '$constants'
import { clientService } from '$services'
import { InstanceStatus, serialAsyncExecutionGuard } from '@pockethost/common'
>>>>>>> 8c38aa1d (Squashed commit of the following:):packages/daemon/src/stresser/commands/seed.ts
import { random, range, shuffle } from '@s-libs/micro-dash'
import { Command } from 'commander'
import { customAlphabet } from 'nanoid'
import { ContextBase, GlobalOptions } from '../types'

const nanoid = customAlphabet(`abcdefghijklmnop`)

const _unsafe_createInstance = async (context: ContextBase) => {
  const logger = context.logger.create(`createInstance`)
  const { dbg } = logger
  const { client } = await MothershipAdmimClientService()

  const users = await client.client.collection('users').getFullList()

  await client.createInstance({
    subdomain: `stress-${nanoid()}`,
    uid: shuffle(users).pop()!.id,
    status: InstanceStatus.Idle,
    version: `~0.${random(1, 16)}.0`,
    secrets: {},
    maintenance: false,
  })
}
const createInstance = serialAsyncExecutionGuard(_unsafe_createInstance)

export type SeedOptions = GlobalOptions & { count: number }
export const createSeed = (context: { program: Command } & ContextBase) => {
  const { program } = context
  const logger = context.logger.create(`createSeed`)

  const seedCmd = program.command('seed')
  seedCmd
    .description('Seed system with new instances')
    .option(
      `-c, --count`,
      `Number of new seed instances to create`,
      parseInt,
      10,
    )
    .action(async () => {
      const options = seedCmd.optsWithGlobals<SeedOptions>()

      const { client } = await MothershipAdmimClientService({
        url: options.mothershipUrl,
<<<<<<< HEAD:src/stresser/commands/seed.ts
        username: MOTHERSHIP_ADMIN_USERNAME(),
        password: MOTHERSHIP_ADMIN_PASSWORD(),
=======
        username: DAEMON_PB_USERNAME,
        password: DAEMON_PB_PASSWORD,
>>>>>>> 8c38aa1d (Squashed commit of the following:):packages/daemon/src/stresser/commands/seed.ts
      })

      /**
       * Create instances
       */
      await Promise.all(range(10).map(() => createInstance({ logger })))
    })
}
