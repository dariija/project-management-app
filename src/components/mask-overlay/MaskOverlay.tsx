import styles from './MaskOverlay.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function MaskOverlay({ children }: Props) {
  return <div className={styles.overlay}>{children}</div>;
}
