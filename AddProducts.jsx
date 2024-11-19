import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const HeandleSubmite = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const HeandleAdd = async () => {
    if (!name && !price && !category && !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:4000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="login-container-add">
      <h2> Add Product</h2>
      <form onSubmit={HeandleSubmite}>
        <div className="form-group">
          <input
            type="name"
            id="name"
            name="name"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="span"> Enter Valid Name</span>}
        </div>
        <div className="form-group">
          <input
            type="Price"
            id="Price"
            name="Price"
            required
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && <span className="span"> Enter Valid Price</span>}
        </div>
        <div className="form-group">
          <input
            type="Category"
            id="Category"
            name="Category"
            required
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && (
            <span className="span"> Enter Valid Category</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="Company"
            id="Company"
            name="Company"
            required
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && (
            <span className="span"> Enter Valid Company</span>
          )}
        </div>
        <button type="submit" className="signup-button" onClick={HeandleAdd}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
