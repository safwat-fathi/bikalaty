import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const FacebookIcon = (props: Props) => {
  return (
    <svg width="50" height="51" viewBox="0 0 50 51" xmlns="http://www.w3.org/2000/svg" fill="white" {...props}>
      <path d="M27.444 19.0639H29.101V16.1779C28.2994 16.0898 27.4935 16.0471 26.687 16.0499C24.298 16.0499 22.661 17.5499 22.661 20.3149V22.8559H20.025V26.0819H22.661V34.1999H25.893V26.0829H28.423L28.823 22.8569H25.893V20.6349C25.893 19.7029 26.145 19.0639 27.444 19.0639Z" />
    </svg>
  );
};

export default FacebookIcon;
