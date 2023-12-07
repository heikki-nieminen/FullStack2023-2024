/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Link = {
  __typename?: 'Link';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteLink: Scalars['String']['output'];
  post: Scalars['String']['output'];
  updateLink: Scalars['String']['output'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPostArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationUpdateLinkArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  link?: Maybe<Link>;
  links: Array<Link>;
  tests: Array<Test>;
};


export type QueryLinkArgs = {
  id: Scalars['Int']['input'];
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['Int']['output'];
  test_text: Scalars['String']['output'];
};

export type LinksQueryVariables = Exact<{ [key: string]: never; }>;


export type LinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'Link', id: number, url: string, description: string }> };

export type DeleteLinkMutationVariables = Exact<{
  deleteLinkId: Scalars['Int']['input'];
}>;


export type DeleteLinkMutation = { __typename?: 'Mutation', deleteLink: string };

export type PostMutationVariables = Exact<{
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type PostMutation = { __typename?: 'Mutation', post: string };


export const LinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<LinksQuery, LinksQueryVariables>;
export const DeleteLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteLinkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteLinkId"}}}]}]}}]} as unknown as DocumentNode<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}]}}]} as unknown as DocumentNode<PostMutation, PostMutationVariables>;