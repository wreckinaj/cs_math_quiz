"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { firestore, auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    if (isSignUp) {
      // If it's Sign Up, use createUserWithEmailAndPassword
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          setIsSignedIn(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      // If it's Sign In, use signInWithEmailAndPassword
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          setIsSignedIn(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };
  
  return (
    <div>
      {!isSignedIn ? (
        <div>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</button>

          <p>{isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome! You are signed in.</h2>
          <button onClick={() => auth.signOut().then(() => setIsSignedIn(false))}>Sign Out</button>
        </div>
      )}
    </div>
  );
}