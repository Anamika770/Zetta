export const Button = ({ 
  onClick, 
  children, 
  variant = "primary", 
  className = "",
  type = "button",
  ...props 
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    success: "bg-green-600 hover:bg-green-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-md text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
