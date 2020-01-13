import React, { useEffect, useRef, useState } from 'react';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const node = useRef(null);
  const closeSearch = e => {
    e.preventDefault();
    setInputActive(false);
    setValue('');
  };
  useEffect(() => {
    const handleInputEvent = event => {
      const { keyCode } = event;
      if (keyCode === 13 && inputActive) {
        onFileSearch(value);
      } else if (keyCode === 27 && inputActive) {
        closeSearch(event);
      }
    };
    document.addEventListener('keyup', handleInputEvent);
    return () => {
      document.removeEventListener('keyup', handleInputEvent);
    };
  }, [inputActive, onFileSearch, value]);
  useEffect(() => {
    if (inputActive) node.current.focus();
  }, [inputActive]);
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      {!inputActive && (
        <>
          <span>{title}</span>
          <button
            onClick={() => setInputActive(true)}
            type="button"
            className="icon-button"
          >
            <FontAwesomeIcon size="lg" icon={faSearch} title="搜索" />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            onChange={e => setValue(e.target.value)}
            className="form-control"
            ref={node}
            value={value}
          />
          <button onClick={closeSearch} type="button" className="icon-button">
            <FontAwesomeIcon size="lg" icon={faTimes} title="关闭" />
          </button>
        </>
      )}
    </div>
  );
};

export default FileSearch;
