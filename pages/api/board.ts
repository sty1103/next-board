import type { NextApiRequest, NextApiResponse } from 'next'
import dbconn from '../../utils/dbconn';
import Post from '../../models/post';
import dotenv from 'dotenv';

dotenv.config();
dbconn();

export default async function handler1(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch( req.method ) {
    case "POST":
      const num = await Post.find({});
      const data = {
        num: num.length + 1,
        title: 'title test',
        content: 'content test',
        author: 'jaynull'
      };

      Post.create(data);
      break;

    case "DELETE":
    case "PATCH":
    case "GET":
      let result = {};

      if ( req.query.range ) {
        
      } else {
        result = await Post.find({}).sort({'_id': -1});
      }

      res.status(200).json(result);
      break;
  }
}

export async function getData() {
  const res = await fetch(`${process.env.API_URL}/api/board`);
  const data = await res.json();
  return data ? data:{};
}

export async function getDataOne(id: string) {
  const res = await fetch(`${process.env.API_URL}?id=${id}`);
  const data = await res.json();
  return data ? data:{};
}