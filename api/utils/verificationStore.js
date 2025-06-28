const store = new Map();

/**
 * Save a verification code and user data temporarily.
 * @param {string} email
 * @param {string} code
 * @param {object} userData (e.g. { username, password, repeatpassword })
 */
export function saveVerificationCode(email, code, userData) {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  store.set(email, { code, expiresAt, userData });
}

/**
 * Retrieve stored verification entry by email.
 * @param {string} email
 * @returns {object|null}
 */
export function getVerificationData(email) {
  return store.get(email);
}

/**
 * Delete stored entry (after verification or expiry).
 * @param {string} email
 */
export function deleteVerificationCode(email) {
  store.delete(email);
}
