import React from "react";

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="w-screen h-screen flex justify-center bg-sky-900">
      {children}
    </div>
  );
}
