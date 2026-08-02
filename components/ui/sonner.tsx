"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InfoIcon from "@mui/icons-material/Info"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import CancelIcon from "@mui/icons-material/Cancel"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon style={{ fontSize: 16 }} />
        ),
        info: (
          <InfoIcon style={{ fontSize: 16 }} />
        ),
        warning: (
          <WarningAmberIcon style={{ fontSize: 16 }} />
        ),
        error: (
          <CancelIcon style={{ fontSize: 16 }} />
        ),
        loading: (
          <span className="size-4 animate-pulse rounded-[4px] bg-[#737373]" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
