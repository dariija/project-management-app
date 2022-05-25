import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './EditableTextArea.module.css';

type Props = {
  text: string;
  setEditableOn?: () => void;
  setEditableOff?: () => void;
  setErrorTrue?: () => void;
  setErrorFalse?: () => void;
  maxLength: number;
};

export const EditableTextArea = React.forwardRef(function EditableTextArea(
  { text, setEditableOn, setEditableOff, setErrorTrue, setErrorFalse, maxLength }: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = Math.max(textAreaRef.current.scrollHeight, 28) + 'px';
    }
  }, []);

  const onChange = function (e: ChangeEvent) {
    const target = e.target as HTMLTextAreaElement;
    textAreaRef!.current!.style.height = '28px';
    textAreaRef!.current!.style.height = `${target.scrollHeight}px`;

    if (textAreaRef.current?.value === '') setErrorTrue?.();
    else setErrorFalse?.();
  };

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        textAreaRef.current?.blur();
      }
    };
    textAreaRef.current?.addEventListener('keypress', keyListener);

    return () => textAreaRef.current?.removeEventListener('keypress', keyListener);
  }, []);

  return (
    <textarea
      className={styles.textarea}
      ref={(element: HTMLTextAreaElement) => {
        (textAreaRef as MutableRefObject<HTMLTextAreaElement>).current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else {
          ref!.current = element;
        }
      }}
      onChange={onChange}
      onFocus={setEditableOn}
      onBlur={setEditableOff}
      spellCheck={false}
      defaultValue={text}
      maxLength={maxLength}
    ></textarea>
  );
});
