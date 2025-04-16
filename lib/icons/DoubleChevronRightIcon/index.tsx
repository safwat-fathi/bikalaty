import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const DoubleChevronRightIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g id="chevrons-right">
        <path
          id="Vector"
          d="M13 17L18 12L13 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M6 17L11 12L6 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DoubleChevronRightIcon;
