/**
 *
 * @param {String} phoneNumber Phone Number to validate
 * @return {Boolean}
 */
export const validatePhoneNumber = phoneNumber => {
  return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(phoneNumber);
};

/**
 *
 * @param {String} phoneNumber phoneNumber to convert
 * @return {String} Returns phoneNumber in format (XXX) XXX-XXXX
 */
export const normalizePhoneNumber = phoneNumber => {
  let normalizePhoneNum = phoneNumber.replace(/[\s()-]/g, '');
  if (normalizePhoneNum.length > 3) {
    normalizePhoneNum = `(${normalizePhoneNum.slice(0, 3)}) ${normalizePhoneNum.slice(3)}`;
  }

  if (normalizePhoneNum.length > 9) {
    normalizePhoneNum = `${normalizePhoneNum.slice(0, 9)}-${normalizePhoneNum.slice(9)}`;
  }
  return normalizePhoneNum;
};

export default { validatePhoneNumber, normalizePhoneNumber };
