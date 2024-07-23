import React, { forwardRef } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  size?: 'default' | 'flex' | 'sm' | 'lg' | 'icon';
} & PressableProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50';
    const variantStyles = {
      default: 'bg-primary',
      destructive: 'bg-destructive',
      outline: 'border border-[#e4e4e7]',
      secondary: 'bg-secondary',
    };
    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      flex: 'flex-1 h-10',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };

    const combinedStyles = twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className);

    return (
      <Pressable ref={ref} className={combinedStyles} {...props}>
        {children}
      </Pressable>
    );
  },
);
