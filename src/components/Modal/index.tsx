import React, { useEffect, useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import ModalContainer, { Background } from './style';

interface ModalProps {
  showModal: boolean;
  onClosing?(): void;
  afterClosing?(): void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClosing,
  afterClosing,
  children,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollIsHidden, setScrollIsHidden] = useState(false);

  useEffect(() => {
    if (showModal) {
      if (hasLoaded === false) {
        setHasLoaded(true);
      }

      setShowContent(true);
      setTimeout(() => {
        document.body.style.overflow = 'hidden'; // hide body scroll
        setScrollIsHidden(true);
      }, 350);
    } else {
      document.body.style.overflow = ''; // show body scroll
      if (hasLoaded) {
        if (onClosing) onClosing();
      }
      setHasLoaded(false);
      setScrollIsHidden(false);
      setTimeout(() => {
        setShowContent(false);
        if (hasLoaded) {
          if (afterClosing) afterClosing();
        }
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    if (scrollIsHidden) {
      history.push(location.pathname);
    }
  }, [history, location.pathname, scrollIsHidden]);

  return (
    <ModalContainer className={showContent ? '' : ' remove'}>
      <div
        className={`${showModal ? '' : ' hide'}${showContent ? ' show' : ''}`}
      >
        {showContent && (
          <>
            <Background onClick={handleCloseModal} />
            <div className="modal">{children}</div>
            <button
              aria-label="Close Modal"
              className="close"
              type="button"
              onClick={handleCloseModal}
            >
              <FiX size={35} />
            </button>
          </>
        )}
      </div>
    </ModalContainer>
  );
};

export default Modal;
