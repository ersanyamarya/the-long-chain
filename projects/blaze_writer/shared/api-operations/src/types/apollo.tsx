import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  MongoID: { input: any; output: any; }
  RegExpAsString: { input: any; output: any; }
};

export type CreateManyRoleInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissions?: InputMaybe<RolePermissionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateManyRolePayload = {
  __typename?: 'CreateManyRolePayload';
  /** Number of created documents */
  createdCount: Scalars['Int']['output'];
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Documents IDs */
  recordIds: Array<Scalars['MongoID']['output']>;
  /** Created documents */
  records?: Maybe<Array<Role>>;
};

export type CreateOneRoleInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissions?: InputMaybe<RolePermissionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateOneRolePayload = {
  __typename?: 'CreateOneRolePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Created document */
  record?: Maybe<Role>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']['output']>;
};

export enum EnumSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum EnumTopicContentKind {
  Blog = 'blog',
  Post = 'post'
}

export enum EnumTopicKnowledgeBaseKind {
  Text = 'text',
  Webpage = 'webpage',
  Youtube = 'youtube'
}

export enum EnumTopicSortType {
  /** Sort by created at time */
  CreatedAt = 'CREATED_AT',
  /** Sort by name */
  Name = 'NAME',
  /** Sort by updated at time */
  UpdatedAt = 'UPDATED_AT'
}

export enum EnumWorkspaceSortType {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']['output']>;
};

