import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import createRootContainer from '../../utils/createRootContainer';
import Modal from './Modal';

type Props = {
  isOpen: boolean;
  children: React.ReactNode | React.ReactNode[];
};

export default function ModalContainer({ isOpen, children }: Props) {
  const rootContainer = useRef(createRootContainer('modal')).current;

  useEffect(() => () => rootContainer.remove(), []);
  useEffect(() => {
    isOpen ? document.body.append(rootContainer) : rootContainer.remove();
  }, [isOpen]);

  return ReactDOM.createPortal(<Modal>{children}</Modal>, rootContainer);
}
