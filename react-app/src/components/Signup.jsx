import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Signup() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');

   
    function handleApi() {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Mobile number validation regex (assuming only numbers, 10 digits)
        const mobileRegex = /^\d{10}$/;
    
        // Check if any of the inputs are empty
        if (!username || !password || !email || !mobile) {
            alert('Please fill in all fields.');
            return; // Stop the function from proceeding further
        }
    
        // Validate email format
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return; // Stop the function from proceeding if the email is invalid
        }
    
        // Validate mobile format
        if (!mobileRegex.test(mobile)) {
            alert('Mobile number must be 10 digits.');
            return; // Stop the function from proceeding if the mobile number is invalid
        }
    
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    }
    

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3>Welcome to Signup Page</h3>
                <br />
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => setusername(e.target.value)} required />
                <br />
                MOBILE
                <input className="form-control" type="tel" value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                    title="Phone number must match international, national, or local formats."
                    required />
                <br />
                EMAIL
                <input className="form-control" type="email" value={email}
                    onChange={(e) => setemail(e.target.value)} required />
                <br />
                PASSWORD
                <input className="form-control" type="password" value={password}
                    onChange={(e) => setpassword(e.target.value)} required />
                <br />
                <button className="btn btn-primary mr-3" onClick={handleApi}>SIGNUP</button>
                <Link className="m-3" to="/login">LOGIN</Link>
            </div>
        </div>
    );
}

export default Signup;
