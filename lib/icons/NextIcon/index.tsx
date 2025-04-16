import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  isActive?: boolean;
  isLeftToRight?: boolean;
};

const NextIcon = ({ isActive, isLeftToRight, ...props }: Props) => {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Group 20581">
        <circle
          id="Ellipse 6"
          cx="12.5"
          cy="12.5"
          r="12.5"
          transform="matrix(1 0 0 -1 0 25.5)"
          fill={isActive ? "#01A89F" : "#EEEEEE"}
        />
        <path
          id="Vector 6"
          d="M11.2305 16.6926L14.0369 13.4184C14.377 13.0217 14.3542 12.43 13.9848 12.0606L11.2305 9.30626"
          stroke={isActive ? "white" : "#BFBFBF"}
          strokeWidth="1.5"
          transform={isLeftToRight ? "rotate(180, 12, 13)" : ""}
        />
      </g>
    </svg>
  );
};

export default NextIcon;
