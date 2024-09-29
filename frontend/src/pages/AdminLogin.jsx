import React, { useState } from 'react';
import './userlogin.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
//  const {authUser, setAuthUser} = useAuthContext();
    const navigate = useNavigate()
    const handleLogin =async (e) => {
        e.preventDefault();
        const data = { Username: username, Password: password };
        // Handle login logic here
        try{
        const response=await fetch('http://localhost:3000/admin/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        console.log(result);
       
        if(!response.ok){
            toast.error(result.error);
            return;
        }
        else{
            toast.success(result.message);
        }

       localStorage.setItem('authuser-chat', result.user);

       navigate('/admin/addmovie');
    }catch(error){
        console.log(error);
    }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="signup-link">
                <p>Not a Admin? <a href="/user/signup">Sign up</a></p>
            </div>
        </div>
    );
};

export default AdminLogin;
