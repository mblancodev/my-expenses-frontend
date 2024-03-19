export interface FormItemProps {
  children: React.ReactNode;
  label: string;
  htmlFor?: string;
}

export const FormItem = ({ label, children, htmlFor }: FormItemProps) => {
  return (
    <div className="relative">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="mt-0.5">{children}</div>
    </div>
  );
};
