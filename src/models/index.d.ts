import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPostLikes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostLikes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly s3url?: string | null;
  readonly users_likes: (string | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPostLikes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostLikes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly s3url?: string | null;
  readonly users_likes: (string | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PostLikes = LazyLoading extends LazyLoadingDisabled ? EagerPostLikes : LazyPostLikes

export declare const PostLikes: (new (init: ModelInit<PostLikes>) => PostLikes) & {
  copyOf(source: PostLikes, mutator: (draft: MutableModel<PostLikes>) => MutableModel<PostLikes> | void): PostLikes;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly s3url?: string | null;
  readonly title?: string | null;
  readonly summary?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly s3url?: string | null;
  readonly title?: string | null;
  readonly summary?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}