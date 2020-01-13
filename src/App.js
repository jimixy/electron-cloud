import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FileSearch from './components/FileSearch';
import React from 'react';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 bg-danger left-panel">
          <FileSearch
            title="我的文档"
            onFileSearch={value => {
              console.log(value);
            }}
          />
        </div>
        <div className="col-6 bg-primary right-panel">this is the right</div>
      </div>
    </div>
  );
}

export default App;
