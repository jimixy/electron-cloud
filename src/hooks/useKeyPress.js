import { useCallback, useEffect, useState } from 'react';

const useKeyPress = targetKeyCode => {
  const [keyPressed, setKeyPressed] = useState(false);

  const keyDownHandler = useCallback(
    ({ keyCode }) => {
      if (keyCode === targetKeyCode) {
        setKeyPressed(true);
      }
    },
    [targetKeyCode]
  );

  const keyUpHandler = useCallback(
    ({ keyCode }) => {
      if (keyCode === targetKeyCode) {
        setKeyPressed(false);
      }
    },
    [targetKeyCode]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyDownHandler, keyUpHandler]);

  return keyPressed;
};

export default useKeyPress;
