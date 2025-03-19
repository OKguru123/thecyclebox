interface IInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | false;
  label: string;
  className?: string;
  name: string;
  readOnly?: boolean;
}
const Input = (props: IInput) => {
  const { value, onChange, error, label, className, name, readOnly } = props;
  return (
    <>
      <div className="input-group relative !mb-1">
        <input
          type="text"
          placeholder=""
          value={value}
          onChange={onChange}
          className={`w-full p-[12px] outline-none border-[1.5px] border-black mt-1 rounded-[10px] h-auto  ${className}`}
          name={name}
          readOnly={readOnly}
        />
        <label
          htmlFor="email"
          className="absolute left-3 top-2 transform -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700 font-light text-[14px] sm:text-[1rem]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-[red] ml-1 text-[9px] sm:text-[12px]">{error}</p>
      )}
    </>
  );
};

export default Input;
