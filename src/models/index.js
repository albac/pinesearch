// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PostComments, PostLikes, Post, Comment } = initSchema(schema);

export {
  PostComments,
  PostLikes,
  Post,
  Comment
};