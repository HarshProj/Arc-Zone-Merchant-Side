import React, { useState, useEffect } from 'react'
import './CSS/Orders.css'


export default function Orders() {
  const [merchant, setMerchant] = useState([]);
  const [allOrders, setAllOrders] = useState([]);


  useEffect(() => {
    // getMerchant()

    getOrders()
  }, []);



  const Tdispatch = async (id) => {
    const response = await fetch(`http://localhost:5000/test/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    console.log(data);
  }


  const dispached = async (orderid) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${orderid}/${merchant._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)



    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }


  const getOrders = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);

      // Set the merchant state
      await new Promise((resolve) => {
        setMerchant(parsedUser);
        resolve();
      });

      // Now you can access merchant after it's been set
      const response = await fetch(`http://localhost:5000/getitems/${parsedUser._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);
      setAllOrders(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };










  const verify = () => {
    console.log(merchant)
  }


  return (
    <div>

      <div className="all-order-info">

          <h1>All Orders</h1>

      {
        allOrders?.map((items) => {
          return (
            <div className="allOrders">
              <div className="orderGallery">


                <div className="ogimg">
                  <img src={items.productpic} alt="" />
                </div>

                <div className="oDetails">
                  <p><b>Product Name :</b> {items.productName}</p>
                  <p><b>Product Price :</b> {items.productPrice}</p>
                  <p><b>Customer Name :</b> {items.customerName}</p>
                  <p><b>Customer Email :</b> {items.userEmail}</p>
                  <p><b>Customer Address :</b> {items.userAddress}</p>
                  <p><b>Customer Phone :</b> {items.userPhone}</p>
                </div>

                {/* <p>{items._id}</p> */}

                <div className="dispatchBtn  adt-buttons">

                  <button className='OdispBtn' onClick={() => { dispached(items._id); window.location.reload() }}>Dispached</button>
                  <br />
                  <button className='OdispBtn' >Out of Stocks</button>
                </div>




              </div>
            </div>
          )
        })
      }
      </div>
      

      {/* <button onClick={() => { verify() }}>click me</button>
      <button onClick={() => { getOrders() }}>Get Orders</button>
       */}

    </div>
  )
}
