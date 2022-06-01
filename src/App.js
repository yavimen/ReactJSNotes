import React, {useState} from 'react';
import './App.css';
import Initialization from './Components/Initialization/Initialization';
import Registration from './Components/Registration/Registration';
import axios from 'axios';
import AddNoteWindow from './Components/AddNoteWindow/AddNoteWindow';
function App() {
  const [loginModal, setLoginModal] = useState(true);
  const [logupModal, setLogupModal] = useState(false);
  const [login, setLogin] = useState("");

  const [dataget, setDataGet] = useState(true);
  const [noteList, setNoteList] = useState(null);

  const [addWinVisible, setAddWinVisible] = useState(false);
  async function Data() {
    if (login !== '') {
      const responce = await axios.get('https://localhost:5001/notes/' + login);
      dataget ? setNoteList(responce.data.data) : console.log();
      setDataGet(false);
      console.log(noteList);
    }
  }
  Data();
  async function DeleteNote(id)
  {
    await axios.delete('https://localhost:5001/notes/'+id).then((responce)=>{
    setNoteList(responce.data.data.filter(item=>item.owner===login));
    console.log("My deleted list"+responce.data.data );
  });
  }
  function LogOut() {
    setLogin("");
    setLoginModal(true);
    setNoteList(null);
    setDataGet(true);
  }
  return (
    <div className="App">
      <button className='btn btn-dark btn-lg btn-block' onClick={LogOut}>Log Out</button>
      <Initialization visible={loginModal} setVisible={setLoginModal} setLogup={setLogupModal} setLogin={setLogin} />
      <Registration visible={logupModal} setVisible={setLogupModal} setLoginMod={setLoginModal} setLogin={setLogin} />
      <div className="container myMainImageContainer">
        <img src="https://ih1.redbubble.net/image.3420945420.1382/dc,1000x1000,queen,bed.jpg"
          alt="cat" className="rounded myMainImage"></img>
      </div>
      <div className="container text-center">
        <table className="table table-dark table-striped table-bordered" id="tdtable">
          <tbody>
            <tr>
              <th>
                Title
              </th>
              <th>
                Description
              </th>
              <th>
                Deadline
              </th>
              <th>
                <button type="button" className="btn btn-outline-light btn-sm btn-block" 
                onClick={()=>setAddWinVisible(true)}>Add new task</button>
              </th>
            </tr>
            {
              noteList?.map((note) =>
              <tr key={note.id}>
                <th>
                  {note.title}
                </th>
                <th>
                  {note.description}
                </th>
                <th>
                  {note.deadline}
                </th>
                <th>
                  <button type="button" onClick={()=>DeleteNote(note.id)} className="btn btn-outline-light btn-sm btn-block">Delete</button>
                </th>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      <AddNoteWindow visible={addWinVisible} setVisible={setAddWinVisible} setNotes={setNoteList} login={login}/>
    </div>
  );
}

export default App;
