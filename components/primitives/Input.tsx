import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

type InputSize = 'sm' | 'md' | 'lg';

// Omit 'size' from HTMLInputElement to avoid conflict with our custom size prop
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  inputSize = 'md',
  fullWidth = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={clsx('space-y-1', fullWidth ? 'w-full' : 'w-fit')}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'block w-full rounded-md border-gray-300 shadow-sm',
          'focus:border-blue-500 focus:ring-blue-500',
          'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
          error ? 'border-red-500' : 'border',
          sizeStyles[inputSize as InputSize],
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
