import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base API URL
const API_URL = "https://e-commerce-eight-blond.vercel.app/api/v1/products";

// Function to get token dynamically
const getToken = () => localStorage.getItem("token");

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const json = await response.json();
      // console.log("✅ Fetch Products Response:", json);
      return json.data;
    } catch (error) {
      console.error("❌ Error in fetchProducts:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      console.log("🔹 Sending Product Data:", product); // Debugging

      const response = await fetch(
        "https://e-commerce-eight-blond.vercel.app/api/v1/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );

      console.log("🔹 Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await response.json();
      console.log("✅ Added Product Response:", data);

      return data.product || data;
    } catch (error) {
      console.error("❌ Error in addProduct:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Edit a product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔹 Editing Product:", product); // Debugging

      if (!product.id) {
        throw new Error("Product ID is missing!");
      }

      const response = await fetch(
        `https://e-commerce-eight-blond.vercel.app/api/v1/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );

      console.log("🔹 Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      console.log("✅ Updated Product Response:", data);

      return data.product || product;
    } catch (error) {
      console.error("❌ Error in editProduct:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔹 Deleting Product ID:", id);

      if (!id) {
        throw new Error("Product ID is missing!");
      }

      const response = await fetch(
        `https://e-commerce-eight-blond.vercel.app/api/v1/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🔹 Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.message || "Failed to delete product");
      }

      console.log("✅ Product Deleted Successfully:", id);
      return id;
    } catch (error) {
      console.error("❌ Error in deleteProduct:", error);
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
