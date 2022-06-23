import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import createRootContainer from '../../utils/createRootContainer';
import styles from './Notification.module.css';

type Props = {
  text: string;
};

export default function Notification({ text }: Props) {
  const rootContainer = useRef(createRootContainer('notification')).current;
  rootContainer.className = `${styles.notification}`;

  useEffect(() => {
    const listener = (e: TransitionEvent) => {
      (e.target as HTMLDivElement).classList.contains(`${styles.show}`)
        ? setTimeout(() => rootContainer.classList.remove(`${styles.show}`), 4000)
        : rootContainer.remove();
    };
    rootContainer.addEventListener('transitionend', listener);
    document.body.append(rootContainer);
    setTimeout(() => rootContainer.classList.add(`${styles.show}`), 50);

    return () => {
      rootContainer.remove();
      rootContainer.removeEventListener('transitionend', listener);
    };
  }, []);

  return ReactDOM.createPortal(text, rootContainer);
}
