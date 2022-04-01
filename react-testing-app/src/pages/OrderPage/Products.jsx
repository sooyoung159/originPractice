const Products = (props) => {
  const handleChange = (event) => {
    const currentValue = event.target.value;
    props.updateItemCount(props.name, currentValue);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`https://localhost:4000/${props.imagePath}`}
        alt={`${props.name} product`}
      />
      <form style={{ marginTop: "10px" }}>
        <label htmlFor={props.name} style={{ textAlign: "right" }}>
          {props.name}
        </label>
        <input
          id={props.name}
          style={{ marginLeft: "7px" }}
          type="number"
          name="quantity"
          min="0"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
