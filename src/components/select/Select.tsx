import styles from './Select.module.css';

type Props = {
  options: Array<string>;
};

export default function Select({ options }: Props) {
  return (
    <select className={styles.select} name="select">
      {options.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
