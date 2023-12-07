import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'
import * as prismatypes from '../prisma/generated/nexus-prisma/index'

export const schema = makeSchema({
  types: [types, prismatypes],
  outputs: {
    typegen: join(process.cwd(), 'nexus-typegen.ts'),
    schema: join(process.cwd(), 'schema.graphql'),
  },
  contextType: {
    module: join(process.cwd(), './src/context.ts'),
    export: 'Context',
  },
})
