import React, { useCallback, useEffect, useRef, useState } from 'react';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const node = useRef(null);
  const closeSearch = useCallback(() => {
    setInputActive(false);
    setValue('');
    onFileSearch('');
  }, [onFileSearch]);
  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  }, [inputActive, enterPressed, escPressed, value, closeSearch, onFileSearch]);
  useEffect(() => {
    if (inputActive) node.current.focus();
  }, [inputActive]);
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
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

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
};

FileSearch.defaultProps = {
  title: '我的云文档'
};

export default FileSearch;
