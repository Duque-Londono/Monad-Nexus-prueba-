import './globals.css'

export const metadata = {
  title: 'Monad Nexus',
  description: 'DeCompute Coordinativo sobre Monad Testnet',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  )
}
