import axios from "axios";
import { useState } from "react";
import "./App.css";

import useRazorpay, { RazorpayOptions } from "react-razorpay";

interface PayData {
  amount: string;
  currency: string;
  id: string;
}

const App = () => {
  const Razorpay = useRazorpay();
  const [shoe, setShoe] = useState({
    name: "Training Shoes",
    creator: "Nike",
    img: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 60000,
  });

  const initPay = (data: PayData) => {
    const options: RazorpayOptions = {
      key: "rzp_test_DPn50kPkUTWgOa",
      amount: data.amount,
      currency: data.currency,
      name: shoe.name,
      description: "Test",
      image: shoe.img,
      order_id: data.id,
      handler: async (response: any) => {
        try {
          const verifyURL = "http://localhost:8080/api/payment/verify";
          await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    // const rzp1 = new window.Razorpay(options);
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8080/api/payment/orders";
      const data = await axios.post(orderURL, { amount: shoe.price });
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="shoe_container">
        <img src={shoe.img} alt="shoe_img" className="shoe_img" />
        <p className="shoe_name">{shoe.name}</p>
        <p className="shoe_creator">By {shoe.creator}</p>
        <p className="shoe_price">Price: {shoe.price}</p>
        <button onClick={handlePay} className="buyBtn">
          Buy Shoes
        </button>
      </div>
    </div>
  );
};

export default App;
