import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { Link as LinkType } from '../../prisma/generated/nexus-prisma'
import { context as db } from '../context'

export const Link = objectType({
  name: LinkType.$name,
  description: LinkType.$description,
  definition(t) {
    t.field(LinkType.id)
    t.field(LinkType.description)
    t.field(LinkType.url)
  },
})

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('link', {
      type: 'Link',
      args: {
        id: LinkType.id.type,
      },
      resolve: async (_, args, ctx) => {
        const link = await db.prisma.link.findUnique({
          where: { id: args.id },
        })
        return link || null
      },
    })
    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      resolve: async (parent, args, ctx, info) => {
        console.log('Getting links')
        return await db.prisma.link.findMany()
      },
    })
  },
})

// Mutations (post, delete, update)
export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'String',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: async (parent, args, ctx) => {
        try {
          await db.prisma.link.create({
            data: {
              description: args.description,
              url: args.url,
            },
          })
          return `Successfully added link `
        } catch (err) {
          return `Adding link failed `
        }
      },
    })
    t.nonNull.field('deleteLink', {
      type: 'String',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, args, ctx, info) => {
        console.log('Trying to delete item')
        // Try to delete item
        try {
          await db.prisma.link.delete({
            where: { id: args.id },
          })
          return `Succesfully deleted link  `
        } catch (err) {
          return `Error: ${err}`
        }
      },
    })
    t.nonNull.field('updateLink', {
      type: 'String',
      args: {
        id: nonNull(intArg()),
        url: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      resolve: async (parent, args, ctx, info) => {
        try {
          const updatedLink = await db.prisma.link.update({
            where: { id: args.id },
            data: { url: args.url, description: args.description },
          })
          return `Succesfully updated item`
        } catch (err) {
          return `Error updating item: ${err}`
        }
      },
    })
  },
})
