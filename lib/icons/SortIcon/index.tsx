import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SortIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none" {...props}>
      <g id="Group 21363">
        <g id="Group 21361">
          <path
            id="Vector"
            d="M17.2872 9.97821L14.5753 12.6902L11.8633 9.97821"
            stroke={fill || "#989898"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M14.547 12.664L14.5733 1.78985"
            stroke={fill || "#989898"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="Group 21362">
          <path
            id="Vector_3"
            d="M2.7832 4.21198L5.49517 1.5L8.20714 4.21198"
            stroke={fill || "#989898"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_4"
            d="M5.44836 12.3945L5.49069 1.5043"
            stroke={fill || "#989898"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default SortIcon;
