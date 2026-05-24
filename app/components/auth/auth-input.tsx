import { forwardRef } from "react";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ label, error, id, className = "", ...props }, ref) {
    const inputId = id ?? props.name;

    return (
      <div className="auth-field">
        <label htmlFor={inputId} className="auth-field__label font-subtitle">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`auth-input font-subtitle ${error ? "auth-input--error" : ""} ${className}`}
          {...props}
        />
        {error ? <p className="auth-field__error">{error}</p> : null}
      </div>
    );
  },
);
