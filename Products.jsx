import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const Products = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    ProductList();
  }, []);

  const ProductList = async () => {
    let result = await fetch("http://localhost:4000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProduct(result);
  };

  const HeandleDelete = async (id) => {
    let result = await fetch(`http://localhost:4000/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Are you sure you want to delete this record?");
      ProductList();
    }
  };

  const HeandleSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      ProductList();
    }
  };

  return (
    <div className="crud-table-container">
      <h2>Product List</h2> <div />
      <div className="Add-search-container">
        <div className="Add-btn">
          <Link to="/addpro" className="btn add-btn">
            Add+
          </Link>
        </div>
        <div className="search">
          <input
            className="search"
            type="text"
            placeholder="Search"
            onChange={HeandleSearch}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <Link to={"/update/" + item._id}>
                      <button className="btn update-btn">
                        <FaUserEdit />
                      </button>
                    </Link>
                    <button
                      className="btn delete-btn"
                      onClick={() => HeandleDelete(item._id)}
                    >
                      <MdDeleteSweep />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <h2 className="user-heading">User Data Not Found</h2>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
