import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import createRootContainer from '../../utils/createRootContainer';
import MaskOverlay from '../mask-overlay/MaskOverlay';
import styles from './Loader.module.css';

export default function Loader() {
  const { t } = useTranslation();
  const rootContainer = createRootContainer('loading');

  useEffect(() => {
    document.body.append(rootContainer);
    return () => rootContainer.remove();
  });

  return ReactDOM.createPortal(
    <MaskOverlay>
      <div className={styles.loader}>
        <span className={styles.blob_1}></span>
        <span className={styles.blob_2}></span>
        <span className={styles.blob_3}></span>
        <span className={styles.text}>{t('loading')}</span>
      </div>
    </MaskOverlay>,
    rootContainer
  );
}
