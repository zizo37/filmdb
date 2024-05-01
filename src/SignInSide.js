import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';


function SignInSide() {
  
  const supabase = createClient('https://ksnouxckabitqorjucgz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c');

  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
  
      if (error) {
        console.error('Error signing in with Google:', error.message);
      } else {
        console.log('User signed in successfully with Google:', user);
        console.log('Session details:', session);
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: data.get('email'),
        password: data.get('password'),
      });
  
      if (error) {
        console.error('Error signing in:', error.message);
      } else {
        console.log('User signed in successfully:', user);
        console.log('Session details:', session);
        navigate('/')
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '0 0 50%', backgroundImage: 'url(moviesbg.jpg)', backgroundRepeat: 'no-repeat', backgroundColor: '#f0f0f0', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ flex: '0 0 50%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <img src="filmdb.png" alt="logo" style={{width: '150px'}} />
          </div>
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
            <button onClick={handleGoogleSignIn} className="btn mb-3" style={{ backgroundColor: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>
              <img src="Google_logo.png" alt="Google Logo" style={{ marginRight: '10px', width:'25px' }} />Sign In with Google
            </button>
          </div>
          <p style={{ color:'white', marginBottom: '1rem' }}>or Sign in with email</p>
          <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
            <input type="email" name="email" placeholder="Email Address" required style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="password" name="password" placeholder="Password" required style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            <button type="submit" className="btn btn-warning mb-3" style={{ padding: '0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>Sign In</button>
          </form>
          <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}></div>
          <div style={{ fontSize: '0.8rem' }}>
            <span style={{ color: "white", fontWeight: 'bold' }}>Don't have an account? </span>
            <a href="/signup" style={{ color: 'white', textDecoration: 'underline', marginLeft: '0.5rem' }}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInSide;
