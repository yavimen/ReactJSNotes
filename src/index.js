import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddNoteWindow from './Components/AddNoteWindow/AddNoteWindow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/AddNote" element={<AddNoteWindow/>}/>
    </Routes>
</Router>
);

