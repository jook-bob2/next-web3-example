import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div style={{ padding: 24 }}>
      <header>
        <h1 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 18 }}>
          Explore Web3
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
