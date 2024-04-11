import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from './Home'

const supabaseUrl = 'https://zirqugazjznsflpdokqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcnF1Z2F6anpuc2ZscGRva3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MzA3NDYsImV4cCI6MjAyNzEwNjc0Nn0.aT_Y7DPkFAAqe_SYzhALe7lx0n92rDXq5BYZdgi9Eok';
const supabase = createClient(supabaseUrl, supabaseKey);
  
export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div style={{width:'75vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Auth 
          supabaseClient={supabase} 
          appearance={{ theme: ThemeSupa }} 
          providers={['github', 'google']}
        />
    </div>)
  }
  else {
    return (
    <>
      <Home />
    </>)
  }
}