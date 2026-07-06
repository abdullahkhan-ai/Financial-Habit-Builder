import { useId } from "react";

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder = " ",
  required = false,
  disabled = false,
}) {
  const id = useId();

  return (
    <div className="relative">

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="peer w-full rounded-2xl border border-slate-300 bg-white px-4 pb-3 pt-6 text-slate-900 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
      />

      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-xs font-medium text-slate-500 transition-all
        peer-placeholder-shown:top-5
        peer-placeholder-shown:text-base
        peer-placeholder-shown:font-normal
        peer-placeholder-shown:text-slate-400
        peer-focus:top-2
        peer-focus:text-xs
        peer-focus:font-medium
        peer-focus:text-blue-600"
      >
        {label}
      </label>

    </div>
  );
}

export default FloatingInput;
