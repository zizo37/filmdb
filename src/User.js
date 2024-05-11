// export default User;
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "./Header";
import "./UserStyle.css";
import Footer from "./Footer";
import Userrating from "./components/UserRating";
import UserWatchist from "./components/UserWatchlist";

// Initialize Supabase client outside of the component
const supabaseUrl = "https://ksnouxckabitqorjucgz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function User() {
  const [userData, setUserData] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setSession(data.session);
        setUserData(data.session.user);
        console.log(session);
        console.log(userData);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />

      <main>
        <section className="section-one">
          {session && session.user && (
            <div className="Credentials">
              <div>
                <img src={session.user.user_metadata.picture} alt="profile" />
                <h1 style={{ color: "white" }}>
                  {session.user.user_metadata.name}
                </h1>
                <p style={{ color: "white" }}>
                  FilmDB member since{" "}
                  {new Date(session.user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <ul>
                  <li>
                    <a href="/update-Password">Update Password</a>
                  </li>
                  <li>
                    <a href="/delete-account">Delete Account</a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <Userrating />
          <UserWatchist />
          <div className="Recommended">
            <h2 style={{ color: "gold" }}>Your Recommended</h2>
            <p style={{ color: "white" }}>Your recommended</p>
          </div>
          <div className="Reviews">
            <h2 style={{ color: "gold" }}>Your Reviews</h2>
            <p style={{ color: "white" }}>Your reviews</p>
          </div>
          <div className="RecentlyView">
            <h2 style={{ color: "gold" }}>Your Recently Taken Polls</h2>
            <p style={{ color: "white" }}>Your Recently Taken Polls</p>

            <p></p>
          </div>
        </section>
        <section className="section-two">
          <div className="setting"></div>
          <div className="quicklinks"></div>
          <div className="RatingAnalysse"></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;
