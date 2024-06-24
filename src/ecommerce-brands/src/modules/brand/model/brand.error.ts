// domain errors: loi nghiep vu
let ErrUserExists = new Error("User already exists");
let ErrUserNotFound = new Error("User not found");
let ErrEmailExists = new Error("Email already exists");
let ErrUserInActive = new Error("User is inactive");
//cả hai thiếu thì nghiệp vụ

let ErrBrandExists = new Error("Brand already exists");
let ErrBrandNotFound = new Error("Brand not found");
let ErrBrandInActive = new Error("Brand is inactive");

export {
  ErrUserExists,
  ErrUserNotFound,
  ErrEmailExists,
  ErrUserInActive,
  ErrBrandExists,
  ErrBrandNotFound,
  ErrBrandInActive,
};