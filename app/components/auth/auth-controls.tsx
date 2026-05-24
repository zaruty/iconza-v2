"use client";

import { GoogleIcon } from "../iconza-logo";

type GoogleButtonProps = {
  loading?: boolean;
  onClick: () => void;
};

export function GoogleButton({ loading, onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="btn-google auth-btn-full"
    >
      {loading ? (
        <span className="auth-spinner" aria-hidden />
      ) : (
        <GoogleIcon className="h-5 w-5 shrink-0" />
      )}
      <span>{loading ? "Conectando..." : "Continuar com Google"}</span>
    </button>
  );
}

type SubmitButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
};

export function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-outline-premium auth-btn-full auth-btn-primary"
    >
      {loading ? <span className="auth-spinner" aria-hidden /> : null}
      <span>{loading ? "Aguarde..." : children}</span>
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="auth-divider font-subtitle">
      <span>ou</span>
    </div>
  );
}

export function AuthMessage({
  type,
  children,
}: {
  type: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <p
      className={`auth-message auth-message--${type} font-subtitle`}
      role={type === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}

export function AuthFooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="auth-link font-subtitle">
      {children}
    </a>
  );
}
