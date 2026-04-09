import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [message, setMessage] = useState("");

  const [productName, setProductName] = useState("");
  const [SKU, setSKU] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5MB.");
      setProductImage(null);
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
    ) {
      setMessage(
        "Invalid file type. Please upload JPEG, JPG, PNG, and GIF image are allowed.",
      );
      setProductImage(null);
      return;
    }
    const imageURL = URL.createObjectURL(file);
    setProductImage(imageURL);
    setMessage("");
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    const url = "http://10.198.199.54:3000/stocks";
    let response = await fetch(url, {
      method: "Post",
      body: JSON.stringify({
        productName,
        SKU,
        category,
        price,
        sellingPrice,
        quantity,
        productImage,
      }),
    });
    response = await response.json();
    if (response) {
      alert("New Product Added");
      navigate("/viewProducts");
    }
  };

  return (
    <div className="mainAddProductContainer">
      <div className="addProductHeading text-[3.5vw] text-[#2c3550] sm:text-[1.8vw] font-[500]">
        Add Product
      </div>

      <form action="" onSubmit={addNewProduct}>
        <div className="addProductData bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded shadow-card overflow-hidden">
          <div className="addProductInnerHeading bg-[#2d6deb] text-[2.5vw] sm:text-[1.2vw] text-[#ffffff] font-[500] sm:px-[1.1vw] px-[2vw] sm:py-[0.4vw] py-[1vw]">
            Add Product
          </div>
          <div className="addProductInputs p-[2.5vw] sm:p-[1vw] flex flex-col sm:flex-row flex-wrap justify-between gap-[1.5vw] sm:gap-[0.5vw]">
            <div className="productFields">
              <label htmlFor="pName">Product Name:</label>
              <input
                onChange={(event) => setProductName(event.target.value)}
                className="pInputStyle"
                type="text"
                name=""
                id="pName"
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div className="productFields">
              <label htmlFor="pSKU">SKU:</label>
              <input
                onChange={(event) => setSKU(event.target.value)}
                className="pInputStyle"
                type="text"
                name=""
                id="pSKU"
                placeholder="Enter SKU"
                required
              />
            </div>
            <div className="productFields">
              <label htmlFor="pCategory">Category:</label>
              <select
                onChange={(event) => setCategory(event.target.value)}
                className="pInputStyle"
                name=""
                id="pCategory"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="grocery">Grocery</option>
                <option value="stationery">Stationery</option>
                <option value="furniture">Furniture</option>
                <option value="footwear">Footwear</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="medicines">Medicines</option>
                <option value="hardware">Hardware</option>
                <option value="mobileAccessories">Mobile Accessories</option>
                <option value="computerAccessories">
                  Computer Accessories
                </option>
                <option value="home&Kitchen">Home & Kitchen</option>
              </select>
            </div>
            <div className="productFields">
              <label htmlFor="pPrice">Price:</label>
              <input
                onChange={(event) => setPrice(event.target.value)}
                className="pInputStyle number"
                type="number"
                name=""
                id="pPrice"
                placeholder="Enter Price"
                required
              />
            </div>
            <div className="productFields">
              <label htmlFor="pSellingPrice">Selling Price:</label>
              <input
                onChange={(event) => setSellingPrice(event.target.value)}
                className="pInputStyle number"
                type="number"
                name=""
                id="pSellingPrice"
                placeholder="Enter Selling Price"
                required
              />
            </div>
            <div className="productFields">
              <label htmlFor="pQuantity">Quantity:</label>
              <input
                onChange={(event) => setQuantity(event.target.value)}
                className="pInputStyle"
                type="number"
                name=""
                id="pQuantity"
                placeholder="Enter Product Quantity"
                required
                min="0"
              />
            </div>
            <div className="inputImage w-[100%] text-[2.5vw]  sm:text-[1.2vw] text-[#2c3550]">
              <div className="font-[500] flex flex-col gap-[1vw] sm:gap-[0.5vw]">
                <label htmlFor="">Product Image:</label>
                <div className="proImageContainer w-[100%] h-[23vw] sm:h-[8vw] border-[1.5px] border-dashed border-[#d9dee8] rounded flex">
                  <div className="proImagePreview w-[40%] sm:w-[17%] h-full  border-r-[1.5px] border-dashed border-[#d9dee8]">
                    {productImage ? (
                      <img
                        className="w-full h-full object-fill"
                        src={productImage}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-[100%]"
                        src="./src/assets/upload-image.png"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="actionUploadContainer w-[60%] sm:w-[83%] px-[4vw] sm:px-[1.5vw] py-[3vw] sm:py-[1vw] flex flex-col gap-[1.5vw] sm:gap-0">
                    <div className="uploadHeading text-[2.3vw] sm:text-[1.1vw]">
                      Upload Image
                    </div>
                    <p className="text-[1.5vw] sm:text-[0.8vw] font-[400]">
                      JPG, JPEG, PNG, or GIF format, max 5MB
                    </p>
                    <div className="buttonContainer flex items-center gap-[2vw] sm:gap-[1vw]">
                      <div
                        className="text-[2.2vw] sm:text-[0.9vw] px-[3vw] sm:px-[1.2vw] py-[0.3vw] sm:py-[0.17vw] text-[#ffffff] bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer mt-[0.5vw]"
                        onClick={handleButtonClick}
                      >
                        Browse
                      </div>
                      <p className="text-[1.5vw] sm:text-[0.78vw] text-[#f34141] font-[400]">
                        {message}
                      </p>
                      <input
                        className="hidden"
                        ref={fileRef}
                        type="file"
                        name=""
                        id=""
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="addProductActionBTNContainer bg-[#f1f3f8] border-t-[1.5px] border-[#d9dee8] p-[4vw] sm:p-[1.1vw]">
            <div className="addProActionBTN flex justify-end gap-[3vw] sm:gap-[1.5vw] text-[2.7vw] sm:text-[1.1vw] text-[#ffffff]">
              <button
                className="py-[0.8vw] sm:py-[0.3vw] px-[3.5vw] sm:px-[2.5vw] bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer"
                type="submit"
              >
                Add Product
              </button>
              <button
                type="reset"
                onClick={() => navigate("/dashboard")}
                className="py-[0.8vw] sm:py-[0.3vw] px-[3.5vw] sm:px-[2.5vw] bg-[#2d6deb] border-[1.5px] border-[#255cc5] rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddProduct;
