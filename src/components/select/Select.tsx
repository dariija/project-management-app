import styles from './Select.module.css';

type Props = {
  options: Array<string>;
  selectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentLanguage: string;
};

export default function Select({ options, selectLanguage, currentLanguage }: Props) {
  return (
    <select
      className={styles.select}
      name="select"
      onChange={selectLanguage}
      defaultValue={currentLanguage}
    >
      {options.map((option) => {
        return (
          <option value={option.toLowerCase()} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
