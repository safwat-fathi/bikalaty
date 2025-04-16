import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const RedoIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <path
        d="M3 4.91846V10.5435H8.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.35312 15.231C5.96099 16.9564 7.11313 18.4374 8.63593 19.451C10.1587 20.4647 11.9697 20.9559 13.796 20.8508C15.6223 20.7457 17.3649 20.0499 18.7614 18.8683C20.1578 17.6866 21.1324 16.0832 21.5383 14.2995C21.9442 12.5158 21.7595 10.6485 21.0118 8.97891C20.2642 7.30935 18.9942 5.928 17.3933 5.04297C15.7923 4.15794 13.9471 3.81718 12.1356 4.07205C10.3242 4.32691 8.64461 5.16358 7.35 6.456L3 10.5435"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RedoIcon;
