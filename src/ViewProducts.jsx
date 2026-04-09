import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function ViewProducts({ productData, loading }) {
  const navigate = useNavigate();

  return (
    <div className="mainViewProductsContainer flex flex-col gap-[4vw] sm:gap-[1vw]">
      <div className="topViewProducts flex justify-between">
        <div className="viewProductsHeading text-[3.5vw] text-[#2c3550] sm:text-[1.8vw] font-[500]">
          View Products
        </div>
        <div className="viewProductsAddBTN">
          <div
            className="flex justify-center items-center gap-[0.5vw] text-[2.5vw] sm:text-[1.05vw] text-[#ffffff] px-[1vw] py-[0.6vw] sm:py-[0.3vw] bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer"
            onClick={() => navigate("/addProduct")}
          >
            <div className="viewProductsAddIcon text-[2.8vw] sm:text-[1.3vw]">
              {" "}
              <FaPlus />
            </div>
            <button className="cursor-pointer">Add New Product</button>
          </div>
        </div>
      </div>
      <div className="showViewProducts w-[100%] text-[1.8vw] sm:text-[1.1vw] font-[500] bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded overflow-hidden shadow-card">
        <div className="showViewProductsHeading w-[100%] flex justify-between text-[#565158] bg-[#f1f3f8] px-[1.5vw] sm:px-[1.1vw] py-[2vw] sm:py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
          <div className="showViewProductsHeading1 w-[calc(100%/7)] flex justify-center items-center">
            Product Name
          </div>
          <div className="showViewProductsHeading2 w-[calc(100%/7)] flex justify-center items-center">
            SKU
          </div>
          <div className="showViewProductsHeading3 w-[calc(100%/7)] flex justify-center items-center">
            Category
          </div>
          <div className="showViewProductsHeading4 w-[calc(100%/7)] flex justify-center items-center">
            Price
          </div>
          <div className="showViewProductsHeading5 w-[calc(100%/7)] flex justify-center items-center">
            Selling Price
          </div>
          <div className="showViewProductsHeading6 w-[calc(100%/7)] flex justify-center items-center">
            Quantity
          </div>
          <div className="showViewProductsHeading7 w-[calc(100%/7)] flex justify-center items-center">
            Stock Status
          </div>
        </div>
        <div className="max-h-[130vw] sm:max-h-[27vw] overflow-y-auto">
          {!loading ? (
            productData.map((item, index) => (
              <div key={index} className="ShowAllData text-[#232426]">
                <div className="ProductsData">
                  <div className="productsNameData w-[calc(100%/7)] flex items-center gap-[0.3vw]">
                    <div className="proImage w-[35%] hidden sm:block">
                      <img className="w-full" src={item.productImage} alt="" />
                    </div>
                    <label htmlFor="">{item.productName}</label>
                  </div>
                  <div className="productsSKUData w-[calc(100%/7)] flex justify-center items-center">
                    {item.SKU + "-" + item.id}
                  </div>
                  <div className="productsCategoryData w-[calc(100%/7)] flex justify-center items-center">
                    {item.category}
                  </div>
                  <div className="productsPriceData w-[calc(100%/7)] flex justify-center items-center">
                    {item.price}
                  </div>
                  <div className="productsSellingPriceData w-[calc(100%/7)] flex justify-center items-center">
                    {item.sellingPrice}
                  </div>
                  <div className="productsQuantityData w-[calc(100%/7)] flex justify-center items-center">
                    {item.quantity}
                  </div>

                  <div className="productsStockStatusData w-[calc(100%/7)] flex justify-center items-center">
                    <div
                      className={`checkStock px-[0.8vw] sm:px-[0.5vw] py-[0.5vw] sm:py-[0.1vw] text-[1.7vw] sm:text-[0.9vw] text-[#ffffff] border-[1.5px] rounded ${item.quantity > 10 ? "bg-[#22c55e] border-[#32a35d]" : item.quantity >= 1 && item.quantity <= 10 ? "bg-[#f59e0b] border-[#db9112]" : "bg-[#ff0000] border-[#db0a0a]"}`}
                    >
                      {item.quantity > 10
                        ? "In Stock"
                        : item.quantity <= 10 && item.quantity >= 1
                          ? "Low Stock"
                          : "Out of Stock"}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="ml-[2vw] p-[1.5vw]">Data Loading...</h1>
          )}
        </div>
        <div className="bottomViewProducts p-[4vw] sm:p-[1.5vw] bg-[#f1f3f8]"></div>
      </div>
    </div>
  );
}
export default ViewProducts;
