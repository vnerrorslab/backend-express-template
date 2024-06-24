// domain errors: loi nghiep vu
let ErrCategoryExists = new Error("Category already exists");
let ErrCategoryNotFound = new Error("Category not found");
let ErrCategoryInActive = new Error("Category is inactive");

export {
  ErrCategoryExists,
  ErrCategoryNotFound,
  ErrCategoryInActive,
};