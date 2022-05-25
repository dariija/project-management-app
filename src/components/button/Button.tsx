import styles from './Button.module.css';

export enum ButtonStyle {
  bin = 'bin',
  delete = 'delete',
  delete_by_hover_task = 'delete_by_hover_task',
  close = 'close',
  edit = 'edit',
  confirm_red = 'confirm_red',
  confirm_green = 'confirm_green',
  cancel_gray = 'cancel_gray',
  submit_auth_form = 'submit_auth_form',
  arrow_back = 'arrow_back',
}

type Props = {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  type: 'submit' | 'reset' | 'button';
  text?: string;
  style: string;
};

export default function Button({ onClick, type, style, text }: Props) {
  return (
    <button className={`${styles[style]}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
