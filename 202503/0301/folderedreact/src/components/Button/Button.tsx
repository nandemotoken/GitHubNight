import React from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid="button"
    >
      {loading ? <span className={styles.loader}>Loading...</span> : children}
    </button>
  );
};
