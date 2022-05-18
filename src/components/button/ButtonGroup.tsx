import styles from './ButtonGroup.module.css';

type Props = {
  children: React.ReactElement[];
};

export default function ButtonGroup({ children }: Props) {
  return <div className={styles.buttons_block}>{children}</div>;
}
