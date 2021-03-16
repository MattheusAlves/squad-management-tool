import React from 'react'
import Header from '@/components/shared/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}
export default function BaseLayout(props: BaseLayoutProps) {
  const { children } = props
  return (
    <div className="base-layout">
      <Header />
      <div className="children">{children}</div>
    </div>
  )
}
