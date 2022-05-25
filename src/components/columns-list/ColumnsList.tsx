import ColumnContainer from '../column/ColumnContainer';
import { ColumnFullData } from '../../types/types';

import styles from './ColumnsList.module.css';

type Props = {
  columns: [] | ColumnFullData[];
  children: React.ReactElement;
};

export default function ColumnsList({ columns, children }: Props) {
  return (
    <ul id="columns" className={styles.columns} data-width={'no_change'}>
      {columns.map((column) => {
        return (
          <li className={styles.column_wrap} key={column.id}>
            <ColumnContainer {...column} key={column.id} />
          </li>
        );
      })}
      <li className={styles.column_wrap}>{children}</li>
    </ul>
  );
}
