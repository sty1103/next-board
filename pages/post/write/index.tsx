import { NextPage } from 'next';
import { useRouter } from 'next/router';
import router from 'next/router';
import { useState } from 'react';
import styles from '@/styles/Write.module.scss';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import ContentEditable from '@/components/ContentEditable';
import { insertData } from '../../api/board';

interface InputValue {
  title: string;
  author: string;
  content: string;
}

const Write: NextPage = () => {
  const [inputValue, setInputValue] = useState<InputValue>({
    title: '', author: '', content: ''
  });

  return (
    <section className={`main ${styles.main}`}>
      <div className={`wrapper ${styles.wrapper}`}>
        <table className="table">
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
              <td>
                <InputField
                    type="text"
                    value={inputValue.author ?? ''}
                    placeholder="작성자를 입력해 주세요"
                    name="author"
                    onChange={onInputChange}
                  />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <ContentEditable
                  name='content'
                  value={inputValue.content ?? ''}
                  onChange={onInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Button onClick={onSave}>
          저장하기
        </Button>
      </div>
    </section>
  )

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.dataset.name ?? e.target.name;
    const value = name==='content' ? e.target.innerHTML:e.target.value;

    setInputValue(({
      ...inputValue,
      [name]: value,
    }));
  };

  function onSave() {
    
    await insertData( inputValue );
  }
}

export default Write;