import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';

import React, { useState } from 'react';
import {
  faFileImport,
  faPlus,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import { flattenArr, objToArr } from './utils/helper';

import BottomBtn from './components/BottomBtn';
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import SimpleMDE from 'react-simplemde-editor';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';
import fileHelper from './utils/fileHelper';
import uuidv4 from 'uuid';

const { join } = window.require('path');
const { remote } = window.require('electron');
const Store = window.require('electron-store');
const fileStore = new Store({
  name: 'Files Data'
});

const saveFilesToStore = files => {
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createdAt } = file;
    result[id] = {
      id,
      path,
      title,
      createdAt
    };
    return result;
  }, {});
  fileStore.set('files', filesStoreObj);
};

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {});
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);

  const savedLocation = remote.app.getPath('documents');
  // const savedLocation2 = remote.app.getPath('userData');
  // console.log(savedLocation2);

  const filesArr = objToArr(files);

  const fileClick = async fileID => {
    setActiveFileID(fileID);
    const currentFile = files[fileID];
    if (!currentFile.isLoaded) {
      const value = await fileHelper.readFile(currentFile.path);
      const newFile = {
        ...files[fileID],
        body: value,
        isLoaded: true
      };
      setFiles({
        ...files,
        [fileID]: newFile
      });
    }
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
    const newFiles = {
      ...files[id],
      body: value
    };
    setFiles({
      ...files,
      [id]: newFiles
    });
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };

  const deleteFile = async id => {
    if (files[id].isNew) {
      const { [id]: value, ...afterDelete } = files;
      // 赋值新对象，实现组件重新渲染
      setFiles(afterDelete);
      return;
    }
    await fileHelper.deleteFile(files[id].path);
    const { [id]: value, ...afterDelete } = files;
    setFiles(afterDelete);
    saveFilesToStore(afterDelete);
    tabClose(id);
  };

  const updateFileName = async (id, title, isNew) => {
    const newPath = join(savedLocation, `${title}.md`);
    const modifiedFile = {
      ...files[id],
      title,
      isNew: false,
      path: newPath
    };
    const newFiles = {
      ...files,
      [id]: modifiedFile
    };
    if (isNew) {
      await fileHelper.writeFile(newPath, files[id].body);
    } else {
      const oldPath = join(savedLocation, `${files[id].title}.md`);
      await fileHelper.renameFile(oldPath, newPath);
    }
    setFiles(newFiles);
    saveFilesToStore(newFiles);
  };

  const fileSearch = keyword => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword));
    setSearchedFiles(newFiles);
  };

  const activeFile = files[activeFileID];
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID];
  });
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr;

  const createNewFile = () => {
    const newID = uuidv4();
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输出 Markdown',
      createAt: new Date().getTime(),
      isNew: true
    };
    setFiles({
      ...files,
      [newID]: newFile
    });
  };

  const saveCurrentFile = async () => {
    await fileHelper.writeFile(
      join(savedLocation, `${activeFile.title}.md`),
      activeFile.body
    );
    setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id));
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
            files={fileListArr}
          />
          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                onBtnClick={createNewFile}
                icon={faPlus}
              />
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
              <BottomBtn
                text="点击保存"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={saveCurrentFile}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
