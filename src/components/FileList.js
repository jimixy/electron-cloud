import React, { useCallback, useEffect, useState } from 'react';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import useKeyPress from '../hooks/useKeyPress';

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const closeSearch = useCallback(
    editItem => {
      setEditStatus(false);
      setValue('');
      console.log('editItem', editItem);
      if (editItem && editItem.isNew) {
        onFileDelete(editItem.id);
      }
    },
    [onFileDelete]
  );
  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue('');
    } else if (escPressed && editStatus) {
      closeSearch(editItem);
    }
  }, [
    editStatus,
    files,
    onSaveEdit,
    enterPressed,
    escPressed,
    value,
    closeSearch
  ]);
  useEffect(() => {
    const newFile = files.find(file => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => (
        <li
          className="list-group-item bg-light row d-flex align-items-center mx-0"
          key={file.id}
        >
          {file.id !== editStatus && !file.isNew ? (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} title="搜索" />
              </span>
              <span
                className="col-6 c-link"
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
                className="icon-button col-2"
              >
                <FontAwesomeIcon size="lg" icon={faEdit} title="编辑" />
              </button>
              <button
                onClick={() => onFileDelete(file.id)}
                type="button"
                className="icon-button col-2"
              >
                <FontAwesomeIcon size="lg" icon={faTrash} title="删除" />
              </button>
            </>
          ) : (
            <>
              <input
                onChange={e => setValue(e.target.value)}
                placeholder="请输入文件名称"
                className="form-control col-10"
                value={value}
              />
              <button
                onClick={() => closeSearch(file)}
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
