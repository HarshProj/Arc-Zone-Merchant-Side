import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'


function UpdateProduct() {
  const { productid } = useParams();
  const [pic, setPic] = useState([]);

  // const title = pic.title
  // const desc = pic.desc
  // const price = pic.price

  const [Title, setTitle] = useState();
  const [Desc, setDesc] = useState();
  const [Price, setPrice] = useState();

  const [values, setValues] = useState({
    title: "",
    desc: "",
    price: ""
  });




  const navigate = useNavigate();


  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  // console.log(productid)



  useEffect(() => {

    fetch(`http://localhost:5000/getproduct/${productid}`, {
      headers: {

        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(result => {
        setValues({ ...values, title: result.title, desc: result.desc, price: result.price })
        // console.log(result.price)
        // setTitle(result.title)
        // setDesc(result.desc)
        // setPrice(result.price)
        setPic(result)
        console.log(result)
      })

  }, []);

  const updateItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updateproduct/${productid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const updatedItem = await response.json();
      notifyB("Product Updated")
      navigate('/viewproduct')
      // Handle the updated item, update component state, etc.
      // ...
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };



  const check = () => {
    console.log(values)
  }





  return (
    <div>
     
      <div className="appProduct">

        <div className="file-Image">
          <img className='preview' src={pic.pic} alt="" />

        </div>

        {/* <p>Price : {pic.price}</p>
        <p>Title : {title}</p>
        <p>Desc :{pic.desc}</p> */}


        <div className="productInfo">
          <h3 className='productInfo-heading'>Update Product</h3>
          <div className="ap-input-container">
            <label htmlFor="">Product Name</label>
            {/* <input type="text" className='' placeholder='heading' value={heading} onChange={(e) => { setHeading(e.target.value) }} /> */}
            <input type="text" placeholder='Enter the new title' value={values.title} onChange={(e) => setValues({
              ...values,
              title: e.target.value
            })} />
          </div>


          <div className="ap-input-container">
            <label htmlFor="">Product Price</label>
            {/* <input type="number" className='' placeholder='Price' value={price} onChange={(e) => { setPrice(e.target.value) }} /> */}
            <input type="number" placeholder='Enter the new price' value={values.price} onChange={(e) => setValues({
              ...values,
              price: e.target.value
            })} />
          </div>


          <div className="ap-input-container">
            <label htmlFor="">Product Desc</label>
            <textarea name="" id="" placeholder='Description' value={values.desc} onChange={(e) => setValues({
              ...values,
              desc: e.target.value
            })}>
            </textarea>
          </div>

          <div className="ap-button adt-buttons">
            {/* <button onClick={() => { post() }}>Post</button> */}
            <button onClick={() => { updateItem() }}> update</button>
          </div>

        </div>












        {/* <input type="text" placeholder='Enter the new desc' value={values.desc} onChange={(e) => setValues({
          ...values,
          desc: e.target.value
        })} /> */}





        {/* <button onClick={() => { check() }}> Click Me</button> */}
        {/* <br /> */}
        
      </div>





    </div>
  )
}

export default UpdateProduct