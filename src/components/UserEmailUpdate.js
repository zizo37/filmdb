import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const UserUpdateEmail = () => {
  const [NewEmail, setEmail] = useState(null);
  const [OldEmail, setOldEmail] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.updateUser({
        email: NewEmail,
      });

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setEmail(NewEmail);
        setOldEmail(data);
        console.log(data);
        console.log(NewEmail);
      }
    };

    fetchUserData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="email"> Old Email:</label>
        <p>{OldEmail}</p>
        <label htmlFor="email"> New Email:</label>
        <input type="email" name="email" id="email" />
        <button type="submit">Update Email</button>
      </form>
    </div>
  );
};

export default UserUpdateEmail;
