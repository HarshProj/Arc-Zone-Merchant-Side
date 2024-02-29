import React, { useEffect, useState } from "react";
import './CSS/ViewProduct.css'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";



import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ViewProduct() {
  const [pic, setPic] = useState([]);

  const navigate = useNavigate();
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);






  useEffect(() => {


const token = localStorage.getItem("jwt");
    if(!token){
      navigate('/signin')
    }

    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        // setPosts(result)
        console.log(pic);
      });
  }, []);

  const removePost = (productid) => {
    fetch(`http://localhost:5000/deleteProduct/${productid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyB(result.message);
      });
  };

  
  return (
    <div className="viewProduct">
      <div className="vp_main_body">
        <div className="main_body_itmes">
          {pic.map((pics) => {
            return [
              <>
                <div className="crd">

                  
                  <Card className="item-card" style={{ width: "18rem" }}>
                    <Card.Img className="ut" variant="top" src={pics.pic} />
                    <Card.Body>
                      <Card.Title className="Merchant-produtc-name">{pics.title}</Card.Title>
                      <Card.Text className="Merchant-produtc-price">Rs. {pics.price} </Card.Text>
                      <Card.Text className="Merchant-produtc-desc">{pics.desc}</Card.Text>


                        <div className="view-products-btn  adt-buttons">

                          <Link to={`/product/${pics._id}`}>
                            <Button className="vp-btn"> Update</Button>
                          </Link>
                      
                          <Button className="vp-btn" onClick={() => {  removePost(pics._id);  }} >
                            Remove
                          </Button>

                        </div>

                        

                    </Card.Body>
                  </Card>



                </div>
              </>,
            ];
          })}
        </div>
      </div>
    </div>
  );
}
