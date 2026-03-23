// type Props = React.ComponentProps<"input"> & {
//   legend?: string;
// };

// export function Input({ legend, type = "text", ...rest }: Props) {
//   return (
//     <fieldset className="flex flex-1 max-h-20 text-gray-100 focus-within:text-blue-100">
//       {legend && (
//         <legend className="text-xxs md-2 text-inherit">{legend}</legend>
//       )}
//       <input
//         type={type}
//         className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-100
//          bg-transparent outline-none focus:border-2 focus:border-blue-100 placeholder-gray-100"
//         {...rest}
//       />
//     </fieldset>
//   );
// }

import type { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"input"> & {
  legend?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export function Input({
  legend,
  type = "text",
  leftElement,
  rightElement,
  className,
  ...rest
}: Props) {
  return (
    <fieldset className="flex flex-1 flex-col text-gray-100 focus-within:text-blue-100">
      {legend && (
        <legend className="text-xxs mb-2 text-inherit">{legend}</legend>
      )}

      <div className="relative">
        {leftElement && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-inherit pointer-events-none">
            {leftElement}
          </span>
        )}

        <input
          type={type}
          className={`w-full h-12 rounded-lg border border-gray-300 bg-transparent text-sm text-gray-100 outline-none placeholder-gray-100 focus:border-2 focus:border-blue-100 ${
            leftElement ? "pl-10" : "px-4"
          } ${rightElement ? "pr-10" : "px-4"} ${className ?? ""}`}
          {...rest}
        />

        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-inherit">
            {rightElement}
          </span>
        )}
      </div>
    </fieldset>
  );
}
