import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const AddIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <g id="gala:add">
        <g id="Group">
          <path
            id="Vector"
            d="M10 19.25C14.8325 19.25 18.75 15.3325 18.75 10.5C18.75 5.66751 14.8325 1.75 10 1.75C5.16751 1.75 1.25 5.66751 1.25 10.5C1.25 15.3325 5.16751 19.25 10 19.25Z"
            stroke={fill || "#8A1222"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M6.25 10.5H13.75"
            stroke={fill || "#8A1222"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M10 6.75V14.25"
            stroke={fill || "#8A1222"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default AddIcon;
