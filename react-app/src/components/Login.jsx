import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        const url = `${API_URL}/login`; // Ensure API_URL is correct
        const data = { username, password };
        
        axios.post(url, data)
            .then((res) => {
                // Successful login
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    navigate('/'); // Redirect to home on successful login
                } else {
                    // Handle any other message that might be considered a success but lacks a token
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                // Axios encapsulates server response errors in err.response
                if (err.response) {
                    // Server responded with a status code outside the 2xx range
                    alert(err.response.data.message);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    alert('SERVER ERR');
                }
            });
    };

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3>Welcome to Login Page</h3>
                <br />
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => setusername(e.target.value)} />
                <br />
                PASSWORD
                <input className="form-control" type="password" value={password}
                    onChange={(e) => setpassword(e.target.value)} />
                <br />
                <button className="btn btn-primary mr-3" onClick={handleApi}> LOGIN </button>
                <Link className="m-3" to="/signup">SIGNUP</Link>
            </div>
        </div>
    );
}

export default Login;
