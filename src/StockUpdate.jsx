import { useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

function StockUpdate({ productData, setProductData }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");
  const fileRef = useRef();
  const [proIMG, setProImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("token");

  const updateQuantityData = async (item) => {
    try {
      const url = `https://stock-management-system-backend-7g2f.onrender.com/api/products/update/${item._id}`;

      let response = await fetch(url, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },

        body: JSON.stringify({
          quantity: item.quantity,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert("Product Quantity Updated Successfully");

        const updated = productData.map((p) =>
          p._id === item._id
            ? {
                ...p,
                originalQuantity: item.quantity,
                isChanged: false,
              }
            : p,
        );
        setProductData(updated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DIsabled save changes button until the current quentity is change
  const handleQuantityChange = (e, index) => {
    const updated = [...productData];
    const value = e.target.value;

    if (value === "") {
      updated[index].quantity = "";
      updated[index].isChanged = false; // disable button
      setProductData(updated);
      return;
    }

    const numValue = Number(value);

    // NaN / negative reject
    if (isNaN(numValue) || numValue < 0) return;

    updated[index].quantity = numValue;

    updated[index].isChanged = numValue !== updated[index].originalQuantity;

    setProductData(updated);
  };

  const handleUpdate = (item) => {
    setSelectedProduct(item);
    setProImg(item.productImage);
  };

  const handleGetImage = () => {
    fileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5MB.");
      return;
    }

    if (
      !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
    ) {
      setMessage("Invalid image type");
      return;
    }

    const previewURL = URL.createObjectURL(file);

    setProImg(previewURL);

    setImageFile(file);

    setSelectedProduct({
      ...selectedProduct,
      imageFile: file,
    });

    setMessage("");
  };

  const updateAllData = async () => {
    try {
      const url = `https://stock-management-system-backend-7g2f.onrender.com/api/products/update/${selectedProduct._id}`;

      const formData = new FormData();

      formData.append("productName", selectedProduct.productName);

      formData.append("SKU", selectedProduct.SKU);

      formData.append("category", selectedProduct.category);

      formData.append("price", selectedProduct.price);

      formData.append("sellingPrice", selectedProduct.sellingPrice);

      formData.append("quantity", selectedProduct.quantity);

      // New image send karo
      if (imageFile) {
        formData.append("productImage", imageFile);
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: token,
        },
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert("Product Updated Successfully");

        const updated = productData.map((item) =>
          item._id === selectedProduct._id ? data.product : item,
        );

        setProductData(updated);

        setSelectedProduct(null);

        setImageFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete product Logic
  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?",
      );
      if (!confirmDelete) return;

      console.log("Deleting product id:", id);

      const response = await fetch(
        `https://stock-management-system-backend-7g2f.onrender.com/api/products/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        },
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (data.success) {
        alert("Product deleted successfully");

        const updated = productData.filter((item) => item._id !== id);
        setProductData(updated);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="mainStockUpdateContainer flex flex-col gap-[1vw]">
      {/*  */}
      {/*  */}
      {/*  */}
      {selectedProduct ? (
        <div className="mainEditProductContainer w-[90%] sm:w-[60%] bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded shadow-card overflow-hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-[3vw] sm:px-[1.5vw] py-[2vw] sm:py-[1vw] font-[400]">
          <div className="editProductContainer flex flex-col gap-[1vw]">
            <div className="editProductHeading text-[3.5vw] text-[#2c3550] sm:text-[1.5vw] font-[500]">
              Edit Product
            </div>
            <form
              action=""
              className="flex flex-col gap-[0.5vw]"
              onSubmit={(e) => {
                e.preventDefault();
                updateAllData();
              }}
            >
              <div className="editProductFields">
                <label htmlFor="proName">Product Name:</label>
                <input
                  type="text"
                  name=""
                  id="proName"
                  value={selectedProduct.productName}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="group">
                <div className="editProductFields w-[49%]">
                  <label htmlFor="proSKU">SKU:</label>
                  <input
                    type="text"
                    name=""
                    id="proSKU"
                    value={selectedProduct.SKU}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        SKU: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="editProductFields w-[49%]">
                  <label htmlFor="proCategory">Category:</label>
                  <select
                    name=""
                    id="proCategory"
                    className=" border-[1.5px] border-[#d9dee8] rounded-[4px] max-[640px]:p-[1.7vw] p-[0.5vw] max-[640px]:text-[2.3vw] text-[1vw]"
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value={selectedProduct.category}>
                      {selectedProduct.category}
                    </option>
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
                    <option value="mobileAccessories">
                      Mobile Accessories
                    </option>
                    <option value="computerAccessories">
                      Computer Accessories
                    </option>
                    <option value="home&Kitchen">Home & Kitchen</option>
                  </select>
                </div>
              </div>
              <div className="group">
                <div className="editProductFields w-[49%]">
                  <label htmlFor="proPrice">Price:</label>
                  <input
                    type="number"
                    name=""
                    id="proPrice"
                    className="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="editProductFields w-[49%]">
                  <label htmlFor="proSellingPrice">Selling Price:</label>
                  <input
                    type="number"
                    name=""
                    id="proSellingPrice"
                    className="number"
                    value={selectedProduct.sellingPrice}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        sellingPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="editProductFields">
                <div className="imgCon flex items-center gap-[5.5vw]">
                  <div className="wrapper w-[25%] sm:w-[17%]">
                    <label htmlFor="">Product Image:</label>
                    <div className="proIMG w-[80%] min-h-[10vw] sm:min-h-[5vw]">
                      <img className="w-full" src={proIMG} alt="" />
                    </div>
                  </div>
                  <div className="uploadImgBTN">
                    <div
                      className="text-[2.1vw] sm:text-[1.05vw] text-[#ffffff] py-[1vw] sm:py-[0.3vw] px-[2vw] sm:px-[0.9vw] bg-[#2d6deb] border-[1.5px] border-[#255cc5] rounded cursor-pointer"
                      onClick={handleGetImage}
                    >
                      Upload New Image
                    </div>
                  </div>
                  <input
                    type="file"
                    name=""
                    id=""
                    ref={fileRef}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleImageChange}
                  />
                </div>
                <p className="text-[1.5vw] sm:text-[0.78vw] text-[#f34141] font-[400] text-center">
                  {message}
                </p>
              </div>
              <div className="actionEditProduct flex justify-end gap-[1vw] text-[2.3vw] sm:text-[1.2vw] text-[#ffffff] border-t-[1.5px] border-[#d9dee8] px-[3vw] sm:px-[1.5vw] py-[5vw] sm:py-[1vw] pb-0">
                <button
                  type="submit"
                  className="py-[0.8vw] sm:py-[0.25vw] px-[3.5vw] sm:px-[1vw] bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  className="py-[0.8vw] sm:py-[0.25vw] px-[3.5vw] sm:px-[1vw] bg-[#2d6deb] border-[1.5px] border-[#255cc5] rounded cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(null);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="mainStockUpdateHeading text-[3.5vw] text-[#2c3550] sm:text-[1.8vw] font-[500]">
        Stock Update
      </div>
      <div className="stockUpdateContainer bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded overflow-hidden shadow-card">
        <div className="stockUpdateHeading bg-[#2d6deb] text-[1.8vw] sm:text-[1.1vw] text-[#ffffff] font-[500] sm:px-[1.1vw] px-[2vw] sm:py-[0.4vw] py-[1vw]">
          Stock Update
        </div>
        <div className="stockUpdateDataContainer font-[500]">
          <div className="stockUpdateDataHeading  text-[1.8vw] sm:text-[1.1vw] w-[100%] flex justify-between items-center text-[#565158] bg-[#f1f3f8] px-[1.5vw] sm:px-[1.1vw] py-[2vw] sm:py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
            <div className="stockUpdateProductName w-[calc(100%/4)] flex justify-start items-center">
              Product Name
            </div>
            <div className="stockUpdateProductSKU w-[calc(100%/4)] flex justify-center items-center">
              SKU
            </div>
            <div className="stockUpdateProductQuantity w-[calc(100%/4)] flex justify-center items-center">
              Current Quantity
            </div>
            <div className="stockUpdateDetails w-[calc(100%/4)] flex justify-end items-center">
              Update Stock
            </div>
          </div>
          <div className="max-h-[130vw] sm:max-h-[27vw] overflow-y-auto">
            {productData.map((item, index) => (
              <div
                key={item._id}
                className="allStockUpdateData  w-[100%] flex justify-between border-b-[1.5px] border-[#d9dee8] text-[1.7vw] sm:text-[1vw] text-[#232426] sm:px-[1.1vw] px-[1.7vw] sm:py-[0.5vw] py-[1.5vw]"
              >
                <div className="proInfo justify-start items-center gap-[0.3vw]">
                  <div className="proImg w-[15%]">
                    <img className="w-full" src={item.productImage} alt="" />
                  </div>
                  <div className="proName leading-[1.1]">
                    {item.productName}
                  </div>
                </div>
                <div className="proInfo justify-center items-center">
                  <div className="proSKU">
                    {item.SKU + "-" + item._id.slice(-5)}
                  </div>
                </div>
                <div className="proInfo justify-center items-center">
                  <div className="proQuantity">
                    <input
                      className="border-[1.5px] border-[#d9dee8] rounded focus:outline-none px-[0.5vw] py-[0.5vw] sm:py-[0.2vw] w-[100%]"
                      type="number"
                      name=""
                      id=""
                      min="0"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(event, index)}
                    />
                  </div>
                </div>
                <div className="proInfo justify-end items-center">
                  <div className="proUpdateStock sm:text-[0.9vw] text-[#ffffff] flex items-center justify-center gap-[0.5vw] sm:gap-[1vw]">
                    <button
                      disabled={!item.isChanged}
                      className={`rounded px-[0.3vw] py-[0.5vw] sm:py-[0.15vw] border-[1.5px]
  ${
    item.isChanged
      ? "bg-[#2d6deb] border-[#255cc5] cursor-pointer text-white"
      : "bg-gray-400 border-gray-400 cursor-not-allowed text-white"
  }`}
                      onClick={() => updateQuantityData(item)}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-[#34b264]  border-[1.5px] border-[#32a35d] rounded px-[1.3vw] py-[0.5vw] sm:py-[0.15vw]"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <div className="deleteProduct">
                      <RiDeleteBinLine
                        className="text-lg text-[#ff0000] cursor-pointer"
                        onClick={() => deleteProduct(item._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bottomViewProducts p-[4vw] sm:p-[1.5vw] bg-[#f1f3f8]"></div>
      </div>
    </div>
  );
}
export default StockUpdate;
