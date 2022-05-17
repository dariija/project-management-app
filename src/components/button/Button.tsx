import styles from './Button.module.css';

type Props = {
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  colour?: string;
  text?: string;
};

export default function Button({ onClick, type, colour, text }: Props) {
  return (
    <button
      className={`${styles.button} ${colour ? styles[colour] : ''}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
