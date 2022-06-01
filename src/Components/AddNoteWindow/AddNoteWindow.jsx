import React from "react"
import axios from 'axios';
import "./AddNoteWindow.css"


const AddNoteWindow = ({visible, setVisible, setNotes, login}) => {
    const rootClass = ['modal'];
    if(visible)
        rootClass.push('active')
    async function AddNote() {
        if(document.getElementById("addtitle").value==="")
        {
            alert("Get me title of note!")
        }
        else if(document.getElementById("adddescription").value==="")
        {
            alert("Get me description of note!")
        }
        else {
            const note = new FormData();
            note.append("id", null);
            note.append("title", document.getElementById("addtitle").value);
            note.append("description", document.getElementById("adddescription").value);
            note.append("deadline", document.getElementById("adddeadlined").value+"/"+
            document.getElementById("adddeadlinet").value);
            note.append("owner", login);
            console.log(note);
            const responce = await axios.post('https://localhost:5001/notes/', note,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((responce)=>{setNotes(responce.data.data.filter(item=>item.owner === login))});
            console.log(responce);
            if(responce.data?.success === false)
                alert(responce.data.message);
            document.getElementById("addtitle").value="";
            document.getElementById("adddescription").value="";
            document.getElementById("adddeadlined").value="";
            document.getElementById("adddeadlinet").value = "";
        }
    }
    return (
        <div className={rootClass.join(' ')}>
            <div className='modalContent'>
                <div className="container">
                    <h2>New task</h2>
                    <form action="/action_page.php">
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" className="form-control" id="addtitle" placeholder="Title..." name="title" />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text" className="form-control" id="adddescription" placeholder="Description..." name="description" />
                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <input type="date" className="form-control" id="adddeadlined" name="deadline" />
                            <input type="time" className="form-control" id="adddeadlinet" name="deadline" />
                        </div>
                    </form>
                </div>
                <div className="button-container">
                    <button className="btn btn-primary" onClick={AddNote}>Add</button>
                    <button className="btn btn-primary" onClick={()=>setVisible(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteWindow