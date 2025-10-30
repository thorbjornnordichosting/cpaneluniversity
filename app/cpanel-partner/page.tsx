'use client'

import Link from 'next/link'

export default function CpanelPartner() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <header className="p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">cP</span>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              cPanel University
            </h1>
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-12 border border-white/10 shadow-2xl shadow-orange-500/10 text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-orange-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h2 className="text-5xl font-bold text-white mb-4">
                cPanel Certified Partner Accreditation
              </h2>
              <div className="inline-block px-6 py-2 bg-orange-500/20 rounded-full border border-orange-400/30 mb-6">
                <span className="text-orange-300 font-semibold">🚧 Kommer snart!</span>
              </div>
            </div>

            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Denna kurs är under utveckling och kommer att innehålla allt du behöver veta för att bli en certifierad cPanel-partner.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-orange-300/10">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-white font-bold text-lg mb-2">Omfattande Material</h3>
                <p className="text-orange-200 text-sm">
                  Allt du behöver för certifieringen
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-orange-300/10">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-white font-bold text-lg mb-2">Praktiska Exempel</h3>
                <p className="text-orange-200 text-sm">
                  Verkliga scenarios och lösningar
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-orange-300/10">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-white font-bold text-lg mb-2">Certifiering</h3>
                <p className="text-orange-200 text-sm">
                  Bli en officiell cPanel Partner
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/quiz"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                ← Prova LiteSpeed-kursen
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white/20 backdrop-blur-xl rounded-2xl font-bold text-white hover:bg-white/30 transition-all"
              >
                Tillbaka hem
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-orange-300 text-sm">
          © 2025 cPanel University - Powered by LiteSpeed ⚡
        </p>
      </footer>
    </main>
  )
}

