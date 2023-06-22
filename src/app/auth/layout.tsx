import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "calc(100vh - 200px)"
      }}
      className="w-10/12 mx-auto py-5 flex justify-center items-center mt-7"
    >
      {children}
    </div>
  );
}
