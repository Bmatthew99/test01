// Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; // Добавляем стили
import LoginAnimation from "./LoginAnimation";
import SecondAnimation from "./SecondAnimation"; // Импорт второй анимации


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLogin(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <div className="login-container">
      

      {/* Форма входа */}
      <div className="login-box">
      <LoginAnimation />
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Увійти</button>
         
        </form>
        <SecondAnimation />
        <SecondAnimation />
        </div>
        
      
    </div>
  );
}


export default Login;
