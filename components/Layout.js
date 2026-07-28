import Navbar from './Navbar'
import Footer from './Footer'
import MatrixRain from './MatrixRain'

export default function Layout({ children }) {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
