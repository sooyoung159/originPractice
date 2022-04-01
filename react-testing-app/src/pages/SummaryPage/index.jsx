import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = (props) => {
  const [checked, setChecked] = useState(false);
  const [orderData] = useContext(OrderContext);
  const productArray = Array.from(orderData.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderData.options.size > 0;
  let optionsDisplay = null;

  if (hasOptions) {
    const optionsArray = Array.from(orderData.options.key());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionsDisplay = (
      <div>
        <h2>옵션: {orderData.total.options}</h2>
        <ul>{optionList}</ul>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderData.total.products}</h2>
      <ul>{productList}</ul>
      {optionsDisplay}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
