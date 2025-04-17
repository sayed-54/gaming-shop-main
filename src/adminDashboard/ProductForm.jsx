import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../rtk/slices/productsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const existingProduct = id ? products.find((p) => p.id === id) : null;

  const [product, setProduct] = useState(
    existingProduct || {
      title: "",
      price: "",
      description: "",
      image: "",
      age: "",
    }
  );

  useEffect(() => {
    if (existingProduct) setProduct(existingProduct);
  }, [existingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(
          editProduct({ id, updatedProduct: { ...product, age: product.age } })
        ).unwrap();
      } else {
        await dispatch(addProduct({ ...product, age: product.age })).unwrap();
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error adding/editing product:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto ">
      <h1 className="text-2xl mb-4 mt-[150px]">
        {id ? "Edit" : "Add"} Product
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="age"
          value={product.age}
          onChange={(e) => setProduct({ ...product, age: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />

        {/* Age Dropdown Input */}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
