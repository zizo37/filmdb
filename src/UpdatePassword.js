import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const supabase = createClient('https://ksnouxckabitqorjucgz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match. Please try again.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Password updated successfully. You can now sign in');
      }
    } catch (error) {
      console.error('Error updating password:', error.message);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <img src="filmdb.png" alt="logo" style={{ width: '150px' }} />
        </div>
        <h2 style={{ marginBottom: '1rem' }}>Update Password</h2>
        {successMessage && <div className="alert alert-success my-3" role="alert" >{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger my-3" role="alert" >{errorMessage}</div>}
        <form onSubmit={handleUpdatePassword} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" className="btn btn-warning" style={{ padding: '0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
