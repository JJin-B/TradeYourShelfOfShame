import React from "react";
import { useNavigate } from "react-router-dom";

interface MailboxProps {
  width?: string;
}

const mailboxIconStyle = {
  position: "relative" as const,
  display: "inline" as const,
};

const mailboxNumStyle = {
  position: "absolute" as const,
  right: "0" as const,
  margin: "-6px" as const,
  backgroundColor: "rgb(29, 161, 242)" as const,
  fontSize: "11px" as const,
  color: "white" as const,
  display: "inline" as const,
  padding: "3px 5px" as const,
  borderRadius: "20px" as const,
};

const MailboxIcon: React.FC<MailboxProps> = () => {
  const navigator = useNavigate();
  const mailboxOnClick = () => {
    navigator("/chat");
  };
  const count = 1;
  return (
    <button
      onClick={mailboxOnClick}
      className="hover:translate-y-[-5px] transition-transform mt-1"
      type="button"
    >
      <div style={mailboxIconStyle}>
        {count > 0 ? <div style={mailboxNumStyle}>{count}</div> : null}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30px"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color="white"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <polyline points="2 9 12 15 22 9" />
        </svg>
      </div>
    </button>
  );
};

export default MailboxIcon;
