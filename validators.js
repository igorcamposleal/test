const validators = {
  name(value) {
    const v = value.trim();
    if (!v) return "Name is required.";
    if (v.length < 2) return "Name must be at least 2 characters.";
    if (v.length > 100) return "Name must be at most 100 characters.";
    return "";
  },
  email(value) {
    const v = value.trim();
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
    return "";
  },
  password(value) {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter.";
    if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter.";
    if (!/\d/.test(value)) return "Password must contain a number.";
    return "";
  },
};

if (typeof module !== "undefined") module.exports = { validators };
