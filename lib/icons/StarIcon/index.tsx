import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const StarIcon = ({ fill, ...props }: Props) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" {...props}>
    //   <path
    //     d="M10 -0.00354004L12.2451 6.90629H19.5106L13.6327 11.1768L15.8779 18.0866L10 13.8161L4.12215 18.0866L6.36729 11.1768L0.489435 6.90629H7.75486L10 -0.00354004Z"
    //     fill={fill || "#E9C66B"}
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill || "#E9C66B"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
    </svg>
  );
};

export default StarIcon;
