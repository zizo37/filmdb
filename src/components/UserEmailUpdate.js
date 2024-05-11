import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./UserUpdateEmail.module.css";

const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c"; // Replace with your actual Supabase anonymous key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UserUpdateEmail = () => {
  const [newEmail, setNewEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const navigate = useNavigate();

  const fetchUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user email:", error.message);
      } else {
        setOldEmail(data.user.email);
        console.log(data);
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
      const { error } = await supabase.auth.update({ email: newEmail });

      if (error) {
        console.error("Error updating email:", error.message);
      } else {
        console.log("Email updated successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error updating email:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.formLabel}>
            Ancien Email:
          </label>
          <input
            type="text"
            value={oldEmail}
            readOnly
            className={styles.formInput}
          />
          <label htmlFor="newEmail" className={styles.formLabel}>
            Nouvel Email:
          </label>
          <input
            type="email"
            name="newEmail"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className={styles.formInput}
          />
          <button type="submit" className={styles.submitButton}>
            Mettre à jour l'email
          </button>
        </form>
      </div>
      <br></br>
      <Footer />
    </>
  );
};

export default UserUpdateEmail;
