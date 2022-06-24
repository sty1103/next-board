import styles from '../styles/Button.module.scss';

interface ButtonProps {
  children: String;
  theme?: String;
  onClick: Function;
}

export default function Button({children, theme='primary', onClick}: ButtonProps) {
  return (
    <button className={`btn ${styles[`${theme}`]}`} onClick={() => onClick()}>
      {children}
    </button>
  )
}