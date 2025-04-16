import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const FilterIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none" {...props}>
      <g id="filter">
        <path
          id="Vector"
          d="M29.3337 4.5H2.66699L13.3337 17.1133V25.8333L18.667 28.5V17.1133L29.3337 4.5Z"
          stroke="#8A1222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default FilterIcon;
