import React from "react";
import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | Sumway Global Secure Portal",
  description: "Secure corporate gateway login for Sumway Global Clients, Candidates, Vendors and Administrators."
};

export default function LoginPage() {
  return <LoginClient />;
}
