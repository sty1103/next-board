import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Write.module.scss';
import router from 'next/router';

const Write: NextPage = () => {
  const router = useRouter();
  const { all } = router.query;
  console.log( all );

  return (
    <section className="main">
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>작성자</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>내용</td>
            <td><div contenteditable="true"></div></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default Write;