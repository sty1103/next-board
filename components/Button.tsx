import styles from '../styles/Button.module.scss';

interface ButtonProps {
  children: String;
  theme?: String;
  onClick: Function;
}

export default function Button({children, theme, onClick}: ButtonProps) {
  return (
    <button className={styles[`${theme ?? 'primary'}`]} onClick={() => onClick()}>
      {children}
    </button>
  )
}