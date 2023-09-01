"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function NavBar() {
  const { sessionId } = useAuth();
  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm">
      <div className="flex gap-10 items-center">
        <Image src="/logo.png" alt="logo" width={120} height={60} />
        {sessionId && (
          <div className="hidden md:flex gap-6">
            <h2>Home</h2>
            <h2>History</h2>
            <h2>Help</h2>
          </div>
        )}
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default NavBar;
