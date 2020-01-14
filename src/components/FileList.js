import React, { useEffect, useRef, useState } from 'react';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState('');
  const closeSearch = e => {
    e.preventDefault();
    setEditStatus(false);
    setValue('');
  };
  useEffect(() => {
    const handleInputEvent = event => {
      const { keyCode } = event;
      if (keyCode === 13 && editStatus) {
        const editItem = files.find(file => file.id === editStatus);
        onSaveEdit(editItem.id, value);
      } else if (keyCode === 27 && editStatus) {
        closeSearch(event);
      }
    };
    document.addEventListener('keyup', handleInputEvent);
    return () => {
      document.removeEventListener('keyup', handleInputEvent);
    };
  }, [editStatus, files, onSaveEdit, value]);
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => (
        <li
          className="list-group-item bg-light row d-flex align-items-center"
          key={file.id}
        >
          {file.id !== editStatus ? (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} title="搜索" />
              </span>
              <span
                className="col-8 c-link"
                onClick={() => onFileClick(file.id)}
              >
                {file.title}
              </span>
              <button
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
                type="button"
                className="icon-button col-1"
              >
                <FontAwesomeIcon size="lg" icon={faEdit} title="编辑" />
              </button>
              <button
                onClick={() => onFileDelete(file.id)}
                type="button"
                className="icon-button col-1"
              >
                <FontAwesomeIcon size="lg" icon={faTrash} title="删除" />
              </button>
            </>
          ) : (
            <>
              <input
                onChange={e => setValue(e.target.value)}
                className="form-control col-10"
                value={value}
              />
              <button
                onClick={closeSearch}
                type="button"
                className="icon-button col-2"
              >
                <FontAwesomeIcon size="lg" icon={faTimes} title="关闭" />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onFileDelete: PropTypes.func
};

export default FileList;
