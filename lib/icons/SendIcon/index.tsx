import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SendIcon = ({ fill, ...props }: Props) => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="send">
        <path
          id="Vector"
          d="M6.24937 8.875L13.1244 2M6.24937 8.875L8.43687 13.25C8.46429 13.3098 8.50832 13.3605 8.56372 13.3961C8.61911 13.4316 8.68355 13.4505 8.74937 13.4505C8.8152 13.4505 8.87963 13.4316 8.93503 13.3961C8.99043 13.3605 9.03445 13.3098 9.06187 13.25L13.1244 2M6.24937 8.875L1.87437 6.6875C1.81453 6.66008 1.76383 6.61605 1.72828 6.56066C1.69273 6.50526 1.67383 6.44082 1.67383 6.375C1.67383 6.30918 1.69273 6.24474 1.72828 6.18934C1.76383 6.13395 1.81453 6.08992 1.87437 6.0625L13.1244 2"
          stroke={fill || "#8A1222"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default SendIcon;
