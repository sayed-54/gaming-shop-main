import { Link } from "react-router-dom";

function OurProducts({ age, setAge }) {
  return (
    <div className="our-products my-16 px-4 ">
      {/* Heading Section */}
      <div className="top mb-10 text-center">
        <h1 className="text-red-500 text-xl font-semibold">Our Products</h1>
        <h1 className="text-[#0e2c6c] text-3xl font-bold mt-5">
          Collection List
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="categories grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
        {/* Category: +3 */}
        <Link to="/age/+3" onClick={() => setAge("+3")}>
          <div className="category hover:scale-105 transition-all duration-300 shadow-md rounded-xl overflow-hidden">
            <img src="/3_copy.webp" alt="3+" className="w-full" />
            <div className="txt text-center py-3 bg-[#f6f7fa]">
              <h2 className="font-bold text-lg text-[#0e2c6c]">+3 Years</h2>
              <p className="text-gray-500">36 items</p>
            </div>
          </div>
        </Link>

        {/* Category: 0-1 */}
        <Link to="/age/0-1" onClick={() => setAge("0-1")}>
          <div className="category hover:scale-105 transition-all duration-300 shadow-md rounded-xl overflow-hidden">
            <img src="/0-1_copy.webp" alt="0-1" className="w-full" />
            <div className="txt text-center py-3 bg-[#f6f7fa]">
              <h2 className="font-bold text-lg text-[#0e2c6c]">0-1 Years</h2>
              <p className="text-gray-500">29 items</p>
            </div>
          </div>
        </Link>

        {/* Category: 1-3 */}
        <Link to="/age/1-3" onClick={() => setAge("1-3")}>
          <div className="category hover:scale-105 transition-all duration-300 shadow-md rounded-xl overflow-hidden">
            <img src="/2-3_copy.webp" alt="1-3" className="w-full" />
            <div className="txt text-center py-3 bg-[#f6f7fa]">
              <h2 className="font-bold text-lg text-[#0e2c6c]">1-3 Years</h2>
              <p className="text-gray-500">36 items</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OurProducts;
