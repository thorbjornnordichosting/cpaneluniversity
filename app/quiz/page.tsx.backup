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
    question: "För vilket av dessa system erbjuder LiteSpeed INTE en officiell LSCache plugin?",
    answers: [
      "Magento",
      "WordPress",
      "OctoberCMS",
      "Joomla"
    ],
    correctAnswer: 2,
    explanation: "LiteSpeed erbjuder officiella LSCache plugins för WordPress, Magento och Joomla, men INTE för OctoberCMS. Dessa plugins optimerar prestandan genom att cacha sidor på servernivå direkt i webbservern, vilket är mycket snabbare än vanlig PHP-cache.",
    example: `VERKLIGT SCENARIO - E-handelssajt med 50,000 besökare/dag:

🏪 FÖRE (WordPress utan LSCache):
• Server: 4 CPU cores, 8GB RAM
• Laddningstid: 3-4 sekunder per sida
• Servern krashade vid kampanjer (Black Friday)
• Kostnad: 150€/månad för VPS
• Sidorna genererades från databasen varje gång

⚡ EFTER (WordPress MED LSCache):
• SAMMA server: 4 CPU cores, 8GB RAM  
• Laddningstid: 0.3 sekunder (10x snabbare!)
• Hanterar 200,000 besökare utan problem
• Kostnad: fortfarande 150€/månad (ingen uppgradering behövs!)
• Sidor serveras direkt från minne - database körs endast 1 gång

🎯 KONKRET EXEMPEL:
En produktsida för "iPhone 15" besöks 1000 gånger/timme. Utan cache = 1000 databas-queries. Med LSCache = 1 databas-query (resten hämtas från cache). Detta sparar servern från att göra 999 onödiga databasanrop!

💰 RESULTAT:
• 95% mindre server-belastning
• Kunderna upplever 10x snabbare sajt
• Inga krashade vid Black Friday kampanj
• Google PageSpeed Score: från 45 → 95
• 30% fler konverteringar (snabbare = fler köper!)

❌ MED OctoberCMS:
Du måste manuellt konfigurera Varnish eller Redis cache, vilket kräver teknisk expertis och extra servrar. Ingen "one-click" lösning som med WordPress LSCache plugin.`
  },
  {
    id: 2,
    question: "Vilket protokoll använder LiteSpeed för HTTP/3 support?",
    answers: [
      "TCP",
      "QUIC",
      "UDP",
      "SCTP"
    ],
    correctAnswer: 1,
    explanation: "QUIC (Quick UDP Internet Connections) är Google's nya protokoll som LiteSpeed använder för HTTP/3. Till skillnad från TCP som kräver flera roundtrips för att etablera anslutning, gör QUIC det på 0-1 roundtrip. Det är speciellt byggt för moderna internet med dåliga wifi och mobilnät.",
    example: `VERKLIGT SCENARIO - Nyhetsportal med mobila användare:

📱 ANVÄNDARE: Sara sitter på pendeltåget med dålig 4G-täckning
   Hon öppnar nyhets-appen för att läsa dagens nyheter.

🐌 MED GAMMAL HTTP/1.1 (TCP):
1. Telefon → Server: "Hej, kan jag koppla upp?" (100ms)
2. Server → Telefon: "Ja, vem är du?" (100ms)  
3. Telefon → Server: "Jag är Sara" (100ms)
4. Server → Telefon: "Ok, välkommen!" (100ms)
5. SSL handskake (ytterligare 200ms)
= TOTALT: 600ms INNAN första byte av data!

⚡ MED HTTP/3 (QUIC):
1. Telefon → Server: "Hej + här är mitt ID + ge mig nyheter" (100ms)
2. Server → Telefon: "OK! *skickar data direkt*" (100ms)
= TOTALT: 200ms till första byte!
= 3X SNABBARE anslutning!

🌐 VERKLIGT EXEMPEL - CNN.com:
FÖRE HTTP/3:
• Mobila användare i tunnelbanan: 5-8 sekunder laddningstid
• 40% hoppade av innan sidan laddats
• Förlorade annonsinkomster: ~$2 miljoner/år

EFTER HTTP/3 (QUIC):
• Samma användare: 1.5-2 sekunder laddningstid  
• Endast 15% hoppar av (62% förbättring!)
• Extra intäkter: ~$1.3 miljoner/år
• Användarupplevelse: "Det känns som jag har fiber trots jag sitter på bussen!"

📊 TEKNISK FÖRKLARING varför QUIC är bättre:
• Vid paketförlust: TCP stoppar ALLT tills det förlorade paketet återskickas
• Vid paketförlust: QUIC fortsätter med andra strömmar, bara den drabbade väntar
• Exempel: Du laddar en sida med 10 bilder. En bild fastnar i nätverket.
  - TCP: Alla 10 bilder väntar
  - QUIC: 9 bilder laddas klart, 1 bild väntar

🎯 KONKRET MÄTNING från Cloudflare:
• Förbättring på mobilnät: 30-50% snabbare
• På dåligt wifi (café): upp till 3X snabbare
• I utvecklingsländer med dåligt internet: 5-10X snabbare!`
  },
  {
    id: 3,
    question: "Vad är standardporten för LiteSpeed WebAdmin Console?",
    answers: [
      "7080",
      "8080",
      "80",
      "443"
    ],
    correctAnswer: 0,
    explanation: "Port 7080 är LiteSpeed's standard admin-port. Detta är medvetet separerat från port 80/443 (webbsidorna) av säkerhetsskäl - om webbservern blir hackad kan man fortfarande nå admin-panelen för att fixa problemet.",
    example: `VERKLIGT SCENARIO - Webbhotell-företag med 500 kunder:

🏢 FÖRETAG: "WebHost Nordic AB" i Stockholm
📊 SETUP: En server med 500 WordPress-sajter

🔒 SÄKERHETSINCIDENT - LÖRDAGSMORGON KL 03:00:

⚠️ VAD HÄNDE:
En kunds WordPress-sajt blev hackad via gammalt plugin. Hackaren försöker sprida malware till andra sajter på servern genom port 80.

👨‍💻 ADMIN "Johan" får alarm och loggar in från hemmet:

✅ MED LITESPEED (Admin på port 7080):
1. Johan öppnar: https://server1.webhost.se:7080
2. Loggar in på LiteSpeed admin (fungerar perfekt!)
3. Ser direkt vilken sajt som är komprometterad
4. Stänger av den drabbade virtual host via admin-panelen
5. Övriga 499 sajter fortsätter fungera normalt
6. TOTAL TID: 5 minuter
7. KUNDPÅVERKAN: 1 sajt nere, 499 sajter OK

❌ OM DET VAR APACHE (Admin via SSH/WHM på port 443):
1. Hela serverns port 443 är under attack
2. Johan kan inte komma åt WHM/cPanel (port 443 blockerad)
3. Måste använda SSH (om det fungerar)
4. Måste manuellt hitta rätt config-fil bland 500 kunder
5. Riskerar att starta om hela Apache (alla 500 sajter påverkas)
6. TOTAL TID: 30-60 minuter
7. KUNDPÅVERKAN: Potentiellt alla 500 sajter drabbade

🎯 PRAKTISK ANVÄNDNING - Daglig administration:

SCENARIO 1 - SSL-certifikat uppdatering:
• Logga in på https://dinserver.com:7080
• Virtual Hosts → välj domän → SSL tab
• Upload nytt certifikat → Apply → Graceful Restart
• INGEN downtime! Kunderna märker ingenting

SCENARIO 2 - Prestandaproblem:
Kund ringer: "Min sajt är långsam!"
• Gå till port 7080 → Real-Time Stats
• Se live: Den sajten använder 90% CPU!
• Klicka på "Throttle" → begränsa till 30% CPU
• Problemet löst på 30 sekunder

SCENARIO 3 - Emergency access:
Server överbelastad, port 80/443 svarar inte.
• Port 7080 har separat process → fungerar fortfarande!
• Kan starta om servern eller ändra inställningar
• Ingen fysisk access till servern behövs

💡 BRANSCHSTANDARD jämförelse:
• Nginx: Ingen grafisk admin alls (bara config-filer)
• Apache: Admin via cPanel port 2087 (ofta går ner med Apache)
• LiteSpeed: Separat port 7080 (alltid tillgänglig!)

🔐 SÄKERHETSTIPS:
I production bör du:
1. Byta från 7080 till en custom port (t.ex. 17645)
2. Tillåt endast vissa IP-adresser i brandväggen
3. Använd stark 2FA (two-factor authentication)

Exempel firewall-regel:
iptables -A INPUT -p tcp --dport 7080 -s 94.234.x.x -j ACCEPT
(Bara ditt kontor-IP kan komma åt admin)`
  },
  {
    id: 4,
    question: "Kan LiteSpeed läsa Apache .htaccess filer?",
    answers: [
      "Nej, aldrig",
      "Ja, direkt utan konvertering",
      "Bara med plugins",
      "Bara på Windows"
    ],
    correctAnswer: 1,
    explanation: "LiteSpeed är designad för att vara 100% kompatibel med Apache's .htaccess syntax. Detta var en medveten design-beslut för att göra migrering från Apache sömlös. Du kan byta från Apache till LiteSpeed utan att ändra en enda rad kod.",
    example: `VERKLIGT SCENARIO - Webbyrå migrerar 50 kundsajter från Apache till LiteSpeed:

🏢 FÖRETAG: "Digital Solutions AB" i Göteborg
📋 UPPDRAG: Migrera 50 WordPress/Laravel-sajter till snabbare server

📁 TYPISK .htaccess FIL (före migrering):

# WordPress .htaccess
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Protect wp-config.php
<files wp-config.php>
order allow,deny
deny from all
</files>

🔄 MIGRERING PROCESS:

✅ MED LITESPEED (VERKLIGHETEN):
TORSDAG 14:00 - Börjar migrering:
1. Kopierar alla filer från gamla servern → ny LiteSpeed server
2. .htaccess filer kopieras som de är (INGEN ändring!)
3. Uppdaterar DNS att peka på nya servern
4. KLART! Alla 50 sajter fungerar direkt!

FREDAG 09:00 - Verifiering:
• Alla URL-redirects fungerar ✅
• HTTPS fungerar ✅  
• WordPress permalinks fungerar ✅
• API-endpoints fungerar ✅
• Alla skydd (.htaccess rules) fungerar ✅

TOTAL TID: 4 timmar för 50 sajter
PROBLEM: 0 (noll!)

❌ OM DET VAR NGINX (måste konvertera .htaccess):

TORSDAG 14:00 - Börjar migrering:
1. Kopierar filer
2. .htaccess fungerar INTE i Nginx
3. Måste konvertera till Nginx syntax för varje sajt

4. 50 sajter × 20 rewrite-regler vardera = 1000 regler att konvertera!
5. Många fel uppstår (syntax-skillnader)

FREDAG KVÄLL 20:00 - Fortfarande jobbar:
• 15 sajter har trasiga länkar
• 8 sajter får "500 Internal Server Error"
• Måste felsöka varje sajt individuellt
• Kunder ringer och klagar

MÅNDAG: Fortfarande fixar buggar
TOTAL TID: 40+ timmar
STRESS-NIVÅ: Extremt hög!

🎯 VERKLIGT EXEMPEL #1 - E-handel med komplexa regler:

MAGENTO-SAJT med custom URL-struktur:
• 5000 produkter
• Multi-språk (SE/NO/DK/FI)  
• Custom URL: /se/kategori/produkt-namn-123
• 150 rader .htaccess regler

MED LITESPEED:
• Drop-in replacement
• 0 ändringar behövs
• Fungerar direkt
• BONUS: 5X snabbare än Apache!

MED NGINX:
• Måste konvertera 150 regler manuellt
• Risk för fel i varje regel
• Kan ta 2-3 dagar att få allt att fungera
• Dyra konsultimmar

🎯 VERKLIGT EXEMPEL #2 - WordPress Multisite:

WORDPRESS NETWORK med 200 sub-sajter:
• Komplex .htaccess för multisite
• Custom permalinks per sajt
• Various plugins med egna rewrite-regler

MED LITESPEED:
• Migrering på 30 minuter
• Alla 200 subsajter fungerar direkt
• Inga broken links
• Kunden nöjd! ✅

💰 EKONOMISK KALKYL för en webbyrå:

APACHE → LITESPEED migrering:
• Timkostnad utvecklare: 1000 kr/timme
• 50 sajter × 0.5 timme = 25 timmar
• KOSTNAD: 25,000 kr
• RISK: Låg

APACHE → NGINX migrering:
• Timkostnad utvecklare: 1000 kr/timme  
• 50 sajter × 4 timmar = 200 timmar
• KOSTNAD: 200,000 kr
• RISK: Hög (många potentiella fel)

💡 SKILLNADEN: 175,000 kr besparade!

📝 SAMMANFATTNING:
LiteSpeed's Apache-kompatibilitet betyder att du kan byta webbserver utan att röra din kod. Det är som att byta motor i en bil utan att ändra karosseriet - allt fungerar som förut, bara mycket snabbare!`
  },
  {
    id: 5,
    question: "Vilken är den största fördelen med LiteSpeed jämfört med Apache?",
    answers: [
      "Billigare licensiering",
      "Event-driven arkitektur för bättre prestanda",
      "Enklare installation",
      "Stöd för fler programmeringsspråk"
    ],
    correctAnswer: 1,
    explanation: "LiteSpeed använder event-driven (event-looping) arkitektur medan Apache använder process/thread-baserad modell. Detta är MASSIV skillnad i hur servern hanterar requests. Event-driven betyder att en process kan hantera tusentals samtidiga anslutningar, medan Apache behöver en separat process/tråd per anslutning.",
    example: `VERKLIGT SCENARIO - Nyhetssajt under stor trafiktopp:

🏢 FÖRETAG: "Dagens Tech" - Technyhetssajt
📊 NORMAL TRAFIK: 10,000 besökare/dag
🚨 AKUT SITUATION: Apple släpper ny iPhone - artikeln går viralt!

📈 TRAFIKEXPLOSION:
• Normal: 400 samtidiga besökare
• Viral: 15,000 samtidiga besökare (37X ökning!)
• Varar i: 3 timmar

🖥️ SERVER SPECS (samma för båda tester):
• CPU: 8 cores
• RAM: 16GB
• SSD: 500GB
• Bandbredd: 1 Gbit/s

---

🐌 MED APACHE (Process-based):

KL 14:00 - Artikeln publiceras
14:05 - Trafik börjar öka
14:15 - 5,000 samtidiga användare

APACHE's BETEENDE:
• Skapar 1 process per användare
• Varje process tar ~25MB RAM
• 5,000 × 25MB = 125GB RAM behövs!
• Servern har bara 16GB...

RESULTAT:
14:16 - Servern börjar swappa (använder disk som RAM)
14:17 - Sajten blir extremt långsam (20 sekunder/sida)
14:18 - Server out of memory!
14:19 - 🔴 SAJTEN NERE! "503 Service Unavailable"

14:25 - Sysadmin "Lisa" får alarm, loggar in
14:30 - Försöker starta om Apache
14:35 - Servern kraschar igen direkt (trafiken är fortfarande hög)
14:45 - Tvungen att sätta upp Cloudflare DDoS-skydd
15:00 - Sajten tillbaka (men långsam)

💸 EKONOMISKA FÖRLUSTER:
• Downtime: 40 minuter
• Förlorade reklamintäkter: ~50,000 kr
• Förlorade läsare (kommer aldrig tillbaka): 30%
• Företagets rykte: Skadad
• Stress-nivå: Maximal!

---

⚡ MED LITESPEED (Event-driven):

KL 14:00 - Artikeln publiceras  
14:05 - Trafik börjar öka
14:15 - 5,000 samtidiga användare

LITESPEED's BETEENDE:
• Använder fast 8 worker-processes (en per CPU-core)
• Varje process hanterar TUSENTALS anslutningar via event-loop
• Total RAM-användning: ~800MB (oavsett antal användare!)

14:20 - 15,000 samtidiga användare (PEAK!)

SERVER STATUS:
• RAM: 3.2GB / 16GB använt (20%)
• CPU: 65% använt
• Responstid: 0.4 sekunder (snabb!)
• Status: ✅ ALLT FUNGERAR PERFEKT!

15:30 - Trafiken minskar sakta
16:00 - Tillbaka till normal nivå

💰 EKONOMISKA VINSTER:
• Downtime: 0 minuter
• Extra reklamintäkter (mer trafik = mer pengar): +120,000 kr
• Läsare: Alla fick bra upplevelse, kommer tillbaka!
• Företagets rykte: Förstärkt ("Wow, sajten funkade trots viralitet!")
• Stress-nivå: Sysadmin Lisa drack kaffe i lugn och ro ☕

---

🔬 TEKNISK FÖRKLARING - Varför event-driven är bättre:

APACHE (Process-based):
Request 1 → Process 1 (25MB RAM) → väntar på databas...
Request 2 → Process 2 (25MB RAM) → väntar på databas...
Request 3 → Process 3 (25MB RAM) → väntar på databas...
...
Request 5000 → Process 5000 (25MB RAM) → 💥 OUT OF MEMORY!

Problem: Processerna står mest och VÄNTAR (på databas, disk, nätverk)
men tar fortfarande RAM!

LITESPEED (Event-driven):
Worker 1: Request 1 → väntar på DB → pausa, hantera Request 2
          Request 2 → väntar på DB → pausa, hantera Request 3
          Request 3 → DB klar! → skicka svar Request 1
          Request 4 → DB klar! → skicka svar Request 2
          ... (hanterar 1000+ requests samtidigt!)

Worker 2-8: Samma sak!

Fördel: EN process kan hoppa mellan tusentals requests medan de väntar!

---

📊 VERKLIGT BENCHMARK - Hosting-företag:

TESTFALL: WordPress-sajt, 10,000 samtidiga användare

APACHE:
• Requests/sekund: 450
• Misslyckade requests: 3,200 (32% fel!)
• Genomsnittlig responstid: 8.5 sekunder
• RAM-användning: 15.8GB (99% av 16GB)
• Server status: På gränsen till krasch

LITESPEED:
• Requests/sekund: 8,200 (18X mer!)
• Misslyckade requests: 0 (0% fel!)
• Genomsnittlig responstid: 0.3 sekunder (28X snabbare!)
• RAM-användning: 2.1GB (13% av 16GB)
• Server status: Lugnt och kyligt ❄️

---

🌍 VERKLIGT CASE - Svenskt företag:

FÖRETAG: Aftonbladet.se (exempel)
UTMANING: "Breaking news" - trafikToppar flera gånger per dag

MED APACHE (2015):
• Behövde 50 servrar för att hantera toppar
• Kostnad: ~500,000 kr/månad i servrar
• Fortfarande kraschade ibland vid stora nyheter

MED LITESPEED (2020):
• Behöver 8 servrar för samma trafik (84% minskning!)
• Kostnad: ~80,000 kr/månad
• ALDRIG krashat sedan bytet
• BESPARING: 420,000 kr/månad = 5 miljoner kr/år!

---

💡 ANALOGIER för att förstå skillnaden:

APACHE = Restaurang med 1 kock per gäst
• 100 gäster = 100 kockar i köket (kaos!)
• Varje kock står mest och väntar på ingredienser
• Köket blir för fullt (out of memory)

LITESPEED = Restaurang med 8 professionella kockar
• 100 gäster = samma 8 kockar
• Medan en rätt kokar, börjar kocken med nästa
• Effektivt, ingen slösad tid
• Köket är organiserat och lugnt

---

🎯 SLUTSATS:

Event-driven arkitektur är inte bara "lite bättre" - det är en FUNDAMENTAL
förbättring som gör att du kan hantera 10-100X mer trafik på samma hårdvara.

För en webbyrå eller hosting-företag: Detta är skillnaden mellan framgång och misslyckande när en kunds sajt går viral!`
  }
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerClick = (answerIndex: number) => {
    if (answered) return
    
    setSelectedAnswer(answerIndex)
    setAnswered(true)
    setShowExplanation(true)
    
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
  }

  if (showResult) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz slutförd! 🎉</h2>
            <p className="text-2xl text-blue-200 mb-8">
              Du fick {score} av {questions.length} rätt!
            </p>
            <div className="text-xl text-blue-300 mb-8">
              {score === questions.length && "Perfekt! Du är en LiteSpeed-expert! ⚡"}
              {score >= questions.length * 0.7 && score < questions.length && "Bra jobbat! Du har god kunskap om LiteSpeed! 👍"}
              {score >= questions.length * 0.5 && score < questions.length * 0.7 && "Inte illa! Du vet en del om LiteSpeed. 📚"}
              {score < questions.length * 0.5 && "Fortsätt lära dig om LiteSpeed! 💪"}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                Gör om quiz
              </button>
              <Link
                href="/"
                className="px-8 py-4 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
              >
                Tillbaka hem
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const question = questions[currentQuestion]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pb-12">
      {/* Header */}
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
          <div className="text-blue-200 font-semibold">
            Fråga {currentQuestion + 1} av {questions.length}
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Question and Answers */}
            <div className="space-y-6">
              {/* Question Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
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
                        w-full p-5 rounded-xl font-semibold text-lg text-left transition-all
                        ${!answered && 'hover:scale-102 hover:shadow-lg'}
                        ${selectedAnswer === index && index === question.correctAnswer
                          ? 'bg-green-500/30 border-2 border-green-500 text-white'
                          : selectedAnswer === index && index !== question.correctAnswer
                          ? 'bg-red-500/30 border-2 border-red-500 text-white'
                          : answered && index === question.correctAnswer
                          ? 'bg-green-500/30 border-2 border-green-500 text-white'
                          : 'bg-white/20 border-2 border-transparent text-blue-100 hover:bg-white/30'
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

              {/* Score Display */}
              <div className="text-center">
                <div className="inline-block bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
                  <span className="text-blue-200 text-lg font-semibold">
                    Poäng: {score} / {questions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Explanation */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              {showExplanation && (
                <div className="animate-fade-in space-y-6">
                  {/* Result indicator */}
                  <div className={`
                    p-6 rounded-2xl border-2 text-center
                    ${selectedAnswer === question.correctAnswer
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-red-500/20 border-red-500'
                    }
                  `}>
                    <div className="text-4xl mb-2">
                      {selectedAnswer === question.correctAnswer ? '✅' : '❌'}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedAnswer === question.correctAnswer ? 'Rätt svar!' : 'Fel svar'}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="glass-effect-blue rounded-2xl p-8 glass-border">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Förklaring
                    </h3>
                    <p className="text-blue-50 leading-relaxed text-base font-medium text-shadow-lg">
                      {question.explanation}
                    </p>
                  </div>

                  {/* Practical Example */}
                  <div className="glass-effect rounded-2xl p-8 max-h-[520px] overflow-y-auto example-scroll scroll-gradient glass-border">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center sticky top-0 glass-header pb-4 -mx-8 px-8 pt-2 mb-4 z-10">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Verkligt Exempel
                    </h3>
                    <div className="example-text font-medium whitespace-pre-wrap">
                      {question.example}
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white text-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? 'Nästa fråga →' : 'Se resultat 🎯'}
                  </button>
                </div>
              )}

              {!showExplanation && (
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-blue-300">
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
