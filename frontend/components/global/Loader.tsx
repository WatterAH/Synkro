import React from "react";

interface Props {
  size?: "small" | "large";
  color?: "dark" | "white" | "cambridge";
}

const Loader: React.FC<Props> = ({ size = "small", color = "cambridge" }) => {
  const sizes = { small: "h-5 w-5", large: "h-10 w-10" };

  const colors = {
    dark: "border-black",
    white: "border-white",
    cambridge: "border-cambridge",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizes[size]} ${colors[color]} border-t-2`}
      ></div>
    </div>
  );
};

export default Loader;
