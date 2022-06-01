import React from "react"
import axios from 'axios';
import "./Initialization.css"


const Initialization = ({visible, setVisible, setLogup, setLogin}) => {
    async function fetchUsers()
    {
        if(document.getElementById("tlogin").value === '' ||document.getElementById("description").value === '')
        {
            alert("Please, fill up the fields!");
        }
        else{
            var login = document.getElementById("tlogin").value;
            const responce = await axios.get('https://localhost:5001/'+login);
            console.log(responce.data?.data);
            if(responce.data.data === null)
                alert(responce.data.message);
            else if(responce.data.data.password!==document.getElementById("description").value)
                alert("Password is wrong")
            else{
                /*alert('Hello '+responce.data.data.login);*/
                setVisible(false);
                setLogin(login);
                document.getElementById("tlogin").value = '';
                document.getElementById("description").value = '';
            }
        }
    }
    const rootClass = ['modal'];
    if(visible)
        rootClass.push('active')
        return(
            <div className={rootClass.join(' ')}>
                <div className='modalContent'>
                <h2>LogIn</h2><hr />
                <form>
                    <div className="form-group">
                        <label htmlFor="tlogin">Login</label>
                        <input required type="text" className="form-control" id="tlogin" placeholder="login..." name="tlogin"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Password</label>
                        <input type="password" className="form-control" id="description" placeholder="password..."/>
                    </div> 
                    <hr />   
                </form> 
                <div className="button-container">
                    <button className="btn btn-primary" onClick={()=>fetchUsers()}>Confirm</button>
                    <button className="btn btn-primary" onClick={()=>{setVisible(false); setLogup(true)}}>LogUp</button>
                </div>
                </div>
            </div>
    );
};

export default Initialization