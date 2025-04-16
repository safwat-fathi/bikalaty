import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const TrashIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none" {...props}>
      <path
        d="M1 3.86652H2.33333H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6654 3.86653V13.1999C11.6654 13.5535 11.5249 13.8926 11.2748 14.1427C11.0248 14.3927 10.6857 14.5332 10.332 14.5332H3.66536C3.31174 14.5332 2.9726 14.3927 2.72256 14.1427C2.47251 13.8926 2.33203 13.5535 2.33203 13.1999V3.86653M4.33203 3.86653V2.53319C4.33203 2.17957 4.47251 1.84043 4.72256 1.59038C4.9726 1.34034 5.31174 1.19986 5.66536 1.19986H8.33203C8.68565 1.19986 9.02479 1.34034 9.27484 1.59038C9.52489 1.84043 9.66536 2.17957 9.66536 2.53319V3.86653"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66797 7.19986V11.1999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33203 7.19986V11.1999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
