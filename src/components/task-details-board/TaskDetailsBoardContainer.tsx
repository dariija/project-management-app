import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Button, { ButtonStyle } from '../button/Button';
import { EditableTextArea } from '../editable-text-area/EditableTextArea';
import TaskDetailsBoardItem from './TaskDetailsBoardItem';
import styles from './TaskDetailsBoard.module.css';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  editTask: (newTitle: string, newDescription: string) => void;
  id: string;
};

export default function TaskDetailsBoardContainer({
  isOpen,
  title,
  description,
  editTask,
  id,
}: Props) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const taskDetailsBoard = useRef(document.getElementById('task_details_board')).current;
  const taskDetailsBoardInner = useRef(document.createElement('div')).current;
  taskDetailsBoardInner.classList.add(`${styles.task_details_board_inner}`);
  const columns = document.getElementById('columns');

  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const [titleValidationError, setTitleValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] = useState(false);
  useEffect(() => {
    const click = (e: Event) => {
      const dataAttr = e
        .composedPath()
        .find((el) => (el as HTMLElement).dataset?.taskId) as HTMLElement;

      if (descriptionValidationError || titleValidationError) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        if (!dataAttr) {
          e.preventDefault();
          e.stopPropagation();
        }

        if (dataAttr && dataAttr.dataset.taskId !== id) {
          editTask(titleRef.current?.value || title, descriptionRef.current?.value || description);
          taskDetailsBoardInner.remove();
        } else if (dataAttr) {
          return true;
        } else {
          closeBoard();
          taskDetailsBoardInner.remove();
        }
      }
    };

    const mousedown = (e: Event) => {
      if (descriptionValidationError || titleValidationError) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    if (isOpen && taskDetailsBoard) {
      taskDetailsBoard.append(taskDetailsBoardInner);
      openBoard();
      columns?.addEventListener('click', click);
      columns?.addEventListener('mousedown', mousedown);
    } else {
      columns?.removeEventListener('click', click);
      columns?.removeEventListener('mousedown', mousedown);
    }

    return () => {
      columns?.removeEventListener('click', click);
      columns?.removeEventListener('mousedown', mousedown);
    };
  }, [isOpen, descriptionValidationError, titleValidationError]);

  const openBoard = () => {
    taskDetailsBoard?.classList.add(`${styles.show_board}`);
    setTimeout(() => (columns!.dataset.width = 'change'), 500);
  };

  const closeBoard = () => {
    editTask(titleRef.current?.value || title, descriptionRef.current?.value || description);
    taskDetailsBoardInner.remove();
    if (columns?.dataset.width) {
      columns.dataset.width = 'no_change';
    }
    taskDetailsBoard?.classList.remove(`${styles.show_board}`);
  };

  const closeBoardEvent = (e: React.MouseEvent) => {
    if (descriptionValidationError || titleValidationError) {
      e.preventDefault();
      e.stopPropagation();
    } else closeBoard();
  };

  useEffect(() => {
    descriptionRef.current?.focus();
  }, [descriptionValidationError]);

  useEffect(() => {
    titleRef.current?.focus();
  }, [titleValidationError]);

  return isOpen
    ? ReactDOM.createPortal(
        <>
          <Button onClick={closeBoardEvent} type="button" style={ButtonStyle.arrow_back} />
          <TaskDetailsBoardItem error={titleValidationError} errorText="Provide title!">
            <EditableTextArea
              text={title}
              ref={titleRef}
              setErrorTrue={() => setTitleValidationError(true)}
              setErrorFalse={() => setTitleValidationError(false)}
              setEditableOn={() => setIsTitleEditable(true)}
              setEditableOff={() => setIsTitleEditable(false)}
              maxLength={120}
            />
          </TaskDetailsBoardItem>

          <TaskDetailsBoardItem
            error={descriptionValidationError}
            errorText="Provide description!"
            labelText="Description"
          >
            <EditableTextArea
              text={description}
              ref={descriptionRef}
              setErrorTrue={() => setDescriptionValidationError(true)}
              setErrorFalse={() => setDescriptionValidationError(false)}
              setEditableOn={() => setIsDescriptionEditable(true)}
              setEditableOff={() => setIsDescriptionEditable(false)}
              maxLength={300}
            />
          </TaskDetailsBoardItem>
        </>,
        taskDetailsBoardInner
      )
    : null;
}