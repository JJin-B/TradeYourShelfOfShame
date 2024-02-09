import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const WrapperComponent: React.FC<Props> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default WrapperComponent;
