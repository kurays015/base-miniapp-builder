interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  hint?: string;
}

export function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  hint,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-base-border bg-base-card text-white
          text-sm focus:outline-none focus:border-base-blue/60 transition-colors appearance-none
          cursor-pointer hover:border-base-border/80"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-base-card">
            {opt}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-base-muted">{hint}</p>}
    </div>
  );
}
