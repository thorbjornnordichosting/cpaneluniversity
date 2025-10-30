'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">cP</span>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              cPanel University
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-blue-200 hover:text-white transition-colors">Kurser</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">Dokumentation</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">Support</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Card */}
        <div className="relative z-10 max-w-4xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Välkommen till
            </h2>
            <p className="text-xl md:text-2xl text-blue-200">
              Din moderna webbserver-plattform
            </p>
          </div>

          {/* Kurs-knappar */}
          <div className="flex flex-col items-center space-y-8">
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
              {/* LiteSpeed */}
              <Link
                href="/quiz"
                className="
                  group relative px-12 py-10 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 
                  rounded-3xl font-bold text-white text-2xl md:text-3xl
                  shadow-2xl hover:shadow-blue-500/50 
                  transform hover:scale-105 transition-all duration-300
                  flex items-center justify-center
                "
              >
                <span className="relative z-10 flex items-center space-x-4">
                  <svg 
                    className="w-12 h-12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
                      fill="currentColor"
                      className="group-hover:animate-pulse"
                    />
                  </svg>
                  <span>LiteSpeed</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </Link>

              {/* cPanel Certified Partner */}
              <Link
                href="/cpanel-partner"
                className="
                  group relative px-12 py-10 bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 
                  rounded-3xl font-bold text-white text-2xl md:text-3xl
                  shadow-2xl hover:shadow-orange-500/50 
                  transform hover:scale-105 transition-all duration-300
                  flex items-center justify-center
                "
              >
                <span className="relative z-10 flex items-center space-x-4">
                  <svg 
                    className="w-12 h-12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                      fill="currentColor"
                      className="group-hover:animate-pulse"
                    />
                  </svg>
                  <span className="text-center leading-tight">cPanel<br/>Partner</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl text-center">
              <p className="text-blue-200 text-lg">
                Testa dina kunskaper om LiteSpeed Web Server! ⚡
              </p>
              <p className="text-orange-200 text-lg">
                cPanel Certified Partner Accreditation 🏆
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-blue-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Blixtsnabb</h3>
              <p className="text-blue-200">
                LiteSpeed ger överlägsen prestanda för din webbplats
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-green-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Säker</h3>
              <p className="text-blue-200">
                Inbyggd säkerhet och skydd mot attacker
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-purple-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Optimerad</h3>
              <p className="text-blue-200">
                Automatisk optimering och cache-hantering
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <p className="text-blue-300 text-sm">
            © 2025 cPanel University - Powered by LiteSpeed ⚡
          </p>
        </footer>
      </div>
    </main>
  )
}
