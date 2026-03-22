type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Select({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 text-gray-100 focus-within:text-blue-100">
      {legend && (
        <legend className="text-xxs md-2 text-inherit">{legend}</legend>
      )}
      <input
        type={type}
        className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-100
         bg-transparent outline-none focus:border-2 focus:border-blue-100 placeholder-gray-100"
        {...rest}
      />
    </fieldset>
  );
}
