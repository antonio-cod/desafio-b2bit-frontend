type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  children,
  isLoading,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="flex items-center justify-center bg-blue-100 rounded-3xl text-white cursor-pointer
     hover:bg-blue-100 transition ease-linear disabled:opacity-50 h-12"
      {...rest}
    >
      {children}
    </button>
  );
}
