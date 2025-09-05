import React from "react";

interface IPlayIconProps {
  className?: string;
  type?: "play" | "pause" | "loading";
}

export default function PlayIcon(props: IPlayIconProps) {
  const { className, type } = props;

  switch (type) {
    case "loading":
      return (
        <svg
          className={`${className ?? ""} animate-spin`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="80"
          height="80"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      );
    case "pause":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="52"
          viewBox="0 0 49 52"
          fill="none"
          className={className}
        >
          <rect width="18" height="52" rx="5" fill="#FFFFFFBB" />
          <rect x="31" width="18" height="52" rx="5" fill="#FFFFFFBB" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="47"
          viewBox="0 0 34 47"
          fill="none"
          className={className}
        >
          <path
            d="M32.2263 22.0551C33.3414 22.8529 33.3414 24.5106 32.2263 25.3083L3.16369 46.1001C1.8401 47.047 0 46.1009 0 44.4735V2.88995C0 1.26252 1.8401 0.316433 3.16369 1.26334L32.2263 22.0551Z"
            fill="#FFFFFFBB"
          />
        </svg>
      );
  }
}
