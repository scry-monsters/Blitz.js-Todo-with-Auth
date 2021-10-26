import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import ButtonAppBar from "./AppBar"
import Footer from "./Footer/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  console.log(title)
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ButtonAppBar title={title} />
      </Suspense>
      <Head>
        <title>{title || "todoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
      <div>
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  )
}

export default Layout
