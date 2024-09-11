import React, { useContext } from "react";
import { mycontext } from "../UseContext/CartContext";

const Cart = () => {
  const [data, setData] = useContext(mycontext);

  // Calculate Toatl Price Function:
  const totalPrice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 0),
    0
  );

  // Calculate Total Quantity Function:
  const totalQuantity = data.reduce(
    (total, data) => total + (data.quantity || 0),
    0
  );

  // Product Increment Function:
  const handleInc = (id, quantity) => {
    setData((curr) => {
      return curr.map((element) => {
        if (element.id === id) {
          return { ...element, quantity: element.quantity + 1 || quantity + 1 };
        }
        return element;
      });
    });
  };

  // Product Decrement Function :
  const handleDec = (id, quantity) => {
    setData((curr) => {
      return curr.map((element) => {
        if (element.id === id && quantity > 0) {
          return { ...element, quantity: element.quantity - 1 || quantity - 1 };
        }
        return element;
      });
    });
  };
  
  // Remove from cart function:
  const remove = (id) => {
    setData(data.filter((element) => element.id !== id));
  };
  
  return (
    <div className="container">
      <h3 className="text-end">Total Quantity : {totalQuantity}</h3>
      <h3 className="text-end">Total Price : ${totalPrice}</h3>
      <div className="row row-cols-1 row-cols-md g-4">
        {data.map((ele, index) => {
          return (
            <div key={index}>
              <div className="card mb-3 p-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={ele.image}
                      className="img-fluid rounded-start h-80 w-50"
                      alt="product_image"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3 className="card-title">{ele.title}</h3>
                      <h5 className="card-text">Description:</h5>
                      <p className="card-text">{ele.description}</p>
                      <div className="card-text fw-bold mb-3">
                        Category : {ele.category}
                      </div>
                      <h5 className="card-text">Price : ${ele.price}</h5>
                      <div className="btn-group w-50" role="group">
                        <button
                          onClick={() => handleInc(ele.id, ele.quantity || 0)}
                          className="btn btn-primary"
                        >
                          +
                        </button>
                        <button className="btn disabled fw-bold">
                          {ele.quantity || 0}
                        </button>
                        <button
                          onClick={() => handleDec(ele.id, ele.quantity || 0)}
                          className="btn btn-primary"
                        >
                          -
                        </button>
                      </div>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          onClick={() => remove(ele.id)}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
