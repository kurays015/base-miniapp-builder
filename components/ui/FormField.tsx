interface FormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "color";
  hint?: string;
  required?: boolean;
}

export function FormField({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  required,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-base-blue ml-1">*</span>}
      </label>
      <div className="relative">
        {type === "color" ? (
          <div className="flex items-center gap-3">
            <input
              id={id}
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 rounded-lg border border-base-border bg-base-card cursor-pointer p-1"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-4 py-2.5 rounded-lg border border-base-border bg-base-card text-white
                text-sm font-mono placeholder:text-base-muted/50 focus:outline-none focus:border-base-blue/60
                transition-colors hover:border-base-border/80"
            />
          </div>
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-lg border border-base-border bg-base-card text-white
              text-sm placeholder:text-base-muted/50 focus:outline-none focus:border-base-blue/60
              transition-colors hover:border-base-border/80"
          />
        )}
      </div>
      {hint && <p className="text-xs text-base-muted">{hint}</p>}
    </div>
  );
}
