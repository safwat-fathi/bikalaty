import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const ChevronDownIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" {...props}>
      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ChevronDownIcon;
