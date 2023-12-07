import { settings } from 'nexus-prisma/generator'

settings({
  projectIdIntToGraphQL: 'Int',
  output: './generated/nexus-prisma',
})
