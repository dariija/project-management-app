import Button, { ButtonStyle } from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import styles from './Confirmation.module.css';
import warning from '../../assets/svg/warning.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  cancelAction: () => void;
  confirmAction: () => void;
};

export default function Confirmation({ cancelAction, confirmAction }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.confirmation_wrapper}>
      <img className={styles.warning_img} src={warning} alt="warning image"></img>
      <p className={styles.text}>{t('are_you_sure')}</p>
      <ButtonGroup>
        <Button
          onClick={confirmAction}
          type="button"
          text={t('delete')}
          style={ButtonStyle.confirm_red}
        />
        <Button
          onClick={cancelAction}
          type="button"
          text={t('cancel')}
          style={ButtonStyle.cancel_gray}
        />
      </ButtonGroup>
    </div>
  );
}
