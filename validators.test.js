const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { validators } = require("./validators.js");

describe("name", () => {
  it("rejects empty and whitespace-only values", () => {
    assert.equal(validators.name(""), "Name is required.");
    assert.equal(validators.name("   "), "Name is required.");
  });

  it("rejects names shorter than 2 characters", () => {
    assert.equal(validators.name("A"), "Name must be at least 2 characters.");
    assert.equal(validators.name(" A "), "Name must be at least 2 characters.");
  });

  it("rejects names longer than 100 characters", () => {
    assert.equal(validators.name("a".repeat(101)), "Name must be at most 100 characters.");
  });

  it("accepts valid names, including boundaries", () => {
    assert.equal(validators.name("Al"), "");
    assert.equal(validators.name("a".repeat(100)), "");
    assert.equal(validators.name("José da Silva"), "");
  });
});

describe("email", () => {
  it("rejects empty values", () => {
    assert.equal(validators.email(""), "Email is required.");
    assert.equal(validators.email("  "), "Email is required.");
  });

  it("rejects malformed addresses", () => {
    for (const bad of ["plain", "a@b", "@b.com", "a@.com", "a b@c.com", "a@b@c.com"]) {
      assert.equal(validators.email(bad), "Enter a valid email address.", bad);
    }
  });

  it("accepts valid addresses and trims whitespace", () => {
    assert.equal(validators.email("user@example.com"), "");
    assert.equal(validators.email("first.last+tag@sub.example.org"), "");
    assert.equal(validators.email("  user@example.com  "), "");
  });
});

describe("password", () => {
  it("rejects empty values", () => {
    assert.equal(validators.password(""), "Password is required.");
  });

  it("rejects passwords shorter than 8 characters", () => {
    assert.equal(validators.password("Abc123"), "Password must be at least 8 characters.");
  });

  it("requires a lowercase letter", () => {
    assert.equal(validators.password("ABCDEFG1"), "Password must contain a lowercase letter.");
  });

  it("requires an uppercase letter", () => {
    assert.equal(validators.password("abcdefg1"), "Password must contain an uppercase letter.");
  });

  it("requires a number", () => {
    assert.equal(validators.password("Abcdefgh"), "Password must contain a number.");
  });

  it("accepts a valid password", () => {
    assert.equal(validators.password("Abcdefg1"), "");
    assert.equal(validators.password("Str0ng passphrase!"), "");
  });

  it("does not trim whitespace", () => {
    assert.equal(validators.password("        "), "Password must contain a lowercase letter.");
  });
});