export type FilterCountRoleInput = {
  AND?: InputMaybe<Array<FilterCountRoleInput>>;
  OR?: InputMaybe<Array<FilterCountRoleInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountRoleOperatorsInput>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<FilterCountRolePermissionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type FilterCountRoleNameOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountRoleOperatorsInput = {
  _id?: InputMaybe<FilterCountRole_IdOperatorsInput>;
  name?: InputMaybe<FilterCountRoleNameOperatorsInput>;
};

export type FilterCountRolePermissionsInput = {
  topic?: InputMaybe<FilterCountRolePermissionsTopicInput>;
  workspace?: InputMaybe<FilterCountRolePermissionsWorkspaceInput>;
};

export type FilterCountRolePermissionsTopicInput = {
  Create?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  Update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterCountRolePermissionsWorkspaceInput = {
  ChangeRole?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  InfoUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  MemberInvite?: InputMaybe<Scalars['Boolean']['input']>;
  MembersRemove?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterCountRole_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountUserDeleteRequestInput = {
  expiresAt?: InputMaybe<Scalars['Date']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type FilterCountUserEmailOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

export type FilterCountUserInput = {
  AND?: InputMaybe<Array<FilterCountUserInput>>;
  OR?: InputMaybe<Array<FilterCountUserInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountUserOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  deleteRequest?: InputMaybe<FilterCountUserDeleteRequestInput>;
  developer?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fireBaseAuthID?: InputMaybe<Scalars['String']['input']>;
  lastLogin?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quota?: InputMaybe<FilterCountUserQuotaInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountUserOperatorsInput = {
  _id?: InputMaybe<FilterCountUser_IdOperatorsInput>;
  email?: InputMaybe<FilterCountUserEmailOperatorsInput>;
};

export type FilterCountUserQuotaInput = {
  workspace?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterCountUser_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyRoleInput = {
  AND?: InputMaybe<Array<FilterFindManyRoleInput>>;
  OR?: InputMaybe<Array<FilterFindManyRoleInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyRoleOperatorsInput>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<FilterFindManyRolePermissionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type FilterFindManyRoleNameOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyRoleOperatorsInput = {
  _id?: InputMaybe<FilterFindManyRole_IdOperatorsInput>;
  name?: InputMaybe<FilterFindManyRoleNameOperatorsInput>;
};

export type FilterFindManyRolePermissionsInput = {
  topic?: InputMaybe<FilterFindManyRolePermissionsTopicInput>;
  workspace?: InputMaybe<FilterFindManyRolePermissionsWorkspaceInput>;
};

export type FilterFindManyRolePermissionsTopicInput = {
  Create?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  Update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterFindManyRolePermissionsWorkspaceInput = {
  ChangeRole?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  InfoUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  MemberInvite?: InputMaybe<Scalars['Boolean']['input']>;
  MembersRemove?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterFindManyRole_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyUserDeleteRequestInput = {
  expiresAt?: InputMaybe<Scalars['Date']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type FilterFindManyUserEmailOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

export type FilterFindManyUserInput = {
  AND?: InputMaybe<Array<FilterFindManyUserInput>>;
  OR?: InputMaybe<Array<FilterFindManyUserInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyUserOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  deleteRequest?: InputMaybe<FilterFindManyUserDeleteRequestInput>;
  developer?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fireBaseAuthID?: InputMaybe<Scalars['String']['input']>;
  lastLogin?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quota?: InputMaybe<FilterFindManyUserQuotaInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
  _id?: InputMaybe<FilterFindManyUser_IdOperatorsInput>;
  email?: InputMaybe<FilterFindManyUserEmailOperatorsInput>;
};

export type FilterFindManyUserQuotaInput = {
  workspace?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterFindManyUser_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type GroupWorkspacesType = {
  __typename?: 'GroupWorkspacesType';
  status?: Maybe<Scalars['String']['output']>;
  workspaces?: Maybe<Array<Maybe<Workspace>>>;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']['output']>;
  /** MongoDB error message */
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AdminRoleRemoveAll?: Maybe<Scalars['Boolean']['output']>;
  AdminTopicRemoveAll?: Maybe<Scalars['Boolean']['output']>;
  AdminUserRemoveAll?: Maybe<Scalars['Boolean']['output']>;
  AdminWorkspaceRemoveAll?: Maybe<Scalars['Boolean']['output']>;
  /** Creates Many documents with mongoose defaults, setters, hooks and validation */
  roleBatchCreate?: Maybe<CreateManyRolePayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  roleCreate?: Maybe<CreateOneRolePayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  roleDelete?: Maybe<RemoveByIdRolePayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  roleUpdate?: Maybe<UpdateByIdRolePayload>;
  /** This is a post login check for the user  */
  userPostLoginCheck?: Maybe<User>;
  workspaceCreate?: Maybe<Workspace>;
  workspaceInfoUpdate?: Maybe<Workspace>;
  workspaceKeyGenerated?: Maybe<Workspace>;
};


export type MutationRoleBatchCreateArgs = {
  records: Array<CreateManyRoleInput>;
};


export type MutationRoleCreateArgs = {
  record: CreateOneRoleInput;
};


export type MutationRoleDeleteArgs = {
  _id: Scalars['MongoID']['input'];
};


export type MutationRoleUpdateArgs = {
  _id: Scalars['MongoID']['input'];
  record: UpdateByIdRoleInput;
};


export type MutationWorkspaceCreateArgs = {
  name: Scalars['String']['input'];
};


export type MutationWorkspaceInfoUpdateArgs = {
  id: Scalars['MongoID']['input'];
  record?: InputMaybe<WorkspaceInput>;
};


export type MutationWorkspaceKeyGeneratedArgs = {
  id: Scalars['MongoID']['input'];
  keyGenerated: Scalars['Boolean']['input'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int']['output'];
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  itemCount?: Maybe<Scalars['Int']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  perPage: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  roleCount?: Maybe<Scalars['Int']['output']>;
  roleList: Array<Role>;
  rolePagination?: Maybe<RolePagination>;
  roleRead?: Maybe<Role>;
  /** This is a topic list */
  topicList?: Maybe<Array<Maybe<Topic>>>;
  /** This is a topic pagination */
  topicPagination?: Maybe<TopicPagination>;
  userCount?: Maybe<Scalars['Int']['output']>;
  userList: Array<User>;
  userPagination?: Maybe<UserPagination>;
  userRead?: Maybe<User>;
  workspaceGetOne?: Maybe<Workspace>;
  workspaceList?: Maybe<Array<Maybe<Workspace>>>;
  workspacePagination?: Maybe<WorkspacePaginationResponseType>;
};


export type QueryRoleCountArgs = {
  filter?: InputMaybe<FilterCountRoleInput>;
};


export type QueryRoleListArgs = {
  filter?: InputMaybe<FilterFindManyRoleInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyRoleInput>;
};


export type QueryRolePaginationArgs = {
  filter?: InputMaybe<FilterFindManyRoleInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyRoleInput>;
};


export type QueryRoleReadArgs = {
  _id: Scalars['MongoID']['input'];
};


export type QueryTopicListArgs = {
  searchString?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['MongoID']['input']>;
};


export type QueryTopicPaginationArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<EnumSortOrder>;
  sortType?: InputMaybe<EnumTopicSortType>;
  workspaceId?: InputMaybe<Scalars['MongoID']['input']>;
};


export type QueryUserCountArgs = {
  filter?: InputMaybe<FilterCountUserInput>;
};


export type QueryUserListArgs = {
  filter?: InputMaybe<FilterFindManyUserInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyUserInput>;
};


export type QueryUserPaginationArgs = {
  filter?: InputMaybe<FilterFindManyUserInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyUserInput>;
};


export type QueryUserReadArgs = {
  _id: Scalars['MongoID']['input'];
};


export type QueryWorkspaceGetOneArgs = {
  id: Scalars['MongoID']['input'];
};


export type QueryWorkspaceListArgs = {
  searchString?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<EnumWorkspaceSortType>;
  sortOrder?: InputMaybe<EnumSortOrder>;
};


export type QueryWorkspacePaginationArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<EnumWorkspaceSortType>;
  sortOrder?: InputMaybe<EnumSortOrder>;
};

export type RemoveByIdRolePayload = {
  __typename?: 'RemoveByIdRolePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Removed document */
  record?: Maybe<Role>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']['output']>;
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['MongoID']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<RolePermissions>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

/** List of items with pagination. */
export type RolePagination = {
  __typename?: 'RolePagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']['output']>;
  /** Array of objects. */
  items?: Maybe<Array<Role>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type RolePermissions = {
  __typename?: 'RolePermissions';
  topic?: Maybe<RolePermissionsTopic>;
  workspace?: Maybe<RolePermissionsWorkspace>;
};

export type RolePermissionsInput = {
  topic?: InputMaybe<RolePermissionsTopicInput>;
  workspace?: InputMaybe<RolePermissionsWorkspaceInput>;
};

export type RolePermissionsTopic = {
  __typename?: 'RolePermissionsTopic';
  Create?: Maybe<Scalars['Boolean']['output']>;
  Delete?: Maybe<Scalars['Boolean']['output']>;
  Update?: Maybe<Scalars['Boolean']['output']>;
};

export type RolePermissionsTopicInput = {
  Create?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  Update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RolePermissionsWorkspace = {
  __typename?: 'RolePermissionsWorkspace';
  ChangeRole?: Maybe<Scalars['Boolean']['output']>;
  Delete?: Maybe<Scalars['Boolean']['output']>;
  InfoUpdate?: Maybe<Scalars['Boolean']['output']>;
  MemberInvite?: Maybe<Scalars['Boolean']['output']>;
  MembersRemove?: Maybe<Scalars['Boolean']['output']>;
};

export type RolePermissionsWorkspaceInput = {
  ChangeRole?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  InfoUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  MemberInvite?: InputMaybe<Scalars['Boolean']['input']>;
  MembersRemove?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']['output']>;
};

export enum SortFindManyRoleInput {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyUserInput {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['MongoID']['output'];
  content?: Maybe<Array<Maybe<TopicContent>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  knowledgeBase?: Maybe<Array<Maybe<TopicKnowledgeBase>>>;
  name: Scalars['String']['output'];
  questions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  workspaceId?: Maybe<Scalars['MongoID']['output']>;
};

export type TopicContent = {
  __typename?: 'TopicContent';
  data: Scalars['String']['output'];
  kind: EnumTopicContentKind;
};

export type TopicKnowledgeBase = {
  __typename?: 'TopicKnowledgeBase';
  data: Scalars['String']['output'];
  kind: EnumTopicKnowledgeBaseKind;
  summary?: Maybe<Scalars['String']['output']>;
};

export type TopicPagination = {
  __typename?: 'TopicPagination';
  count: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  items?: Maybe<Array<Maybe<Topic>>>;
  pages: Scalars['Int']['output'];
};

export type UpdateByIdRoleInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UpdateByIdRolePermissionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateByIdRolePayload = {
  __typename?: 'UpdateByIdRolePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Updated document */
  record?: Maybe<Role>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']['output']>;
};

export type UpdateByIdRolePermissionsInput = {
  topic?: InputMaybe<UpdateByIdRolePermissionsTopicInput>;
  workspace?: InputMaybe<UpdateByIdRolePermissionsWorkspaceInput>;
};

export type UpdateByIdRolePermissionsTopicInput = {
  Create?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  Update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateByIdRolePermissionsWorkspaceInput = {
  ChangeRole?: InputMaybe<Scalars['Boolean']['input']>;
  Delete?: InputMaybe<Scalars['Boolean']['input']>;
  InfoUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  MemberInvite?: InputMaybe<Scalars['Boolean']['input']>;
  MembersRemove?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['MongoID']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  deleteRequest?: Maybe<UserDeleteRequest>;
  developer?: Maybe<Scalars['Boolean']['output']>;
  email: Scalars['String']['output'];
  fireBaseAuthID?: Maybe<Scalars['String']['output']>;
  lastLogin?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  quota?: Maybe<UserQuota>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type UserDeleteRequest = {
  __typename?: 'UserDeleteRequest';
  expiresAt?: Maybe<Scalars['Date']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

/** List of items with pagination. */
export type UserPagination = {
  __typename?: 'UserPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']['output']>;
  /** Array of objects. */
  items?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type UserQuota = {
  __typename?: 'UserQuota';
  workspace?: Maybe<Scalars['Float']['output']>;
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']['output']>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int']['output'];
  /** Validation error message */
  message?: Maybe<Scalars['String']['output']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']['output']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']['output']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  _id: Scalars['MongoID']['output'];
  allMembers?: Maybe<Array<Maybe<WorkspaceAllMembers>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  keyGenerated?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<Maybe<WorkspaceMembers>>>;
  myPermissions?: Maybe<Role>;
  name: Scalars['String']['output'];
  pictureUrl?: Maybe<Scalars['String']['output']>;
  quota?: Maybe<WorkspaceQuota>;
  quotaDetails?: Maybe<WorkspaceQuotaDetails>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type WorkspaceAllMembers = {
  __typename?: 'WorkspaceAllMembers';
  role?: Maybe<Role>;
  user?: Maybe<User>;
};

export type WorkspaceInput = {
  keyGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type WorkspaceMembers = {
  __typename?: 'WorkspaceMembers';
  role?: Maybe<Scalars['MongoID']['output']>;
  user?: Maybe<Scalars['MongoID']['output']>;
};

export type WorkspacePaginationResponseType = {
  __typename?: 'WorkspacePaginationResponseType';
  count?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  list?: Maybe<Array<Maybe<GroupWorkspacesType>>>;
  pages?: Maybe<Scalars['Int']['output']>;
};

export type WorkspaceQuota = {
  __typename?: 'WorkspaceQuota';
  members?: Maybe<Scalars['Float']['output']>;
  topics?: Maybe<Scalars['Float']['output']>;
};

export type WorkspaceQuotaDetails = {
  __typename?: 'WorkspaceQuotaDetails';
  members?: Maybe<WorkspaceQuotaInfo>;
  topics?: Maybe<WorkspaceQuotaInfo>;
};

export type WorkspaceQuotaInfo = {
  __typename?: 'WorkspaceQuotaInfo';
  remaining?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  used?: Maybe<Scalars['Int']['output']>;
};

export type UserPostLoginCheckMutationVariables = Exact<{ [key: string]: never; }>;


export type UserPostLoginCheckMutation = { __typename?: 'Mutation', userPostLoginCheck?: { __typename?: 'User', name: string, email: string, fireBaseAuthID?: string | null, lastLogin?: any | null, _id: any, createdAt?: any | null, updatedAt?: any | null, developer?: boolean | null, quota?: { __typename?: 'UserQuota', workspace?: number | null } | null, deleteRequest?: { __typename?: 'UserDeleteRequest', token?: string | null, expiresAt?: any | null, reason?: string | null } | null } | null };


export const UserPostLoginCheckDocument = gql`
    mutation UserPostLoginCheck {
  userPostLoginCheck {
    name
    email
    quota {
      workspace
    }
    fireBaseAuthID
    deleteRequest {
      token
      expiresAt
      reason
    }
    lastLogin
    _id
    createdAt
    updatedAt
    developer
  }
}
    `;
export type UserPostLoginCheckMutationFn = Apollo.MutationFunction<UserPostLoginCheckMutation, UserPostLoginCheckMutationVariables>;

/**
 * __useUserPostLoginCheckMutation__
 *
 * To run a mutation, you first call `useUserPostLoginCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPostLoginCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPostLoginCheckMutation, { data, loading, error }] = useUserPostLoginCheckMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserPostLoginCheckMutation(baseOptions?: Apollo.MutationHookOptions<UserPostLoginCheckMutation, UserPostLoginCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPostLoginCheckMutation, UserPostLoginCheckMutationVariables>(UserPostLoginCheckDocument, options);
      }
export type UserPostLoginCheckMutationHookResult = ReturnType<typeof useUserPostLoginCheckMutation>;
export type UserPostLoginCheckMutationResult = Apollo.MutationResult<UserPostLoginCheckMutation>;
export type UserPostLoginCheckMutationOptions = Apollo.BaseMutationOptions<UserPostLoginCheckMutation, UserPostLoginCheckMutationVariables>;