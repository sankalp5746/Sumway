import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "lib", "users.json");

export interface UserRecord {
  role: "admin" | "vendor";
  email: string;
  passwordHash: string;
  passwordSalt: string;
  name: string;
  mobile: string;
  status: "active" | "pending" | "approved" | "rejected";
  createdAt: string;

  // Vendor category & docs
  vendorCategory?: "b2b" | "b2c";
  companyName?: string;
  gstCertificate?: string;
  msmeCertificate?: string;
  otherDocs?: string;
  addressProofType?: "aadhaar" | "voter_id" | "pan" | "other";
  addressProofFile?: string;

  // Bank details
  bankName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankAccountName?: string;
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function readUsers(): UserRecord[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
      return [];
    }
    const raw = fs.readFileSync(DB_PATH, "utf8").trim();
    if (!raw || raw.length === 0) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading users db:", error);
    return [];
  }
}

export function writeUsers(users: UserRecord[]) {
  try {
    const data = JSON.stringify(users, null, 2);
    // Write atomically: write to temp file first, then rename
    const tmpPath = DB_PATH + ".tmp";
    fs.writeFileSync(tmpPath, data, "utf8");
    fs.renameSync(tmpPath, DB_PATH);
  } catch (error) {
    console.error("Error writing users db:", error);
  }
}

export function findUserByEmail(email: string): UserRecord | null {
  const users = readUsers();
  const searchEmail = email.toLowerCase().trim();
  return users.find((u) => u.email.toLowerCase().trim() === searchEmail) || null;
}

export function createUser(user: Omit<UserRecord, "passwordHash" | "passwordSalt" | "createdAt"> & { password?: string }): UserRecord {
  const users = readUsers();
  const salt = generateSalt();
  const hash = user.password ? hashPassword(user.password, salt) : "";
  
  const newUser: UserRecord = {
    ...user,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
  };
  
  if ("password" in newUser) {
    delete (newUser as any).password;
  }

  // Ensure email is lowercase
  newUser.email = newUser.email.toLowerCase().trim();

  users.push(newUser);
  writeUsers(users);
  return newUser;
}
