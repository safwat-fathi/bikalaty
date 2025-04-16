import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const ChevronUpIcon = (props: Props) => {
  return (
    <svg
      className="inline-block h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeWidth="1.5" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
};

export default ChevronUpIcon;
