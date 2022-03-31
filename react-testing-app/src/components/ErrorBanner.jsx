import React from "react";

const ErrorBanner = (props) => {
  let errorMessage = props.message || "에러입니다.";

  return (
    <div
      data-testid="error-banner"
      style={{ backgroundColor: "red", color: "white" }}
    >
      {errorMessage}
    </div>
  );
};

export default ErrorBanner;
