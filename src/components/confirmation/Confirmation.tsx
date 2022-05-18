import Button from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import styles from './Confirmation.module.css';
import warning from '../../assets/svg/warning.svg';

type Props = {
  cancelAction: () => void;
  confirmAction: () => void;
};

export default function Confirmation({ cancelAction, confirmAction }: Props) {
  return (
    <div className={styles.confirmation_wrapper}>
      <img className={styles.warning_img} src={warning} alt="warning image"></img>
      <p className={styles.text}>Are you sure?</p>
      <ButtonGroup>
        <Button onClick={confirmAction} type="button" text="Delete" colour="red" />
        <Button onClick={cancelAction} type="button" text="Cancel" colour="gray" />
      </ButtonGroup>
    </div>
  );
}
