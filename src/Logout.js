import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";


const Logout = () => {
  const supabaseUrl = 'https://zirqugazjznsflpdokqn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcnF1Z2F6anpuc2ZscGRva3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MzA3NDYsImV4cCI6MjAyNzEwNjc0Nn0.aT_Y7DPkFAAqe_SYzhALe7lx0n92rDXq5BYZdgi9Eok';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('User logged out');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="logout-container">
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button> 
    </div>
  );
};

export default Logout;
