import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';

import BottomBtn from './components/BottomBtn';
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import React from 'react';
import defaultFiles from './utils/defaultFiles';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 left-panel">
          <FileSearch
            title="我的文档"
            onFileSearch={value => {
              console.log(value);
            }}
          />
          <FileList
            onFileClick={id => {
              console.log(id);
            }}
            onFileDelete={id => {
              console.log(id);
            }}
            onSaveEdit={(id, newValue) => {
              console.log(id, newValue);
            }}
            files={defaultFiles}
          />
          <div className="row no-gutters">
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
        <div className="col-6 bg-primary right-panel">this is the right</div>
      </div>
    </div>
  );
}

export default App;
