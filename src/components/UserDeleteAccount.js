import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./UserDeleteAccount.module.css";

const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c"; // Replace with your actual Supabase anonymous key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UserDeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user email:", error.message);
      } else {
        setUser(data.user.email);
        console.log(user);
      }
    } catch (error) {
      console.error("Error fetching user email:", error.message);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!confirmationSent) {
        const { error } = await supabase.auth.sendPasswordRecoveryEmail({
          user,
        });

        if (error) {
          console.error("Error sending confirmation email:", error.message);
        } else {
          setConfirmationSent(true);
        }
      } else {
        // Delete the user's account
        const { error } = await supabase.auth.deleteUser(password);

        if (error) {
          console.error("Error deleting account:", error.message);
        } else {
          console.log("Account deleted successfully!");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        {!confirmationSent ? (
          <p>
            Are you sure you want to delete your account? A confirmation email
            will be sent to you. Please check your email and follow the
            instructions.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="password" className={styles.formLabel}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.formInput}
            />
            <button type="submit" className={styles.submitButton}>
              Delete Account
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDeleteAccount;
