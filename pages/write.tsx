import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Write.module.scss';
import router from 'next/router';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

interface InputValue {
  title?: string;
}

const Write: NextPage = () => {
  const [inputValue, setInputValue] = useState<InputValue>({});
  const { title }: InputValue = inputValue;

  return (
    <section className={styles.main}>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <InputField
                type="text"
                value={inputValue.title ?? ''}
                placeholder="제목을 입력해 주세요"
                name="title"
                onChange={onInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>내용</td>
            <td><div contentEditable="true"></div></td>
          </tr>
        </tbody>
      </table>

      <Button onClick={onSave}>
        저장하기
      </Button>
    </section>
  )

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputValue(({
      ...inputValue,
      [name]: value,
    }));
  };

  function onSave() {
    console.log('on save clicked..')
  }
}

export default Write;