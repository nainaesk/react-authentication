import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordInput.module.css"; // Importing the CSS module

function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={styles.passwordWrapper}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputIcon}>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className={styles.input}
                />
                <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    );
}

export default PasswordInput;
