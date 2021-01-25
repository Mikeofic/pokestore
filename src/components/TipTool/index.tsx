import React, { useEffect, useRef, useState } from 'react';
import TipToolContainer, { TipToolProps } from './style';

interface ComponentProps extends TipToolProps {
  show?: boolean;
}

const TipTool: React.FC<ComponentProps> = ({ align, show, children }) => {
  const [showContent, setShowContent] = useState(false);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (show) {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
      setShowContent(true);
    } else {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        setShowContent(false);
      }, 250);
    }

    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <TipToolContainer align={align} className={showContent ? '' : ' remove'}>
      <div className={`${show ? '' : ' hide'}${showContent ? ' show' : ''}`}>
        {children}
      </div>
    </TipToolContainer>
  );
};

export default TipTool;
