//error: khong phai loi nghiep vu => lỗi kĩ thuật
let ErrFirstNamePattern = new Error("first_name must only contain letters");
let ErrFirstNameEmpty = new Error("first_name is required");
let ErrLastNamePattern = new Error("last_name must only contain letters");
let ErrLastNameEmpty = new Error("last_name is required");
let ErrEmailInvalid = new Error("Email must be a valid email address");
let ErrEmailEmpty = new Error("Email is required");
let ErrPasswordPattern = new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
let ErrPasswordMin = new Error("Password must be at least 6 characters long");
let ErrPasswordEmpty = new Error("Password is required");
let ErrPhoneEmpty = new Error("Phone is required");
let ErrPhoneStartWith = new Error("Phone must start with 0");
let ErrPhoneLength = new Error("Phone must be 10 characters long");
let ErrPhonePattern = new Error("Phone must only contain numbers");
let ErrAddressEmpty = new Error("Address is required");
let ErrAddressPattern = new Error("Address doesn't contain special characters");
let ErrIdentificationCardEmpty = new Error("Identification Card is required");
let ErrIdentificationCardPattern = new Error("Identification Card must only contain numbers");
let ErrIdentificationCardLength = new Error("Identification Card must be 12 characters long");
let ErrStatusPattern = new Error("Status must be ACTIVE or INACTIVE");

let ErrorBrandNameEmpty = new Error("Name is required");
let ErrorLogoEmpty = new Error("Logo is required");

export {
  ErrFirstNamePattern,
  ErrFirstNameEmpty,
  ErrLastNamePattern,
  ErrLastNameEmpty,
  ErrEmailInvalid,
  ErrEmailEmpty,
  ErrPasswordPattern,
  ErrPasswordMin,
  ErrPasswordEmpty,
  ErrPhoneEmpty,
  ErrPhoneStartWith,
  ErrPhoneLength,
  ErrPhonePattern,
  ErrAddressEmpty,
  ErrAddressPattern,
  ErrIdentificationCardEmpty,
  ErrIdentificationCardPattern,
  ErrIdentificationCardLength,
  ErrStatusPattern,
  ErrorBrandNameEmpty,
  ErrorLogoEmpty,
}