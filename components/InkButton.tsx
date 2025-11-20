import React from 'react';

interface InkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const InkButton: React.FC<InkButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-serif font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed px-8 py-3 rounded-sm";
  
  const variants = {
    primary: "bg-yanyun-gold text-black hover:bg-yellow-600 shadow-[0_0_15px_rgba(204,164,106,0.3)] border border-yellow-500",
    secondary: "bg-transparent text-yanyun-paper border border-yanyun-paper/30 hover:border-yanyun-gold hover:text-yanyun-gold",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          正在运功...
        </span>
      ) : (
        children
      )}
    </button>
  );
};