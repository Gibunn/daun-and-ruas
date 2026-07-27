import * as bcrypt from "bcrypt";
import { SALT_ROUND } from "./constants";

export async function hashPassword(plainPassword: string) {
  return await bcrypt.hash(plainPassword, SALT_ROUND);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
