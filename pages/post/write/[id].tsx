import styles from '@/styles/Detail.module.scss';

interface DetailProps {
  title: string;
  author: string;
  content: string;
}

export default function Detail({ title, author, content }: DetailProps) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>123</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}