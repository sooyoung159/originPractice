import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";
import { OrderContext } from "../../contexts/OrderContext";

const Type = (props) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(props.orderType);
  }, [props.orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`https://localhost:4000/${orderType}`);
      setItems(response.data);
    } catch (err) {
      setError(true);
    }
  };

  const ItemComponent = props.orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePate}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, props.orderType)
      }
    />
  ));

  if (error) <ErrorBanner message="에러가 발생했습니다" />;
  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격:</p>
      <p>총 가격: {orderData.total[props.orderType]}</p>
      <div
        style={{
          display: "flex",
          flexDirection: props.orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
};

export default Type;
