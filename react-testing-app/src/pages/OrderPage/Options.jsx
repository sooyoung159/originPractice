import React from "react";

const Options = (props) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${props.name} option`}
        onChange={(event) => {
          props.updateItemCount(props.name, event.target.checked ? 1 : 0);
        }}
      />{" "}
      <label htmlFor={`${props.name} option`}>{props.name}</label>
    </form>
  );
};

export default Options;
