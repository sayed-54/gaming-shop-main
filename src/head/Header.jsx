import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { Link } from "react-router-dom";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter(
    (toy) =>
      toy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toy.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[90%] sm:mt-[200px] mx-auto lg:mt-[250px] flex flex-col gap-4 relative">
      {/* Search & Image Section */}
      <div className="flex-1 relative">
        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search for toys..."
          className="p-3 lg:p-5 bg-gray-200 rounded-lg w-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSearchResults(e.target.value.length > 0);
          }}
        />

        {/* Search Results Overlay */}
        {showSearchResults && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg max-h-80 overflow-auto z-50 p-3 border border-gray-300">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="block p-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setShowSearchResults(false)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{product.title}</span>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">No products found</p>
            )}
          </div>
        )}

        {/* Banner Image */}
        <img
          src="/1000_F_396099929_pq25fniLGVfqrxJVhLqJvNPdNwO85kll.jpg"
          alt="content-image"
          className="rounded-xl w-full shadow-md mt-4"
        />
      </div>
    </div>
  );
}

export default Header;
