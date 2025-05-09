import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const DangerIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height="30px"
      width="25px"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 54.264 54.264"
      xmlSpace="preserve"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M52.021,49.561c-0.011-0.001-0.02-0.001-0.029,0H2.244c-0.813,0-1.563-0.439-1.959-1.15     c-0.397-0.71-0.378-1.579,0.049-2.271L25.207,5.769c0.408-0.663,1.132-1.066,1.911-1.066c0.777,0,1.502,0.403,1.91,1.066     l24.704,40.098c0.332,0.392,0.532,0.897,0.532,1.451C54.265,48.556,53.261,49.561,52.021,49.561z M6.263,45.073h41.709     L27.118,11.224L6.263,45.073z"
      />
      <path
        stroke="currentColor"
        // style={{ fill: "#010002" }}
        d="M27.116,38.89c0.584,0,1.082,0.205,1.492,0.612c0.408,0.412,0.613,0.907,0.613,1.49     c0,0.586-0.217,1.081-0.648,1.493c-0.434,0.406-0.919,0.612-1.457,0.612c-0.537,0-1.022-0.206-1.455-0.612     c-0.432-0.412-0.646-0.907-0.646-1.493c0-0.583,0.203-1.078,0.613-1.49C26.036,39.094,26.532,38.89,27.116,38.89z M28.589,35.945     h-2.944V18.062h2.944V35.945z"
      />
    </svg>
  );
};

export default DangerIcon;
