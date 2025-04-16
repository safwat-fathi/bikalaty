import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  isActive?: boolean;
  isLeftToRight?: boolean;
};

const PrevIcon = ({ isActive, isLeftToRight, ...props }: Props) => {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Group 20444">
        <circle
          id="Ellipse 6"
          cx="12.5"
          cy="12.5"
          r="12.5"
          transform="matrix(-1 0 0 1 25 0.5)"
          fill={isActive ? "#01A89F" : "#EEEEEE"}
        />
        <path
          id="Vector 6"
          d="M13.7695 9.30737L10.9631 12.5816C10.623 12.9783 10.6458 13.57 11.0152 13.9394L13.7695 16.6937"
          stroke={isActive ? "#FFFFFF" : "#BFBFBF"}
          strokeWidth="1.5"
          transform={isLeftToRight ? "rotate(180, 12, 13)" : ""}
        />
      </g>
    </svg>
  );
};

export default PrevIcon;
