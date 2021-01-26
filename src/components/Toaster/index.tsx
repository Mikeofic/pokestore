import React, { useEffect, useRef, useState, useContext } from 'react';
import { IoMdAlert } from 'react-icons/io';
import { AppContext } from '../../AppProvider';
import ToasterContainer from './style';

const Toaster: React.FC = () => {
  const { toastMessage, setToastMessage } = useContext(AppContext);
  const showTimeout = useRef<number | null>(null);
  const showContentTimeout = useRef<number | null>(null);
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (show) {
      if (showTimeout.current !== null) {
        clearTimeout(showTimeout.current);
      }
      setShowContent(true);
    } else {
      if (showTimeout.current !== null) {
        clearTimeout(showTimeout.current);
      }
      showTimeout.current = setTimeout(() => {
        setShowContent(false);
        setToastMessage('');
      }, 250);
    }

    return () => {
      if (showTimeout.current !== null) {
        clearTimeout(showTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (toastMessage.trim()) {
      if (showContentTimeout.current !== null) {
        clearTimeout(showContentTimeout.current);
      }
      setShow(true);

      showContentTimeout.current = setTimeout(() => {
        setShow(false);
      }, 4000);
    }

    return () => {
      if (showContentTimeout.current !== null) {
        clearTimeout(showContentTimeout.current);
      }
    };
  }, [toastMessage]);

  return (
    <ToasterContainer className={showContent ? '' : ' remove'}>
      <div className={`${show ? '' : ' hide'}${showContent ? ' show' : ''}`}>
        <IoMdAlert /> {toastMessage.trim()}
      </div>
    </ToasterContainer>
  );
};

export default Toaster;
