// src/Register.js

// register page which adds new user to database

import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import './styles/Login.css'; // Import the custom styles
import './styles/index.css'

export default function Register(){
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: ''
	});

	// stores the data from the input boxes on the frontend
	const {username, email, password} = formData;

	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleRegister = async (e) => {

		// verify login info
		e.preventDefault();

		if (!username || !email || !password){
			setErrorMessage('Please fill in all fields.');
			return;
		}

		try {
			// backend call that makes the new user
			const res = await axios.post('http://localhost:5000/register', {
				username,
				email,
				password
			});

			setErrorMessage('User Created');

			// redirect to login after 1 second
			setTimeout(() => {
					navigate('/login');
			}, 1000);
		} catch (err) {
			setErrorMessage("ERROR: "+err.response.data.msg);
		}
	};

	return (
		<div>
			<div className="login-form">
				<input type="text" placeholder="Username" name="username" value={username} onChange={handleChange} required/>
				<input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required/>
				<input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required/>
				<button id="login-button" onClick={handleRegister} type="submit">Submit</button>
			</div>
			{errorMessage && <p type="message">{errorMessage}</p>}
		</div>
	);
}