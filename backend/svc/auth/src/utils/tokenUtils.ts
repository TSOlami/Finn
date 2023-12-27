import jwt from "jsonwebtoken";

export function generateToken(object: Object, options?: jwt.SignOptions | undefined) {
	const privateKey = process.env.JWT_PRIVATE_KEY as string;
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyToken(token: string) {
  try {
		const publicKey = process.env.JWT_PUBLIC_KEY as string;
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}