import { RiBox3Fill } from "react-icons/ri";
import { BsLayersHalf } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";
function Dashboard() {
  return (
    <div className="mainDashboardContainer flex flex-col gap-[2.5vw]">
      <div className="dashboardCard flex justify-between">
        <div className="productCard w-[24%] h-[6vw] bg-[#2d6deb] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#2862cc]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[1.1vw]">
            <div className="cardIcon text-[1.5vw]">
              <RiBox3Fill />
            </div>
            <label htmlFor="">Total Products</label>
          </div>
          <div className="cardValue text-[1.3vw] ml-[2vw] font-[600]">120</div>
        </div>
        <div className="stockCard w-[24%] h-[6vw] bg-[#34b264] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#31a55e]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[1.1vw]">
            <div className="cardIcon text-[1.5vw]">
              <BsLayersHalf />
            </div>
            <label htmlFor="">Total Stock</label>
          </div>
          <div className="cardValue text-[1.3vw] ml-[2vw] font-[600]">850</div>
        </div>
        <div className="lowStockCard w-[24%] h-[6vw] bg-[#ff8b2c] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#de7a28]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[1.1vw]">
            <div className="cardIcon text-[1.5vw]">
              <IoWarning />
            </div>
            <label htmlFor="">Low Stock Items</label>
          </div>
          <div className="cardValue text-[1.3vw] ml-[2vw] font-[600]">5</div>
        </div>
        <div className="totalStockValueCard w-[24%] h-[6vw] bg-[#6751d8] text-[#ffffff] p-[1vw] rounded border-[1.5px] border-[#5c49b9]">
          <div className="cardTitle flex items-center gap-[0.5vw] text-[1.1vw]">
            <div className="cardIcon text-[1.5vw]">
              <FaIndianRupeeSign />
            </div>
            <label htmlFor="">Total Stock Value</label>
          </div>
          <div className="cardValue text-[1.3vw] ml-[2vw] font-[600]">
            1,50,000
          </div>
        </div>
      </div>
      <div className="dashboardData flex justify-between">
        <div className="recentProducts w-[57%] border-[1.5px] border-[#d9dee8] bg-[#ffffff] text-[1.1vw] rounded-[7px] font-[500] text-[#413e43] shadow-card">
          <div className="productBox text-[1.2vw] border-b-[1.5px] border-[#d9dee8] px-[1vw] py-[0.6vw]">
            Recent Products
          </div>
          <div className="showData text-[#6b7280]">
            <div className="proHeading text-[#565158] bg-[#f1f3f8] px-[1.1vw] py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
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
            <div className="proData px-[1.1vw]">
              <div className="proDataStyle flex justify-between items-center py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
                <div className="proName w-[calc(90%/3)] flex">
                  Samsung Galaxy S21
                </div>
                <div className="proSKU w-[calc(90%/3)] flex justify-center">
                  MB-11032026-005
                </div>
                <div className="proQuantity w-[calc(90%/3)] flex justify-end">
                  20
                </div>
              </div>
            </div>
            <div className="proData px-[1.1vw]">
              <div className="proDataStyle flex justify-between items-center py-[0.4vw] border-b-[1.5px] border-[#d9dee8]">
                <div className="proName w-[calc(90%/3)] flex">
                  Nike Running Shose
                </div>
                <div className="proSKU w-[calc(90%/3)] flex justify-center">
                  SH-17032026-009
                </div>
                <div className="proQuantity w-[calc(90%/3)] flex justify-end">
                  15
                </div>
              </div>
            </div>
            <div className="proData px-[1.1vw]">
              <div className="proDataStyle flex justify-between items-center py-[0.4vw]">
                <div className="proName  w-[calc(90%/3)] flex">Dell Laptop</div>
                <div className="proSKU w-[calc(90%/3)] flex justify-center">
                  LP-27032026-012
                </div>
                <div className="proQuantity w-[calc(90%/3)] flex justify-end">
                  10
                </div>
              </div>
            </div>
          </div>
          <div className="allProductsButton flex border-t-[1.5px] border-[#d9dee8] p-[1vw] justify-center items-center">
            <div className="buttonStyle bg-[#2d6deb] py-[0.4vw] px-[1.5vw] flex gap-[0.5vw] items-center justify-center text-[1vw] text-[#ffffff] border-[1.5px] border-[#255cc5] rounded cursor-pointer shadow-btn">
              <button className="cursor-pointer">View All Products</button>
              <div className="rightArrowIcon text-[1.5vw]">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="lowStockAlert w-[40%] border-[1.5px] border-[#d9dee8] bg-[#ffffff] text-[1.1vw] rounded-[7px] font-[500] shadow-card">
          <div className="alertHeading text-[1.2vw] text-[#e42e2e] border-b-[1.5px] border-[#d9dee8] px-[1vw] py-[0.6vw]">
            <label className="animate-blink" htmlFor="">
              Low Stock Alerts
            </label>
          </div>
          <div className="alertData px-[1.1vw] text-[#6b7280]">
            <div className="showAlert flex items-center gap-[0.5vw] border-b-[1.5px] border-[#d9dee8] py-[0.8vw]">
              <div className="dotIcon">
                <GoDotFill />
              </div>
              <div className="alertData">Wireless Mouse - Only 2 Left</div>
            </div>
            <div className="showAlert flex items-center gap-[0.5vw] border-b-[1.5px] border-[#d9dee8] py-[0.8vw]">
              <div className="dotIcon">
                <GoDotFill />
              </div>
              <div className="alertData">HP Printer - Only 3 Left</div>
            </div>
            <div className="showAlert flex items-center gap-[0.5vw] border-b-[1.5px] border-[#d9dee8] py-[0.8vw]">
              <div className="dotIcon">
                <GoDotFill />
              </div>
              <div className="alertData">USB Keyboard - Only 4 Left</div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboardActionContainer text-[1vw] text-[#ffffff] font-[500] bg-[#ffffff] w-[100%] flex justify-between px-[1.1vw] py-[2vw] rounded shadow-card">
        <div className="addProductBtn w-[48%] bg-[#2d6deb]  border-[1.5px] border-[#255cc5] flex justify-center p-[0.7vw] rounded gap-[0.5vw] cursor-pointer">
          <div className="addIcon text-[1.5vw]">
            <FaPlus />
          </div>
          <label className="cursor-pointer" htmlFor="">
            Add New Product
          </label>
        </div>
        <div className="manageStockBtn w-[48%] bg-[#34b264]  border-[1.5px] border-[#32a35d] flex justify-center p-[0.7vw] rounded items-center gap-[0.5vw] cursor-pointer">
          <div className="refreshIcon text-[1.5vw]">
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
