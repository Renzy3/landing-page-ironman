import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Reusable Button component with Iron Man / Stark Industries theme variants.
 *
 * Variants:
 *  - default     : crimson gradient with subtle glow
 *  - outline     : transparent with crimson border, hover fill
 *  - cyan-glow   : arc-reactor cyan with intense glow effect
 *  - gold-metallic: brushed gold gradient (premium CTAs)
 *  - ghost       : completely transparent, minimal styling
 *
 * Sizes: sm | md | lg | icon
 */

const variantClasses = {
  default:
    'bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white border border-red-600/50 hover:from-red-700 hover:via-red-600 hover:to-red-700 shadow-[0_0_20px_rgba(139,26,42,0.5)] hover:shadow-[0_0_30px_rgba(192,57,43,0.7)]',
  outline:
    'bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/5 hover:text-white',
  'cyan-glow':
    'bg-transparent text-arc-cyan border border-arc-cyan/60 hover:bg-arc-cyan/10 hover:border-arc-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:text-shadow-cyan',
  'gold-metallic':
    'bg-gold-metallic text-black font-bold border border-stark-gold/80 hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]',
  ghost:
    'bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-0',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  icon: 'p-2 aspect-square',
};

const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = 'default',
    size = 'md',
    disabled = false,
    onClick,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center gap-2',
        'font-rajdhani font-semibold uppercase tracking-widest',
        'rounded-sm transition-all duration-300 ease-out',
        'cursor-pointer select-none',
        'btn-ripple',
        // Disabled
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        // Variant
        variantClasses[variant] ?? variantClasses.default,
        // Size
        sizeClasses[size] ?? sizeClasses.md,
        // Consumer overrides
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export { Button };
export default Button;
