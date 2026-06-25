import React from "react";
import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register | Sumway Global Secure Portal",
  description: "Secure corporate gateway registration for Sumway Global Clients, Candidates and Vendors."
};

export default function RegisterPage() {
  return <RegisterClient />;
}
