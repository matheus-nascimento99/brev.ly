import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: [
    'cursor-pointer',
    'inline-flex items-center justify-center',
    '!text-md-semibold',
    'border border-transparent',
    'transition-colors duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:!border-transparent',
  ],
  variants: {
    variant: {
      primary: ['bg-blue-base text-white', 'hover:bg-blue-dark'],
      secondary: [
        'bg-gray-200 text-gray-500 border-blue-200',
        'hover:border-blue-base',
      ],
    },
    size: {
      sm: 'h-8 text-sm rounded p-2',
      md: 'h-12 rounded-lg',
    },
    iconOnly: {
      true: 'gap-0 size-8',
      false: 'gap-1.5',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
    fullWidth: true,
  },
})

type ButtonVariants = VariantProps<typeof button>

type ButtonProps = ComponentProps<'button'> & ButtonVariants

export const Button = ({
  variant,
  size,
  iconOnly,
  fullWidth,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={button({ variant, size, iconOnly, fullWidth, className })}
      {...rest}
    />
  )
}
