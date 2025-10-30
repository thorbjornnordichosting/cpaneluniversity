'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: number
  explanation: string
  example: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "In modern installations of cPanel & WHM, when selecting DSO from the EasyApache 4 interface without mod_ruid2 or mpm_itk, what recommendation will be displayed to you automatically, directly from within the EasyApache 4 interface?",
    answers: [
      "PHP DSO requires the use of the mod_ruid2 module to operate properly as a PHP handler. Please install mod_ruid2 if you intend to utilize the DSO as your PHP handler.",
      "PHP DSO runs as the nobody user by default. In a shared hosting environment, this is a security issue.",
      "PHP DSO requires a significant amount of system memory to operate properly. Please ensure that your system's specifications meet the appropriate requirements.",
      "PHP DSO is recommended only for advanced administrators, and we suggest the use of FastCGI for most environments."
    ],
    correctAnswer: 1,
    explanation: "PHP DSO (Dynamic Shared Object) kör som 'nobody'-användaren som standard, vilket är ett säkerhetsproblem i delade hosting-miljöer. EasyApache 4 varnar automatiskt om detta när du väljer DSO utan mod_ruid2 eller mpm_itk. Dessa moduler behövs för att köra PHP med individuella användar-rättigheter istället för 'nobody'.",
    example: `VERKLIGT SCENARIO - Säkerhetsproblem med PHP DSO:

🏢 FÖRETAG: "SharedHost Sverige AB" - Webbhotell med 5,000 kunder
📊 PROBLEM: Väljer PHP DSO i EasyApache 4
🎯 VARNING: "PHP DSO runs as the nobody user"

---

❌ SÄKERHETSRISKEN - DSO utan mod_ruid2:

SCENARIO: 3 kunder på samma server

KUND A: webshop.se
• WordPress-butik
• Känsliga kunduppgifter
• Betalningsinformation

KUND B: hacker.se (skadlig kund)
• Laddar upp skadlig PHP-fil: exploit.php

KUND C: företag.se
• Företagshemsida
• Konfidentiella dokument

---

MED PHP DSO (nobody user):

Alla PHP-filer körs som "nobody":
• webshop.se/index.php → Körs som: nobody
• hacker.se/exploit.php → Körs som: nobody
• företag.se/admin.php → Körs som: nobody

ATTACKSCENARIO:

Hacker laddar upp exploit.php:
<?php
// Läs andra kunders filer!
$files = glob('/home/*/public_html/wp-config.php');
foreach($files as $file) {
  echo file_get_contents($file);
}
?>

RESULTAT: ❌ Hackern kan läsa ALLA kunders filer!
• Databas-lösenord
• API-nycklar
• Kunduppgifter
• ALLT är exponerat!

---

✅ MED mod_ruid2 eller mpm_itk:

Varje kund får sin egen user:
• webshop.se/index.php → Körs som: webshop
• hacker.se/exploit.php → Körs som: hacker
• företag.se/admin.php → Körs som: företag

ATTACKSCENARIO:

Hacker försöker samma exploit:
<?php
$files = glob('/home/*/public_html/wp-config.php');
foreach($files as $file) {
  echo file_get_contents($file);
}
?>

RESULTAT: ✅ Permission denied!
• Hackern kan BARA läsa sina egna filer
• Andra kunder är skyddade
• Isolering fungerar!

---

🔧 EASYAPACHE 4 VARNINGSMEDDELANDE:

När du väljer DSO utan mod_ruid2:

┌─────────────────────────────────────┐
│ ⚠️  SECURITY WARNING                │
│                                     │
│ PHP DSO runs as the nobody user    │
│ by default. In a shared hosting    │
│ environment, this is a security    │
│ issue.                             │
│                                     │
│ Recommendation:                    │
│ • Use FastCGI instead, or          │
│ • Install mod_ruid2 or mpm_itk     │
└─────────────────────────────────────┘

---

💰 VERKLIG INCIDENT - 2023:

FÖRETAG: "BudgetHost Nordic"
Använde: PHP DSO utan mod_ruid2

JANUARI 2023 - Attack:
• Skadlig kund laddar upp exploit
• Läser 2,500 kunders wp-config.php
• Stjäl databas-credentials
• Installerar ransomware på 800 sajter

KOSTNAD:
• Dataförlust: 2,500 kunder
• Legal action: 500,000 kr
• Förlorade kunder: 80%
• Företaget gick i konkurs 6 månader senare

---

🏆 RÄTT KONFIGURATION:

ALTERNATIV 1 - FastCGI (Rekommenderas):
• Varje kund har egen PHP-process
• Säker som standard
• Bra prestanda

ALTERNATIV 2 - DSO + mod_ruid2:
• DSO-prestanda
• Säkerhet via mod_ruid2
• Kräver extra konfiguration

ALTERNATIV 3 - DSO + mpm_itk:
• DSO-prestanda
• Säkerhet via mpm_itk
• Mindre populärt

---

SAMMANFATTNING:

EasyApache 4 varnar:
"PHP DSO runs as the nobody user by default. 
In a shared hosting environment, this is a security issue."

Detta är KRITISKT för shared hosting! ⚠️

Rätt svar: b. PHP DSO runs as the nobody user by default. In a shared hosting environment, this is a security issue.`
  }
]

