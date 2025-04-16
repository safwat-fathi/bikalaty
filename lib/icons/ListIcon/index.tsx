import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const ListIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none" {...props}>
      <g id="list">
        <path
          id="Vector"
          d="M10.667 8.5H28.0003"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M10.667 16.5H28.0003"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M10.667 24.5H28.0003"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M4 8.5H4.01333"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M4 16.5H4.01333"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_6"
          d="M4 24.5H4.01333"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ListIcon;
