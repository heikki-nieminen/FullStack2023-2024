import * as NexusCore from 'nexus/dist/core'

//
//
// TYPES
// TYPES
// TYPES
// TYPES
//
//

// Models

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Link`.
  *
  * ### ️⚠️ You have not written documentation for model Link
  *
  * Replace this default advisory JSDoc with your own documentation about model Link
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Link {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Link } from 'nexus-prisma'
  *
  * objectType({
  *   name: Link.$name
  *   description: Link.$description
  *   definition(t) {
  *     t.field(Link.id)
  *   }
  * })
  */
export interface Link {
  $name: 'Link'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Link.id`.
    *
    * ### ️⚠️ You have not written documentation for model Link
    *
    * Replace this default advisory JSDoc with your own documentation about model Link
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Link {
    *   /// Lorem ipsum dolor sit amet.
    *   id  Int
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Link } from 'nexus-prisma'
    *
    * objectType({
    *   name: Link.$name
    *   description: Link.$description
    *   definition(t) {
    *     t.field(Link.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Int' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Link', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Link.createdAt`.
    *
    * ### ️⚠️ You have not written documentation for model Link
    *
    * Replace this default advisory JSDoc with your own documentation about model Link
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Link {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Link } from 'nexus-prisma'
    *
    * objectType({
    *   name: Link.$name
    *   description: Link.$description
    *   definition(t) {
    *     t.field(Link.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Link', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Link.description`.
    *
    * ### ️⚠️ You have not written documentation for model Link
    *
    * Replace this default advisory JSDoc with your own documentation about model Link
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Link {
    *   /// Lorem ipsum dolor sit amet.
    *   description  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Link } from 'nexus-prisma'
    *
    * objectType({
    *   name: Link.$name
    *   description: Link.$description
    *   definition(t) {
    *     t.field(Link.description)
    *   }
    * })
    */
  description: {
    /**
     * The name of this field.
     */
    name: 'description'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Link', 'description'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Link.url`.
    *
    * ### ️⚠️ You have not written documentation for model Link
    *
    * Replace this default advisory JSDoc with your own documentation about model Link
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Link {
    *   /// Lorem ipsum dolor sit amet.
    *   url  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Link } from 'nexus-prisma'
    *
    * objectType({
    *   name: Link.$name
    *   description: Link.$description
    *   definition(t) {
    *     t.field(Link.url)
    *   }
    * })
    */
  url: {
    /**
     * The name of this field.
     */
    name: 'url'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Link', 'url'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Test`.
  *
  * ### ️⚠️ You have not written documentation for model Test
  *
  * Replace this default advisory JSDoc with your own documentation about model Test
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Test {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Test } from 'nexus-prisma'
  *
  * objectType({
  *   name: Test.$name
  *   description: Test.$description
  *   definition(t) {
  *     t.field(Test.id)
  *   }
  * })
  */
export interface Test {
  $name: 'Test'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Test.id`.
    *
    * ### ️⚠️ You have not written documentation for model Test
    *
    * Replace this default advisory JSDoc with your own documentation about model Test
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Test {
    *   /// Lorem ipsum dolor sit amet.
    *   id  Int
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Test } from 'nexus-prisma'
    *
    * objectType({
    *   name: Test.$name
    *   description: Test.$description
    *   definition(t) {
    *     t.field(Test.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Int' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Test', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Test.test_text`.
    *
    * ### ️⚠️ You have not written documentation for model Test
    *
    * Replace this default advisory JSDoc with your own documentation about model Test
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Test {
    *   /// Lorem ipsum dolor sit amet.
    *   test_text  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Test } from 'nexus-prisma'
    *
    * objectType({
    *   name: Test.$name
    *   description: Test.$description
    *   definition(t) {
    *     t.field(Test.test_text)
    *   }
    * })
    */
  test_text: {
    /**
     * The name of this field.
     */
    name: 'test_text'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Test', 'test_text'>
  }
}

// Enums

// N/A –– You have not defined any enums in your Prisma schema file.


//
//
// TERMS
// TERMS
// TERMS
// TERMS
//
//

//
//
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
//
//

export const Link: Link

export const Test: Test

//
//
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
//
//

// N/A –– You have not defined any enums in your Prisma schema file.

//
//
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
//
//

import type { Settings } from 'nexus-prisma/dist-cjs/generator/Settings/index'

/**
 * Adjust Nexus Prisma's [runtime settings](https://pris.ly/nexus-prisma/docs/settings/runtime).
 *
 * @example
 *
 *     import { PrismaClient } from '@prisma/client'
 *     import { ApolloServer } from '@apollo/server'
 *     import { startStandaloneServer } from '@apollo/server/standalone'   
 *     import { makeSchema } from 'nexus'
 *     import { User, Post, $settings } from 'nexus-prisma'
 *
 *     const apolloServer = new ApolloServer({
 *       schema: makeSchema({
 *         types: [],
 *       }),
 *     })
 *     startStandaloneServer(apolloServer, {
 *       context: async () => {
 *         return {
 *           db: new PrismaClient(), // <-- You put Prisma client on the "db" context property
 *         }
 *       },
 *     }).then(({ url }) => {
 *       console.log('GraphQL API ready at', url)
 *     })
 *
 *     $settings({
 *       prismaClientContextField: 'db', // <-- Tell Nexus Prisma
 *     })
 *
 * @remarks This is _different_ than Nexus Prisma's [_gentime_ settings](https://pris.ly/nexus-prisma/docs/settings/gentime).
 */
export const $settings: Settings.Runtime.Manager['change']