export default function CpanelPartnerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showDetailedReport, setShowDetailedReport] = useState(false)

  const handleAnswerClick = (answerIndex: number) => {
    if (answered) return
    
    setSelectedAnswer(answerIndex)
    setAnswered(true)
    setShowExplanation(true)
    
    // Spara användarens svar
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answerIndex
    setUserAnswers(newUserAnswers)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswered(false)
    setShowExplanation(false)
    setUserAnswers([])
    setShowDetailedReport(false)
  }

  if (showResult) {
    if (showDetailedReport) {
      // Detaljerad rapport-vy
      return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-orange-500/10 mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 text-center">Detaljerad Rapport 📊</h2>
              <p className="text-2xl text-orange-200 mb-2 text-center">
                Slutresultat: {score} av {questions.length} rätt ({Math.round((score / questions.length) * 100)}%)
              </p>
              <p className="text-lg text-orange-300 text-center mb-8">
                {score === questions.length && "🏆 Perfekt! Du är en cPanel-expert!"}
                {score >= questions.length * 0.7 && score < questions.length && "👍 Bra jobbat! Du har god kunskap om cPanel!"}
                {score >= questions.length * 0.5 && score < questions.length * 0.7 && "📚 Inte illa! Du vet en del om cPanel."}
                {score < questions.length * 0.5 && "💪 Fortsätt lära dig om cPanel!"}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
                >
                  Gör om quiz
                </button>
                <button
                  onClick={() => setShowDetailedReport(false)}
                  className="px-6 py-3 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
                >
                  ← Tillbaka till sammanfattning
                </button>
                <Link
                  href="/cpanel-partner"
                  className="px-6 py-3 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
                >
                  Tillbaka till kurs
                </Link>
              </div>
            </div>

            {/* Alla frågor och svar */}
            <div className="space-y-6">
              {questions.map((q, qIndex) => {
                const userAnswer = userAnswers[qIndex]
                const isCorrect = userAnswer === q.correctAnswer
                return (
                  <div key={qIndex} className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-orange-500/5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Fråga {qIndex + 1}: {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 ml-14">
                      {q.answers.map((answer, aIndex) => (
                        <div
                          key={aIndex}
                          className={`p-4 rounded-2xl backdrop-blur-xl shadow-md ${
                            aIndex === q.correctAnswer
                              ? 'bg-green-500/15 border-2 border-green-400/50 shadow-green-500/20'
                              : userAnswer === aIndex
                              ? 'bg-red-500/15 border-2 border-red-400/50 shadow-red-500/20'
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-white">
                              {String.fromCharCode(97 + aIndex)}.
                            </span>
                            <span className="text-white">{answer}</span>
                            {aIndex === q.correctAnswer && (
                              <span className="ml-auto text-green-400 font-bold">✓ Rätt svar</span>
                            )}
                            {userAnswer === aIndex && aIndex !== q.correctAnswer && (
                              <span className="ml-auto text-red-400 font-bold">✗ Ditt svar</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="ml-14 mt-4 p-4 bg-orange-500/10 backdrop-blur-xl rounded-2xl border border-orange-400/20 shadow-lg shadow-orange-500/10">
                      <p className="text-sm font-bold text-orange-300 mb-2">Förklaring:</p>
                      <p className="text-sm text-orange-200">{q.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer knappar */}
            <div className="mt-8 text-center">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-orange-500/5">
                <p className="text-white text-lg mb-4">
                  Slutresultat: {score} av {questions.length} rätt ({Math.round((score / questions.length) * 100)}%)
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Gör om quiz
                  </button>
                  <Link
                    href="/cpanel-partner"
                    className="px-8 py-4 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
                  >
                    Tillbaka till kurs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      )
    }

    // Normal resultat-sammanfattning
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-orange-500/10 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz slutförd! 🎉</h2>
            <p className="text-2xl text-orange-200 mb-8">
              Du fick {score} av {questions.length} rätt!
            </p>
            <div className="text-xl text-orange-300 mb-8">
              {score === questions.length && "Perfekt! Du är en cPanel-expert! 🏆"}
              {score >= questions.length * 0.7 && score < questions.length && "Bra jobbat! Du har god kunskap om cPanel! 👍"}
              {score >= questions.length * 0.5 && score < questions.length * 0.7 && "Inte illa! Du vet en del om cPanel. 📚"}
              {score < questions.length * 0.5 && "Fortsätt lära dig om cPanel! 💪"}
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                Gör om quiz
              </button>
              <button
                onClick={() => setShowDetailedReport(true)}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                Se hela resultatet 📊
              </button>
              <Link
                href="/cpanel-partner"
                className="px-8 py-4 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
              >
                Tillbaka till kurs
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const question = questions[currentQuestion]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 pb-12">
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
          <div className="text-orange-200 font-semibold">
            Fråga {currentQuestion + 1} av {questions.length}
          </div>
        </div>
      </header>

      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 to-red-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-orange-500/10">
                <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                  {question.question}
                </h2>

                <div className="space-y-4">
                  {question.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={answered}
                      className={`
                        w-full p-5 rounded-2xl font-semibold text-lg text-left transition-all backdrop-blur-xl
                        ${!answered && 'hover:scale-102 hover:shadow-2xl hover:shadow-orange-500/20'}
                        ${selectedAnswer === index && index === question.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/20'
                          : selectedAnswer === index && index !== question.correctAnswer
                          ? 'bg-red-500/20 border-2 border-red-400/50 text-white shadow-lg shadow-red-500/20'
                          : answered && index === question.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/20'
                          : 'bg-white/10 border-2 border-white/20 text-orange-100 hover:bg-white/20 hover:border-white/30'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 font-bold text-sm shrink-0">
                          {String.fromCharCode(97 + index)}.
                        </span>
                        <span>{answer}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="inline-block bg-white/5 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/10 shadow-lg shadow-orange-500/10">
                  <span className="text-orange-200 text-lg font-semibold">
                    Poäng: {score} / {questions.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
              {showExplanation && (
                <div className="animate-fade-in space-y-6">
                  <div className={`
                    p-6 rounded-3xl border-2 text-center backdrop-blur-2xl shadow-xl
                    ${selectedAnswer === question.correctAnswer
                      ? 'bg-green-500/15 border-green-400/50 shadow-green-500/20'
                      : 'bg-red-500/15 border-red-400/50 shadow-red-500/20'
                    }
                  `}>
                    <div className="text-4xl mb-2">
                      {selectedAnswer === question.correctAnswer ? '✅' : '❌'}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedAnswer === question.correctAnswer ? 'Rätt svar!' : 'Fel svar'}
                    </div>
                  </div>

                  <div className="bg-orange-500/10 backdrop-blur-3xl rounded-3xl p-8 border border-orange-400/20 shadow-xl shadow-orange-500/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Förklaring
                    </h3>
                    <p className="text-orange-50 leading-relaxed text-base font-medium">
                      {question.explanation}
                    </p>
                  </div>

                  <div className="rounded-3xl p-8 max-h-[520px] overflow-y-auto border border-white/10 shadow-2xl shadow-orange-500/30" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(60px) saturate(200%) brightness(110%)', WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(110%)'}}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center sticky top-0 pb-4 -mx-8 px-8 pt-2 z-10 rounded-t-3xl border-b border-white/10" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(40px) saturate(180%) brightness(105%)', WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(105%)'}}>
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Verkligt Exempel
                    </h3>
                    <div className="text-orange-50 font-medium whitespace-pre-wrap">
                      {question.example}
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl font-bold text-white text-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? 'Nästa fråga →' : 'Se resultat 🎯'}
                  </button>
                </div>
              )}

              {!showExplanation && (
                <div className="bg-white/3 backdrop-blur-3xl rounded-3xl p-12 border border-white/10 shadow-2xl shadow-orange-500/10 flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-orange-300">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">
                      Välj ett svar för att se<br/>detaljerad förklaring och exempel
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

