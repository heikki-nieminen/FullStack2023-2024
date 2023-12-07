import { arg, extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { context as db } from '../context'

export const Test = objectType({
  name: 'Test',
  definition(t) {
    t.nonNull.int('id'), t.nonNull.string('test_text')
  },
})

export const TestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('tests', {
      type: 'Test',
      resolve: async (parent, args, context, info) => {
        return await db.prisma.test.findMany()
      },
    })
  },
})
