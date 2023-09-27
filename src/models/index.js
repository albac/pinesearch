// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PostLikes, Post } = initSchema(schema);

export {
  PostLikes,
  Post
};