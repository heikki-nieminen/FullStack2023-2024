import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { Context, context } from './context'

export const server = new ApolloServer({
  schema,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3333 },
    context: async () => {
      return context.prisma
    },
  })
  console.log(`🚀 Server ready at ${url}`)
}

startServer()
