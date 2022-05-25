import { useState, useRef, useEffect } from 'react';
import Button, { ButtonStyle } from '../button/Button';
import { EditableTextArea } from '../editable-text-area/EditableTextArea';
import ColumnHeader from './ColumnHeader';

type Props = {
  title: string;
  deleteColumn: (e: React.MouseEvent) => void;
  editColumnTitle: (newTitle: string) => void;
};

export default function ColumnHeaderContainer({ title, deleteColumn, editColumnTitle }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditable && titleRef.current?.value) editColumnTitle(titleRef.current?.value || title);
    else if (!isEditable && !titleRef.current?.value) {
      titleRef.current!.value = title;
      titleRef!.current!.style.height = `${titleRef.current!.scrollHeight}px`;
    }
  }, [isEditable]);

  return (
    <ColumnHeader>
      <EditableTextArea
        text={title}
        ref={titleRef}
        setEditableOn={() => setIsEditable(true)}
        setEditableOff={() => setIsEditable(false)}
        maxLength={120}
      />

      <Button
        onClick={(e: React.MouseEvent) => deleteColumn(e)}
        type="button"
        style={ButtonStyle.delete}
      />
    </ColumnHeader>
  );
}
