import React from "react";

const Form = ({ onSubmit, children, className = "" }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    onSubmit && onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
