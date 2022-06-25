import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.scss';
import { getData } from './api/board';
import Button from '@/components/Button';
import Link from 'next/link';
import router from 'next/router';
import React, { useState, useEffect } from 'react';

interface IPost {
  num: Number;
  title: String;
  author: String;
  date: String;
}

interface HomeProps {
  data: {
    rows: IPost[];
    total: number;
  }
}

interface PageInfo {
  current: number; // 현재 페이지
  prev: number; // 이전 페이지 범위
  next: number; // 다음 페이지 범위
  limit: number; // 한 페이지에서 가져올 데이터 수
  range: number; // 한 범위의 페이지 갯수
  total: number; // 한 페이지 그룹의 총 글 개수
}

const initPageInfo = { current: 1, prev: 0, next: 0, limit: 3, range: 5, total: 0 };

const Home: NextPage = () => {
  const [ rows, setRows ] = useState<IPost[]>([]);
  const [ pageInfo, setPageInfo ] = useState<PageInfo>(initPageInfo);

  useEffect(() => {
    const getRowsData = async () => {
      const data = await getData(1, initPageInfo.limit, initPageInfo.range);

      setRows(data.rows);
      setPageInfo((prev)=>({
        ...prev,
        next: pageInfo.range + 1,
        total: data.total
      }));
    }

    getRowsData();
  }, [])

  return (
    <section className="main">
      <div className={styles.wrapper}>
        <Button onClick={()=>router.push('/post/write')}>
          글쓰기
        </Button>
        
        <table className={`table ${styles.table}`}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((post, index) => {
              return (
                <tr key={index} data-num={post.num.toString()} onClick={onRowClick}>
                  <td>{post.num.toString()}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {(() => {
            if ( pageInfo.prev > 0 )
              return <span onClick={onPrevClick}>{"<"}</span>;
          })()}
          
          {(() => {
            let paging = [];
            let next = pageInfo.next ? pageInfo.next:pageInfo.range+1;
            let start = next - pageInfo.range;
            let loop = Math.ceil(pageInfo.total/pageInfo.limit);
            
            for( let i=0; i<loop; i++ ) {
              const num = start + i;
              paging.push(<a key={num} onClick={()=>onPageClick(num)}>{num}</a>);
            }
            
            return paging;
          })()}

          {(() => {
            if ( Math.ceil(pageInfo.total/pageInfo.limit) == pageInfo.range )
              return <span onClick={onNextClick}>{">"}</span>
          })()}
        </div>
      </div>
    </section>
  )

  function onRowClick(e: React.MouseEvent<HTMLTableRowElement>) {
    const target = e.target as Element;

    if ( target.parentElement )
      router.push(`/post/${target.parentElement.dataset.num}` );
  }

  async function onPrevClick() {
    onPageClick(pageInfo.prev);
    setPageInfo((previousData) => ({
      ...previousData,
      prev: pageInfo.prev==1 ? 0:pageInfo.prev - pageInfo.range,
      next: pageInfo.next - pageInfo.range
    }));
  }

  function onNextClick() {
    onPageClick(pageInfo.next);
    setPageInfo((previousData) => ({
      ...previousData,
      prev: pageInfo.prev==0 ? 1:pageInfo.prev + pageInfo.range,
      next: pageInfo.next + pageInfo.range
    }));
  }

  async function onPageClick(page: number) {
    const data = await getData(page, pageInfo.limit, pageInfo.range);
    
    setRows(data.rows);
    setPageInfo((prev)=>({
      ...prev,
      current: page,
      total: data.total
    }));
  }
}

export default Home;