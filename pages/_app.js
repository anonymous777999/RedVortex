import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Initialize theme on first load
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  return (
    <Layout>
      <div key={router.asPath} className="page-transition">
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}
