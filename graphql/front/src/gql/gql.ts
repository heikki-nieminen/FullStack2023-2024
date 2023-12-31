/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Links {\n    links {\n      id\n      url\n      description\n    }\n  }\n": types.LinksDocument,
    "\n  mutation DeleteLink($deleteLinkId: Int!) {\n    deleteLink(id: $deleteLinkId)\n  }\n": types.DeleteLinkDocument,
    "\n  mutation Post($description: String!, $url: String!) {\n    post(description: $description, url: $url)\n  }\n": types.PostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Links {\n    links {\n      id\n      url\n      description\n    }\n  }\n"): (typeof documents)["\n  query Links {\n    links {\n      id\n      url\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLink($deleteLinkId: Int!) {\n    deleteLink(id: $deleteLinkId)\n  }\n"): (typeof documents)["\n  mutation DeleteLink($deleteLinkId: Int!) {\n    deleteLink(id: $deleteLinkId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Post($description: String!, $url: String!) {\n    post(description: $description, url: $url)\n  }\n"): (typeof documents)["\n  mutation Post($description: String!, $url: String!) {\n    post(description: $description, url: $url)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;