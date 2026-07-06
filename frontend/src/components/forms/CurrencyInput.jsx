import { useId } from "react";

function CurrencyInput({
  label,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
}) {
  const id = useId();

  const formatIndianNumber = (number) => {
    if (!number) return "";

    const numeric = number.toString().replace(/\D/g, "");

    if (!numeric) return "";

    return new Intl.NumberFormat("en-IN").format(Number(numeric));
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    onChange({
      target: {
        name,
        value: rawValue,
      },
    });
  };

  return (
    <div className="relative">

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-slate-500">
        ₹
      </span>

      <input
        id={id}
        type="text"
        value={formatIndianNumber(value)}
        onChange={handleChange}
        placeholder=" "
        required={required}
        disabled={disabled}
        className="peer w-full rounded-2xl border border-slate-300 bg-white pb-3 pl-10 pr-4 pt-6 text-slate-900 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
      />

      <label
        htmlFor={id}
        className="absolute left-10 top-2 text-xs font-medium text-slate-500 transition-all
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

export default CurrencyInput;