import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "calc(100vh - 200px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px"
      }}
      className="w-10/12 mx-auto py-5"
    >
      {children}
    </div>
  );
}
