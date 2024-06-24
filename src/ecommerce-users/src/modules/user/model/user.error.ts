// domain errors: loi nghiep vu
let ErrUserExists = new Error("User already exists");
let ErrUserNotFound = new Error("User not found");
let ErrEmailExists = new Error("Email already exists");
let ErrUserInActive = new Error("User is inactive");
//cả hai thiếu thì nghiệp vụ

export {
  ErrUserExists,
  ErrUserNotFound,
  ErrEmailExists,
  ErrUserInActive
};