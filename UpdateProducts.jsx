import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    hendaleUpdate();
  }, []);

  const hendaleUpdate = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:4000/product/${params.id}`);
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const heandleSubmite = (e) => {
    e.preventDefault();
  };

  const HeandleUpdate = async () => {
    let result = await fetch(`http://localhost:4000/update/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="login-container-add">
      <h2> Update Product</h2>
      <form onSubmit={heandleSubmite}>
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
        </div>
        <button type="submit" className="signup-button" onClick={HeandleUpdate}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
