import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const DownloadIcon = ({ fill, ...props }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <g id="download">
        <path
          id="Vector"
          d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5"
          stroke={fill || "#8A1222"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M4.6665 7.16669L7.99984 10.5L11.3332 7.16669"
          stroke={fill || "#8A1222"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path id="Vector_3" d="M8 10.5V2.5" stroke={fill || "#8A1222"} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export default DownloadIcon;
