import styles from './NavigationItemsGroup.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};
export default function NavigationItemsGroup({ children }: Props) {
  return <div className={styles.group}>{children}</div>;
}
