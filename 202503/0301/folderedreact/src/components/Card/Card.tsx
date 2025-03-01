import React from "react";
import styles from "./Card.module.css";

export type CardProps = {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div className={styles.card} data-testid="card">
      {title && (
        <div className={styles.header} data-testid="card-header">
          {title}
        </div>
      )}
      <div className={styles.content} data-testid="card-content">
        {children}
      </div>
      {footer && (
        <div className={styles.footer} data-testid="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};
