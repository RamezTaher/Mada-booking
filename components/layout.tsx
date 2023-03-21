import Header from "./header"
import Footer from "./footer"
import { ReactNode } from "react"
import { useRouter } from "next/router"

interface Props {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  const router = useRouter()
  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Header />
      {children}
      <Footer 
      />
    </div>
  )
}
