const form = document.getElementById("registration-form");
const success = document.getElementById("success");

function validateField(name) {
  const input = form.elements[name];
  const message = validators[name](input.value);
  document.getElementById(`${name}-error`).textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

Object.keys(validators).forEach((name) => {
  form.elements[name].addEventListener("blur", () => validateField(name));
  form.elements[name].addEventListener("input", () => {
    if (form.elements[name].getAttribute("aria-invalid") === "true") validateField(name);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  success.hidden = true;

  const results = Object.keys(validators).map(validateField);
  const firstInvalid = Object.keys(validators).find((_, i) => !results[i]);

  if (firstInvalid) {
    form.elements[firstInvalid].focus();
    return;
  }

  // Replace with a real request to your backend.
  success.hidden = false;
  form.reset();
});
