import { RiBox3Fill } from "react-icons/ri";
import { BsLayersHalf } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";
import { GoBellFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
function Dashboard({ productData, loading }) {
  const navigate = useNavigate();
  const totalStock = productData.reduce((quanSum, item) => {
    return quanSum + item.quantity;
  }, 0);

  const lowStockItemsLength = productData.filter(
    (item) => item.quantity <= 10,
  ).length;

  const totalStockValue = productData.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const recentData = productData.slice(-3);

  const lowStockItems = productData.filter(
    (lowSItems) => lowSItems.quantity <= 10,
  );
  return (
    <div className="mainDashboardContainer flex flex-col gap-[4vw] sm:gap-[2.5vw]">
      <div className="dashboardCard flex justify-between max-[640px]:flex-wrap max-[640px]:gap-[3vw]">
        <div className="productCard w-[48%] sm:w-[24%] h-[20vw] sm:h-[6vw] bg-[#2d6deb] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#2862cc]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[4vw] sm:text-[1.1vw]">
            <div className="cardIcon text-[5.5vw] sm:text-[1.5vw]">
              <RiBox3Fill />
            </div>
            <label htmlFor="">Total Products</label>
          </div>
          <div className="cardValue text-[4.5vw] sm:text-[1.3vw] ml-[6vw] sm:ml-[2vw] font-[600]">
            {productData.length}
          </div>
        </div>
        <div className="stockCard w-[48%] sm:w-[24%] h-[20vw] sm:h-[6vw] bg-[#34b264] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#31a55e]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[4vw] sm:text-[1.1vw]">
            <div className="cardIcon text-[5.5vw] sm:text-[1.5vw]">
              <BsLayersHalf />
            </div>
            <label htmlFor="">Total Stock</label>
          </div>
          <div className="cardValue text-[4.5vw] sm:text-[1.3vw] ml-[6vw] sm:ml-[2vw] font-[600]">
            {totalStock}
          </div>
        </div>
        <div className="lowStockCard w-[48%] sm:w-[24%] h-[20vw] sm:h-[6vw] bg-[#ff8b2c] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#de7a28]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[4vw] sm:text-[1.1vw]">
            <div className="cardIcon text-[5.5vw] sm:text-[1.5vw]">
              <IoWarning />
            </div>
            <label htmlFor="">Low Stock Items</label>
          </div>
          <div className="cardValue text-[4.5vw] sm:text-[1.3vw] ml-[6vw] sm:ml-[2vw] font-[600]">
            {lowStockItemsLength}
          </div>
        </div>
        <div className="totalStockValueCard w-[48%] sm:w-[24%] h-[20vw] sm:h-[6vw] bg-[#6751d8] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#5c49b9]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[4vw] sm:text-[1.1vw]">
            <div className="cardIcon text-[5.5vw] sm:text-[1.5vw]">
              <FaIndianRupeeSign />
            </div>
            <label htmlFor="">Total Stock Value</label>
          </div>
          <div className="cardValue text-[4.5vw] sm:text-[1.3vw] ml-[6vw] sm:ml-[2vw] font-[600]">
            {totalStockValue}
          </div>
        </div>
      </div>
      <div className="dashboardData flex sm:justify-between max-[640px]:flex-col max-[640px]:gap-[5vw]">
        <div className="recentProducts w-[100%] sm:w-[57%] border-[1.5px] border-[#d9dee8] bg-[#ffffff] text-[2.5vw] sm:text-[1.1vw] rounded-[7px] font-[500] text-[#413e43] shadow-card">
          <div className="productBox text-[3vw] sm:text-[1.2vw] border-b-[1.5px] border-[#d9dee8] px-[3vw] sm:px-[1vw] py-[1.5vw] sm:py-[0.6vw]">
            Recent Added Products
          </div>
          <div className="showData text-[#6b7280]">
            <div className="proHeading text-[#565158] bg-[#f1f3f8] px-[3.1vw] sm:px-[1.1vw] py-[1.3vw] sm:py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
              <div className="proHeadingStyle flex justify-between items-center">
                <div className="proName w-[calc(90%/3)] flex">Product Name</div>
                <div className="proSKU w-[calc(90%/3)] flex justify-center">
                  SKU
                </div>
                <div className="proQuantity w-[calc(90%/3)] flex justify-end">
                  Quantity
                </div>
              </div>
            </div>

            <div className="proData sm:px-[1.1vw] px-[3.1vw] parent max-h-[20vw] sm:max-h-[10vw]">
              {!loading && recentData.length != 0 ? (
                recentData.map((sliceitem, index) => (
                  <div
                    key={index}
                    className="proDataStyle flex justify-between items-center sm:py-[0.6vw] py-[1.3vw] border-b-[1.5px] border-[#d9dee8] leading-[1.2] last:border-b-0"
                  >
                    <div className="proName w-[calc(90%/3)] flex">
                      {sliceitem.productName}
                    </div>
                    <div className="proSKU w-[calc(90%/3)] flex justify-center">
                      {sliceitem.SKU}
                    </div>
                    <div className="proQuantity w-[calc(90%/3)] flex justify-end">
                      {sliceitem.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="py-[0.7vw]">
                  No products available. Please add product first.
                </h1>
              )}
            </div>
          </div>
          <div className="allProductsButton flex border-t-[1.5px] border-[#d9dee8] p-[4vw] sm:p-[1vw] justify-center items-center">
            <div
              className="buttonStyle bg-[#2d6deb] py-[1vw] sm:py-[0.4vw] px-[2.5vw] sm:px-[1.5vw] flex gap-[0.5vw] items-center justify-center text-[2.5vw] sm:text-[1vw] text-[#ffffff] border-[1.5px] border-[#255cc5] rounded cursor-pointer shadow-btn"
              onClick={() => navigate("/viewProducts")}
            >
              <button className="cursor-pointer">View All Products</button>
              <div className="rightArrowIcon text-[3.5vw] sm:text-[1.5vw]">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="lowStockAlert w-[100%] sm:w-[40%] border-[1.5px] border-[#d9dee8] bg-[#ffffff] text-[2.5vw] sm:text-[1.1vw] rounded-[7px] font-[500] shadow-card">
          <div className="alertHeading flex gap-[1vw] items-center text-[3vw] sm:text-[1.2vw] text-[#e42e2e] border-b-[1.5px] border-[#d9dee8] px-[3vw] sm:px-[1vw] py-[1.5vw] sm:py-[0.6vw]">
            <GoBellFill className="text-[3.3vw] sm:text-[1.5vw]" />
            <label
              className={`${lowStockItemsLength != 0 ? "animate-blink" : ""}`}
              htmlFor=""
            >
              Low Stock Alerts
            </label>
          </div>

          <div className="alertData px-[3.1vw] sm:px-[1.1vw] max-[640px]:pb-[10vw] text-[#6b7280] max-h-[50vw] sm:max-h-[17vw] overflow-y-auto">
            {lowStockItems.length != 0 ? (
              lowStockItems.map((lowitem, index) => (
                <div
                  key={index}
                  className="showAlert flex items-center gap-[0.5vw] border-b-[1.5px] border-[#d9dee8] py-[1.7vw] sm:py-[0.7vw] last:border-none"
                >
                  <div className="dotIcon">
                    <GoDotFill />
                  </div>
                  <div className="alertData">
                    {lowitem.productName} -{" "}
                    {lowitem.quantity == 0
                      ? "Out of Stock"
                      : `Only ${lowitem.quantity} Left`}
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">No low stock alerts at the moment</h1>
            )}
          </div>
        </div>
      </div>
      <div className="dashboardActionContainer text-[2.2vw] sm:text-[1vw] text-[#ffffff] font-[500] bg-[#ffffff] w-[100%] flex justify-between px-[2.1vw] sm:px-[1.1vw] py-[2.5vw] sm:py-[1.5vw] rounded shadow-card">
        <div
          className="addProductBtn w-[48%] bg-[#2d6deb]  border-[1.5px] border-[#255cc5] flex justify-center p-[2vw] sm:p-[0.7vw] rounded gap-[1vw] sm:gap-[0.5vw] cursor-pointer"
          onClick={() => navigate("/addProduct")}
        >
          <div className="addIcon text-[3vw] sm:text-[1.5vw]">
            <FaPlus />
          </div>
          <label className="cursor-pointer" htmlFor="">
            Add New Product
          </label>
        </div>
        <div
          className="manageStockBtn w-[48%] bg-[#34b264]  border-[1.5px] border-[#32a35d] flex justify-center p-[2vw] sm:p-[0.7vw] rounded items-center gap-[1vw] sm:gap-[0.5vw] cursor-pointer"
          onClick={() => navigate("/stockUpdate")}
        >
          <div className="refreshIcon text-[3vw] sm:text-[1.5vw]">
            <HiRefresh />
          </div>
          <label className="cursor-pointer" htmlFor="">
            Manage Stock
          </label>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
