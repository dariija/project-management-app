import React from 'react';
import MaskOverlay from '../mask-overlay/MaskOverlay';
import styles from './Modal.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Modal({ children }: Props) {
  return (
    <MaskOverlay>
      <div className={styles.modal}>{children}</div>
    </MaskOverlay>
  );
}
