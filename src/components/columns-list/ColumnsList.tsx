import ColumnContainer from '../column/ColumnContainer';
import { ColumnFullData } from '../../types/types';
import styles from './ColumnsList.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DragItemsType } from "../../drag'n'drop/dragTypes";
import { useState } from 'react';

type Props = {
  columns: [] | ColumnFullData[];
  children: React.ReactElement;
};

export default function ColumnsList({ columns, children }: Props) {
  const [isInteractiveElementsDisabled, setIsInteractiveElementsDisabled] = useState(true);

  const onClick = (e: React.MouseEvent) => {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA') {
        setIsInteractiveElementsDisabled(false);
        target.focus();
      } else {
        setIsInteractiveElementsDisabled(true);
        if (activeElement.tagName === 'TEXTAREA') {
          (activeElement as HTMLTextAreaElement).blur();
        }
      }
    }
  };

  return (
    <Droppable droppableId="columns" direction="horizontal" type={DragItemsType.COLUMN}>
      {(provided, snapshot) => (
        <div id="columns" className={styles.board_columns_wrap} data-width={'no_change'}>
          <ul className={styles.columns} ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column, index) => {
              return (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                  disableInteractiveElementBlocking={isInteractiveElementsDisabled}
                >
                  {(provided, snapshot) => {
                    return (
                      <li
                        onClick={onClick}
                        className={styles.column_wrap}
                        key={column.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ColumnContainer {...column} key={column.id} />
                      </li>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
          <div className={styles.column_wrap}>{children}</div>
        </div>
      )}
    </Droppable>
  );
}
