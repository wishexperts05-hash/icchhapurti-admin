import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text = "Button",
  icon = null,
  onClick,
  type = "button",
  variant = 1,
  disabled = false,
}) => {
  const getButtonClass = () => {
    if (disabled) {
      return "bg-gray-300 text-white px-6 py-3 rounded-xl flex justify-center items-center gap-2 border border-gray-300 cursor-not-allowed font-medium shadow-none";
    }

    switch (variant) {
      //save and update button
      case 1:
        return `bg-[#CCA547] text-white px-6 py-3 rounded-xl 
                flex justify-center items-center gap-2 cursor-pointer 
                font-medium shadow-md 
                hover:bg-[#CCA547]/90 hover:shadow-lg 
                transition duration-300`;

      //Cancel button
      case 2:
        return `border border-[#CCA547] text-[#CCA547] px-6 py-3 rounded-xl
                flex justify-center items-center gap-2 cursor-pointer 
                font-medium hover:bg-[#CCA547] hover:shadow-lg hover:text-white
                transition duration-300`;

      //Approve button
      case 3:
        return `bg-green-600 text-white px-6 py-3 rounded-xl 
                 flex justify-center items-center gap-2 cursor-pointer 
                 font-medium shadow-md 
                 hover:bg-green-700 hover:shadow-lg 
                transition duration-300`;
          


      //Reject button
      case 4:
        return `bg-red-600 text-white px-6 py-3 rounded-xl 
               flex justify-center items-center gap-2 cursor-pointer 
                font-medium shadow-md 
                 hover:bg-red-700 hover:shadow-lg 
                 transition duration-300
`;



      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-base ${getButtonClass()}`}
    >
      {text}
      {icon}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([1, 2, 3, 4]),
  disabled: PropTypes.bool,
};

export default Button;
