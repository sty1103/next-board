/*
  게시판 백엔드
*/

import type { NextApiRequest, NextApiResponse } from 'next'
import dbconn from '../../utils/dbconn';
import Post from '../../models/post';

interface GetDataResultTypes {
  total: number;
  rows: {
    _id: string;
    num: number;
    title: string;
    content: string;
    author: string;
    date: string;
  }[]
}

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
      if ( req.query.num ) { // 하나만 조회
        let result = await Post.findOne({num: req.query.num});
        res.status(200).json(result);
      } else { // 리스트 조회
        let result: GetDataResultTypes = { rows:[], total:0 };
        const page = parseInt(req.query.page as string);
        const range = parseInt(req.query.range as string);
        const limit = parseInt(req.query.limit as string);

        const skip = Math.floor( (page-1) / range ) * (limit * range);
        const total = await Post
          .find({})
          .limit(limit * range)
          .skip(skip)
          .count();
        
        const rows = await Post
          .find({})
          .limit(limit)
          .skip( (page-1) * limit)
          .sort({'_id': -1});
        
        result= { total, rows }
        res.status(200).json(result);
      }
      break;
  }
}

// 글 리스트 페이징 조회
export async function getData(page: number, limit: number, range: number) {
  const res = await fetch(`${process.env.API_URL}/api/board?page=${page}&limit=${limit}&range=${range}`);
  const data = await res.json();
  return data ? data:{};
}

// 글 하나 조회
export async function getDataOne(num: string) {
  const res = await fetch(`${process.env.API_URL}/api/board?num=${num}`);
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