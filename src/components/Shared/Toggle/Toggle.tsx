import type { FC } from "react";

export type Props = {
  toggleText: string;
  active: boolean;
  toggleFn: () => void;
};

const Toggle: FC<Props> = ({ toggleText, active, toggleFn }) => {
  const color = active ? "bg-green-400" : "bg-gray-200";
  const slideRight = active && "translate-x-6";

  return (
    <div className="flex items-center justify-center w-full" onClick={toggleFn}>
      <div className="w-2/3">{toggleText}&nbsp;</div>
      <div className="w-1/3">
        <div
          className={`flex items-center h-3 w-10 rounded-full duration-300 ease-in-out ${color}`}
        >
          <div
            className={`bg-white w-5 h-5 border border-gray-400 rounded-full shadow-lg transform duration-300 ease-in-out ${slideRight}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
