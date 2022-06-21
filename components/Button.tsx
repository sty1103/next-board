import styles from '../styles/Button.module.scss';

interface ButtonProps {
  theme?: String;
  onClick: Function;
}

export default function Button({children, theme, onClick}: ButtonProps) {
  return (
    <button className={theme ?? 'primary'} onClick={() => onClick()}>
      {children}
    </button>
  )
}