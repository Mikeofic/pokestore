import React, { useEffect, useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import ModalContainer, { Background } from './style';

interface ModalProps {
  showModal: boolean;
  previousPath: string;
}

const Modal: React.FC<ModalProps> = ({ showModal, previousPath, children }) => {
  const [showContent, setShowContent] = useState(false);
  const [scrollIsHidden, setScrollIsHidden] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (showModal) {
      setShowContent(true);
      setTimeout(() => {
        document.body.style.overflow = 'hidden'; // hide body scroll
        setScrollIsHidden(true);
      }, 350);
    } else {
      document.body.style.overflow = ''; // show body scroll
      setScrollIsHidden(false);
      setTimeout(() => {
        setShowContent(false);
      }, 350);
    }
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    if (scrollIsHidden) {
      if (previousPath === location.pathname) {
        history.goBack();
      } else {
        history.push(location.pathname);
      }
    }
  }, [history, location.pathname, previousPath, scrollIsHidden]);

  return (
    <ModalContainer className={showContent ? '' : ' remove'}>
      <div
        className={`${showModal ? '' : ' hide'}${showContent ? ' show' : ''}`}
      >
        {showContent && (
          <>
            <Background onClick={handleCloseModal} />
            <div className="modal">{children}</div>
            <button className="close" type="button" onClick={handleCloseModal}>
              <FiX size={35} />
            </button>
          </>
        )}
      </div>
    </ModalContainer>
  );
};

export default Modal;
