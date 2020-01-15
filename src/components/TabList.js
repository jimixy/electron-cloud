import './TabList.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills tabList-component">
      {files.map(file => {
        const widthUnsaveMark = unsaveIds.includes(file.id);
        const fClassName = classnames({
          'nav-link': true,
          active: file.id === activeId,
          widthUnsaved: widthUnsaveMark
        });
        return (
          <li className={fClassName} key={file.id}>
            <button onClick={() => onTabClick(file.id)} className="nav-link">
              {file.title}
              <span
                onClick={e => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
                className="ml-2 close-icon"
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
              {widthUnsaveMark && (
                <span className="rounded-circle unsaved-icon"></span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
};

TabList.defaultProps = {
  unsaveIds: []
};

export default TabList;
