import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';

import React, { useEffect, useState } from 'react';
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';

import BottomBtn from './components/BottomBtn';
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import SimpleMDE from 'react-simplemde-editor';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);

  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID);
  });

  const activeFile = files.find(file => file.id === activeFileID);

  const fileClick = fileID => {
    setActiveFileID(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };

  const tabClick = fileID => {
    setActiveFileID(fileID);
  };

  const tabClose = id => {
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id);
    setOpenedFileIDs(tabsWithout);
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0]);
    } else {
      setActiveFileID('');
    }
  };

  const fileChange = (id, value) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.body = value;
      }
      return file;
    });
    setFiles(newFiles);
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };

  const deleteFile = id => {
    const newFiles = files.filter(file => file.id !== id);
    setFiles(newFiles);
    tabClose(id);
  };

  const updateFileName = (id, title) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = title;
      }
      return file;
    });
    setFiles(newFiles);
  };

  const fileSearch = keyword => {
    const newFiles = files.filter(file => file.title.includes(keyword));
    setFiles(newFiles);
  };

  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 left-panel px-0">
          <FileSearch title="我的文档" onFileSearch={fileSearch} />
          <FileList
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
            files={files}
          />
          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col-6">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {!activeFile ? (
            <div className="start-page">选择或者新的 Markdown 文档</div>
          ) : (
            <>
              <TabList
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
                files={openedFiles}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                options={{
                  minHeight: '515px'
                }}
                value={activeFile && activeFile.body}
                onChange={value => fileChange(activeFile.id, value)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
