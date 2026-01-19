import React from 'react';
import { ArrowUpRight, ArrowRight, ArrowUpLeft } from 'lucide-react';
import Link from 'next/link';

export interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'white';
  icon?: 'arrow-up-right' | 'arrow-right' | 'arrow-up-left' | null;
  [x: string]: any;
}

const VARIANT_STYLES = {
  primary: 'bg-primary text-white',
  secondary: 'values-card-bg text-primary border border-primary',
  tertiary: 'bg-transparent text-white',
  white: 'bg-transparent text-foreground',
} as const;

const ICON_STYLES = {
  primary: 'bg-white text-primary',
  secondary: 'bg-primary text-card-bg',
  tertiary: 'bg-primary text-white',
  white: 'bg-transparent text-primary border border-secondary-main',
} as const;

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  className = '',
  variant = 'primary',
  icon = null,
  ...props
}) => {
  const IconComponent =
    icon === 'arrow-up-right'
      ? ArrowUpRight
      : icon === 'arrow-right'
      ? ArrowRight
      : icon === 'arrow-up-left'
      ? ArrowUpLeft
      : null;

  const baseStyles = `
    inline-flex items-center gap-3
    px-6 py-3 rounded-full text-lg
    group
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
    transition-all duration-200
  `;

  const variantStyles = VARIANT_STYLES[variant];
  const iconColors = ICON_STYLES[variant];

  const iconClass = `
    w-10 h-10 rounded-full
    flex items-center justify-center
    ${iconColors}
    transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
    
    ${IconComponent === ArrowUpLeft ? 'group-hover:-rotate-45 group-focus-visible:-rotate-45' :'group-hover:rotate-45 group-focus-visible:rotate-45'}
    group-active:scale-90
    ${variant === 'white' ? 'p-2' : 'p-3'}
  `;

  const textClass = `
    transition-all duration-300
    group-hover:opacity-90
  `;

  const content = (
    <>
      {/* LEFT ICON (only ArrowUpLeft) */}
      {icon === 'arrow-up-left' && IconComponent && (
        <IconComponent className={iconClass} />
      )}

      <span className={textClass}>{children}</span>

      {/* RIGHT ICON (all others) */}
      {icon !== 'arrow-up-left' && IconComponent && (
        <IconComponent className={iconClass} />
      )}
    </>
  );

  const Comp: any = href ? Link : 'button';

  return (
    <Comp
      {...(href ? { href } : {})}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </Comp>
  );
};

export default Button;
