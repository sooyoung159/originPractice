import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "./Type";

const OrderPage = (props) => {
  const [orderData] = useContext(OrderContext);

  return (
    <div>
      <h1>주문 페이지</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div>
          <h2>총 가격: {orderData.total.total}</h2>
          <br />
          <button onClick={() => props.setStep(1)}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
