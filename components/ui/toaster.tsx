'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { CheckCircle, ShoppingCart, AlertTriangle, XCircle, Trash2 } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  const getVariantIcon = (variant?: string) => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getActionIcon = (variant?: string) => {
    switch (variant) {
      case 'success':
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case 'error':
        return <Trash2 className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const icon = getVariantIcon(variant as string)
        const actionIcon = getActionIcon(variant as string)
        
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3">
              {icon && (
                <div className="flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {actionIcon && (
                <div className="flex-shrink-0">
                  {actionIcon}
                </div>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
