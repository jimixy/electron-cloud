import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';

import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';

import BottomBtn from './components/BottomBtn';
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TabList from './components/TabList';
import defaultFiles from './utils/defaultFiles';

function App() {
  const handleChange = value => {
    console.log('value', value);
  };
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 left-panel">
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
        <div className="col-9 right-panel">
          <TabList
            activeId="1"
            unsaveIds={['1', '2']}
            onTabClick={id => console.log(id)}
            onCloseTab={id => console.log(id)}
            files={defaultFiles}
          />
          <SimpleMDE
            options={{
              minHeight: '515px'
            }}
            value={defaultFiles[1].body}
            onChange={handleChange}
          />
          ;
        </div>
      </div>
    </div>
  );
}

export default App;
