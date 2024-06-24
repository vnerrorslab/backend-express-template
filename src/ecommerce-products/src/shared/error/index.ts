let ErrProductNameEmpty = new Error("Product name is required");
let ErrImageEmpty = new Error("Image is required");
let ErrPriceEmpty = new Error("Price is required");
let ErrStatusPattern = new Error("Status must be ACTIVE or INACTIVE");

export { ErrProductNameEmpty, ErrImageEmpty, ErrPriceEmpty, ErrStatusPattern };
