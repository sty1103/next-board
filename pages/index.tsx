import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { getData } from './api/board';
import Button from '../components/Button';
import Link from 'next/link';
import router from 'next/router';

interface IPost {
  num: Number;
  title: String;
  author: String;
  date: String;
}

interface HomeProps {
  data: IPost[]
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <section className={styles.main}>
      <Head>
        <title>게시판 테스트</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap" rel="stylesheet"></link>
      </Head>

      <div className={styles.wrapper}>
        <Button onClick={()=>router.push('/post/write')}>
          글쓰기
        </Button>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => {
              return (
                <tr key={index} data_id={post.num.toString()} onClick={() => onRowClick(event)}>
                  <td>{post.num.toString()}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )

  function onRowClick(e) {
    const data_id = e.target.parentElement.getAttribute('data_id');
  }
}

export default Home;

export async function getServerSideProps() {
  const data = await getData();
  return { props: { data } };
}