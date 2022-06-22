/*
  게시판 백엔드
*/

import type { NextApiRequest, NextApiResponse } from 'next'
import dbconn from '../../utils/dbconn';
import Post from '../../models/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbconn();

  switch( req.method ) {
    case "POST":
      const num = await Post.find({});
      const data = {
        num: num.length + 1,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
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

// 글 리스트 페이징 조회
export async function getData() {
  const res = await fetch(`${process.env.API_URL}/api/board`);
  const data = await res.json();
  return data ? data:{};
}

// 글 하나 조회
export async function getDataOne(id: string) {
  const res = await fetch(`${process.env.API_URL}?id=${id}`);
  const data = await res.json();
  return data ? data:{};
}

interface InsertDataProps {
  title: string;
  author: string;
  content: string;
}

// 글 저장
export async function insertData(data: InsertDataProps) {
  const res = await fetch(`${process.env.API_URL}/api/board`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}