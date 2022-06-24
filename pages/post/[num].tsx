import { NextPageContext } from 'next';
import { getDataOne } from '../api/board';
import styles from '@/styles/Details.module.scss';
import Button from '@/components/Button';
import router from 'next/router';

interface DetailsProps {
  data: {
    _id: string;
    num: number;
    title: string;
    content: string;
    author: string;
    date: string;
  }
}

export default function Details({ data }: DetailsProps) {
  const { num, title, author, content } = data;
  return (
    <section className="main">
      <div className={styles.wrapper}>
        <Button onClick={() => router.push(`/post/write/${num}`)}>
          수정하기
        </Button>

        <table className={`table ${styles.table}`}>
          <tbody>
            <tr>
              <td>제목</td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>{author}</td>
            </tr>
            <tr>
              <td>내용</td>
              <td dangerouslySetInnerHTML={{__html: content}}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const data = await getDataOne( context.query.num as string );
  return { props: { data } };
}