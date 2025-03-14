import type { ReactNode } from "react"
import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { useFlash } from "@/hooks/use-flash"
import AppHeaderLayoutTemplate from "@/layouts/app/app-header-layout"
import AppSidebarLayoutTemplate from "@/layouts/app/app-sidebar-layout"
import type { BreadcrumbItem } from "@/types"

type LayoutType = "header" | "sidebar"
interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) {
  const [layoutType, setLayoutType] = useState<LayoutType>(() => {
    const savedLayout = localStorage.getItem("app-layout-preference")
    return (savedLayout as LayoutType) || "sidebar"
  })
  useEffect(() => {
    localStorage.setItem("app-layout-preference", layoutType)
  }, [layoutType])
  useFlash()

  const LayoutComponent = {
    header: AppHeaderLayoutTemplate,
    sidebar: AppSidebarLayoutTemplate,
  }[layoutType]

  useFlash()
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 bg-background rounded-md shadow-md">
        <Select
          value={layoutType}
          onValueChange={(value) => setLayoutType(value as LayoutType)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sidebar">Sidebar Layout</SelectItem>
            <SelectItem value="header">Header Layout</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster richColors />
      </LayoutComponent>
    </>
  )
}
