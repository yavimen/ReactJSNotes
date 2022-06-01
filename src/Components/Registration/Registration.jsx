import React from "react"
import axios from 'axios';
import "./Registration.css"


function Registration({ visible, setVisible, setLoginMod, setLogin}) {
    const rootClass = ['modal'];
    async function ConfirmRegistration() {
        if (document.getElementById("email-field").value === '')
            alert("Fill up email");
        else if (document.getElementById("email-field").value.includes("@gmail.com") === false)
            alert("Email must contain '@gmail.com'");
        else if (document.getElementById("login-field").value.length < 5)
            alert("Login must contain greater than 4 symbols");
        else if (document.getElementById("password-field").value.length < 6)
            alert("Password must contain greater than 5 symbols");
        else if (document.getElementById("password-field").value !== document.getElementById("repeat-password-field").value)
            alert("Passwords are not equal");
        else{
            const responce = await axios.get('https://localhost:5001/'+document.getElementById("login-field").value);
            console.log(responce.data)
            if(responce.data.data!==null)
                alert("User with this login is already registered");
            else
            {
                const person = new FormData();
                person.append("id", null);
                person.append("email", document.getElementById("email-field").value);
                person.append("login", document.getElementById("login-field").value);
                person.append("password", document.getElementById("password-field").value);
                person.append("userPermission", "User");
                console.log(person);
                const responce = await axios.post('https://localhost:5001/', person, 
                {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                console.log(responce);
                setVisible(false);
                setLogin(document.getElementById("login-field").value);
            }
        }
    }
    function ToLogIn() {
        setVisible(false);
        setLoginMod(true);
    }
    if (visible)
        rootClass.push('active');
    return (
        <div className={rootClass.join(' ')}>
            <div className='modalContent'>
                <h2>LogUp</h2><hr />
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" id="email-field" placeholder="example@gmail.com..."/>
                    </div>
                    <div className="form-group">
                        <label>Login</label>
                        <input type="text" className="form-control" id="login-field" placeholder="login..."/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password-field" placeholder="password..."/>
                    </div>
                    <div className="form-group">
                        <label>Repeat Password</label>
                        <input type="password" className="form-control" id="repeat-password-field" placeholder="password..."/>
                    </div>
                </form>
                <hr />
                <div className="button-container">
                    <button className="btn btn-primary" onClick={() => ConfirmRegistration()}>Confirm</button>
                    <button className="btn btn-primary" onClick={ToLogIn}>LogIn</button>
                </div>
            </div>
        </div>
    );
}

export default Registration
