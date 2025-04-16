import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const GridIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none" {...props}>
      <g id="grid">
        <path
          id="Vector"
          d="M13.3333 4.5H4V13.8333H13.3333V4.5Z"
          stroke={fill || "#8A1222"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M28.0003 4.5H18.667V13.8333H28.0003V4.5Z"
          stroke={fill || "#8A1222"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M28.0003 19.1667H18.667V28.5H28.0003V19.1667Z"
          stroke={fill || "#8A1222"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M13.3333 19.1667H4V28.5H13.3333V19.1667Z"
          stroke={fill || "#8A1222"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default GridIcon;
