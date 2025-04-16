import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const StarIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" {...props}>
      <path
        d="M10 -0.00354004L12.2451 6.90629H19.5106L13.6327 11.1768L15.8779 18.0866L10 13.8161L4.12215 18.0866L6.36729 11.1768L0.489435 6.90629H7.75486L10 -0.00354004Z"
        fill={fill || "#E9C66B"}
      />
    </svg>
  );
};

export default StarIcon;
