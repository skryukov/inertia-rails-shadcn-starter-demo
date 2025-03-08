import { type ReactNode, useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AuthCardLayoutTemplate from "@/layouts/auth/auth-card-layout"
import AuthSimpleLayoutTemplate from "@/layouts/auth/auth-simple-layout"
import AuthSplitLayoutTemplate from "@/layouts/auth/auth-split-layout"

type LayoutType = "simple" | "split" | "card"

export default function AuthLayout({
  children,
  title,
  description,
  defaultLayout = "simple",
  ...props
}: {
  children: ReactNode
  title: string
  description: string
  defaultLayout?: LayoutType
}) {
  const [layoutType, setLayoutType] = useState<LayoutType>(() => {
    const savedLayout = localStorage.getItem("auth-layout-preference")
    return (savedLayout as LayoutType) || defaultLayout
  })
  useEffect(() => {
    localStorage.setItem("auth-layout-preference", layoutType)
  }, [layoutType])

  const LayoutComponent = {
    simple: AuthSimpleLayoutTemplate,
    split: AuthSplitLayoutTemplate,
    card: AuthCardLayoutTemplate,
  }[layoutType]

  return (
    <>
      <div className="bg-background fixed right-4 bottom-4 z-50 rounded-md shadow-md">
        <Select
          value={layoutType}
          onValueChange={(value) => setLayoutType(value as LayoutType)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="simple">Simple Layout</SelectItem>
            <SelectItem value="split">Split Layout</SelectItem>
            <SelectItem value="card">Card Layout</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LayoutComponent title={title} description={description} {...props}>
        {children}
      </LayoutComponent>
    </>
  )
}
