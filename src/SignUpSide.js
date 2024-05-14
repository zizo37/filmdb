import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const supabase = createClient('https://ksnouxckabitqorjucgz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password should be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            },
            {
                data: { 
                  username: firstName+'.'+lastName
                }
              }
            );

            if (error) {
                console.error('Error signing up:', error.message);
                setErrorMessage(error.message);
            } else {
                console.log('User signed up successfully:', user);
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: '0 0 50%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <img src="filmdb.png" alt="logo" style={{ width: '150px' }} />
                    </div>
                    <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
                        <input type="text" name="firstName" placeholder="First Name" required style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <input type="text" name="lastName" placeholder="Last Name" required style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <input type="email" name="email" placeholder="Email Address" required style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <input type="password" name="password" placeholder="Password" required style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" required style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        
                        <button type="submit" className="btn btn-warning mb-3" style={{ padding: '0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem' }}>Sign Up</button>
                        {errorMessage && <div className="alert alert-danger my-3" role="alert" >{errorMessage}</div>}
                    </form>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        <span style={{ color: "white", fontWeight: 'bold' }}>Already have an account? </span>
                        <a href="/signin" style={{ color: 'white', textDecoration: 'underline', marginLeft: '0.5rem' }}>Sign in</a>
                    </div>
                </div>
            </div>
            <div style={{ flex: '0 0 50%', backgroundImage: 'url(moviesbg.jpg)', backgroundRepeat: 'no-repeat', backgroundColor: '#f0f0f0', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
    );
}

export default SignUp;
