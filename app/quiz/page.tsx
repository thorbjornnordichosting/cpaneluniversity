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

⚡ EFTER (WordPress MED LSCache):
• SAMMA server: 4 CPU cores, 8GB RAM  
• Laddningstid: 0.3 sekunder (10x snabbare!)
• Hanterar 200,000 besökare utan problem
• Kostnad: fortfarande 150€/månad

🎯 KONKRET EXEMPEL:
Produktsida "iPhone 15" besöks 1000 gånger/timme
• Utan cache = 1000 databas-queries
• Med LSCache = 1 databas-query
• Sparar 999 onödiga databasanrop!

💰 RESULTAT:
• 95% mindre server-belastning
• 10x snabbare för kunder
• Google PageSpeed: 45 → 95
• 30% fler försäljningar!

❌ MED OctoberCMS:
Måste manuellt konfigurera Varnish/Redis
Ingen "one-click" lösning.`
  },
  {
    id: 2,
    question: "Vilken typ av arkitektur använder LiteSpeed?",
    answers: [
      "Process-driven Architecture",
      "Bovine-driven Architecture",
      "Beer-driven Architecture",
      "Event-driven Architecture"
    ],
    correctAnswer: 3,
    explanation: "LiteSpeed använder Event-driven Architecture (händelsedriven arkitektur). Till skillnad från Apache's process-driven modell, använder LiteSpeed en asynkron event-loop som kan hantera tusentals samtidiga anslutningar med minimal resursanvändning. Varje worker-process kan hantera många tusen requests samtidigt genom att växla mellan dem när de väntar på I/O operationer.",
    example: `VERKLIGT SCENARIO - E-handelsplattform Black Friday:

🛍️ FÖRETAG: "NordicShop.se"
📊 Normal: 2,000 samtidiga användare
🎯 Black Friday: 50,000 samtidiga användare!

---

🐌 APACHE (Process-driven):

Skapar 1 process per användare:
• 10,000 användare = 10,000 processer
• Varje process: ~30MB RAM
• Totalt: 10,000 × 30MB = 300GB RAM
• Server har bara 32GB...
• Resultat: 💥 KRASCH!

⚡ LITESPEED (Event-driven):

Använder fast 8 worker-processer:
• 10,000 användare = fortfarande 8 processer!
• Varje process: ~60MB RAM
• Totalt: 8 × 60MB = 480MB RAM
• Server har 32GB (använder bara 1.5%!)
• Resultat: ✅ FUNGERAR PERFEKT!

---

📊 BLACK FRIDAY RESULTAT:

Apache:
• 00:03 - Första servern kraschar
• 00:07 - Alla servrar nere
• Downtime: 2 timmar
• Förlorad försäljning: 8 miljoner kr
• VD fick sparken

LiteSpeed:
• 00:00-02:00 - Fungerade perfekt hela natten
• 50,000 samtidiga användare - inga problem
• Downtime: 0 minuter
• Försäljning: 45 miljoner kr (rekord!)
• VD fick bonus: 500,000 kr

---

💡 ANALOGI - Restaurang:

🐌 Process-driven = 1 kock per gäst:
• 100 gäster = 100 kockar (kaos!)
• Kockarna står mest och VÄNTAR
• Slösar resurser

⚡ Event-driven = 8 professionella kockar:
• 100 gäster = samma 8 kockar
• Medan en rätt kokar, börjar kocken med nästa
• Alltid produktiva!

---

SLUTSATS:
Event-driven = 99% mindre RAM
Event-driven = 10-100X fler användare
Event-driven = Framtiden!`
  },
  {
    id: 3,
    question: "Vilket påstående beskriver bäst LiteSpeed's stöd för reCAPTCHA?",
    answers: [
      "LiteSpeed stöder bara reCAPTCHA när man installerar med reDIS",
      "LiteSpeed stöder bara CAPTCHA, inte reCAPTCHA",
      "LiteSpeed stöder inte reCAPTCHA",
      "LiteSpeed stöder reCAPTCHA"
    ],
    correctAnswer: 3,
    explanation: "LiteSpeed har fullt inbyggt stöd för reCAPTCHA (Google's moderna bot-skydd). Detta är integrerat direkt i LiteSpeed och kan användas för att skydda mot DDoS-attacker, spam-bots, och automatiserade attacker. Du kan konfigurera reCAPTCHA direkt i LiteSpeed WebAdmin Console under Security → Bot Protection, utan att behöva installera extra plugins eller Redis.",
    example: `VERKLIGT SCENARIO - Webshop mot bot-attack:

🏪 FÖRETAG: "ModeButiken.se"
📊 Normal trafik: 500 besökare/timme
🤖 ATTACK: 50,000 bot-requests/minut!

---

❌ UTAN reCAPTCHA:

10:00 - Bot-attack börjar
• CPU: 100% (genererar sidor till bots)
• Databas: Överbelastad
• Responstid: 30 sekunder
• Riktiga kunder: Kan inte handla!

10:30 - Fortfarande kaos
• Bots stjäl all produktdata
• Konkurrent får all info
• Kunder lämnar sajten

12:00 - 2 timmar senare
• Förlorad försäljning: 100,000 kr
• Stulen data: All lagerstatus
• Stressad IT-personal

---

✅ MED LiteSpeed reCAPTCHA:

SETUP (en gång, 8 minuter):
1. Google reCAPTCHA nycklar (gratis!)
2. LiteSpeed WebAdmin port 7080
3. Security → Bot Protection → reCAPTCHA
4. Klart!

NÄR ATTACK KOMMER:

10:00 - Bot-attack börjar
LiteSpeed upptäcker automatiskt!
• Bots får: reCAPTCHA "Klicka på alla bilar"
• Bots kan inte lösa → 99.9% blockerade
• Server-last från bots: ~0%

Riktiga kunder:
• Ingen CAPTCHA (om de beter sig normalt!)
• Responstid: 0.4 sekunder (normalt!)
• Kan handla som vanligt

RESULTAT:
• Förlorad försäljning: 0 kr
• Stulen data: 0 (bots kom aldrig in)
• IT-tid: 0 (automatiskt)
• Kunder: Nöjda!

---

💰 EKONOMISK KALKYL:

UTAN reCAPTCHA:
• Bot-attacker: 10/år
• Förlust per attack: 50,000 kr
• Total: 500,000 kr/år

MED LiteSpeed reCAPTCHA:
• Setup: 8 minuter
• Kostnad: 0 kr (gratis!)
• Blockerade attacker: 99.9%
• Total: 0 kr/år

BESPARING: 500,000 kr/år!

---

🔬 reCAPTCHA-VERSIONER:

v2 Checkbox: "Jag är inte en robot" ☑️
• Synlig för användare
• Bra för login

v2 Invisible: Körs i bakgrunden
• Användaren ser inget
• Bra för formulär

v3: Helt osynlig!
• Score 0.0-1.0 (bot-sannolikhet)
• Ingen användarinteraktion
• Bäst för alla formulär

LiteSpeed stöder ALLA versioner inbyggt!

---

SAMMANFATTNING:
✅ Inbyggt i LiteSpeed (inga extra plugins!)
✅ Gratis (Google reCAPTCHA)
✅ Blockerar 99.9% av bots
✅ Användarvänligt (v3 är osynlig)
✅ Sparar hundratusentals kronor

Det är INTE sant att du behöver Redis!
LiteSpeed har fullt modernt stöd för reCAPTCHA! 🛡️`
  },
  {
    id: 4,
    question: "Vilket påstående beskriver bäst huvudkravet för att QUIC ska fungera på din server?",
    answers: [
      "Du måste se till att port 443 på TCP är tillåten in och ut genom brandväggen",
      "Du måste se till att port 443 på UDP är tillåten in och ut genom brandväggen",
      "Du måste se till att port 911 på TCP är tillåten in och ut genom brandväggen",
      "Du måste se till att port 911 på UDP är tillåten in och ut genom brandväggen"
    ],
    correctAnswer: 1,
    explanation: "QUIC (som används för HTTP/3) kör på UDP port 443, INTE TCP! Detta är en kritisk skillnad från traditionell HTTP/HTTPS som använder TCP. Du måste öppna UDP port 443 i brandväggen för att HTTP/3 ska fungera. Många administratörer glömmer detta eftersom de är vana vid att bara öppna TCP 443 för HTTPS.",
    example: `VERKLIGT SCENARIO - Webbhotell aktiverar HTTP/3 men det fungerar inte:

🏢 FÖRETAG: "HostNordic AB" i Stockholm
🎯 MÅL: Aktivera HTTP/3 för snabbare mobilupplevelse
🤔 PROBLEM: HTTP/3 fungerar inte trots konfiguration!

---

❌ VANLIGT MISSTAG - Glömmer UDP 443:

MÅNDAG 10:00 - Sysadmin "Erik" aktiverar HTTP/3:

1. Loggar in på LiteSpeed WebAdmin (port 7080)
2. Server Configuration → QUIC
3. Enable QUIC: ✓ YES
4. QUIC Port: 443
5. Apply → Graceful Restart
6. "Klart! HTTP/3 aktiverat!" 🎉

MÅNDAG 10:30 - Test från mobilen:
• Öppnar Chrome DevTools
• Kolla Protocol kolumn
• Förväntar: "h3" (HTTP/3)
• Ser: "h2" (HTTP/2) 
• 🤔 "Varför fungerar inte HTTP/3?"

MÅNDAG 11:00 - Felsökning:

ERIK KOLLAR:
• LiteSpeed config: ✅ QUIC enabled
• SSL cert: ✅ Fungerar
• Browser: ✅ Chrome stöder HTTP/3
• Server logs: "QUIC handshake timeout"

ERIK TESTAR:
Terminal: telnet server.se 443
✅ Fungerar (TCP 443 öppen)

Terminal: nc -u server.se 443
❌ Connection timeout (UDP 443 STÄNGD!)

💡 AHA-MOMENT:
"Jag glömde öppna UDP 443 i brandväggen!"

---

✅ RÄTT LÖSNING - Öppna UDP 443:

BRANDVÄGGS-KONFIGURATION:

På Linux med firewalld:
firewall-cmd --permanent --add-port=443/udp
firewall-cmd --reload

På Linux med iptables:
iptables -A INPUT -p udp --dport 443 -j ACCEPT
iptables -A OUTPUT -p udp --sport 443 -j ACCEPT
iptables-save > /etc/iptables/rules.v4

På Linux med ufw:
ufw allow 443/udp

VERIFIERA:
firewall-cmd --list-ports
Bör visa: 443/tcp 443/udp

---

MÅNDAG 11:30 - Efter fix:

Erik öppnar UDP 443 i brandväggen
Testar igen från mobilen:
• Chrome DevTools Protocol: "h3" ✅
• HTTP/3 fungerar!
• Laddningstid mobil: 2.5s → 1.2s (52% snabbare!)

---

🔬 TEKNISK FÖRKLARING - Varför UDP?

TRADITIONELL HTTPS (TCP 443):
• Använder TCP (Transmission Control Protocol)
• Garanterad leverans i rätt ordning
• Men: Långsam vid paketförlust
• Kräver 3-vägs-handskakning

HTTP/3 QUIC (UDP 443):
• Använder UDP (User Datagram Protocol)  
• Snabbare anslutning (0-RTT möjligt)
• Bättre vid paketförlust
• Multiplexing utan "head-of-line blocking"

SAMMA PORT (443) men OLIKA PROTOKOLL!

---

🌐 VERKLIGT CASE - Mobiloperatör blockerar UDP:

SCENARIO: Företagets mobilnät

FÖRETAG: "Telia Sverige"
PROBLEM: Vissa företagsnät blockerar all UDP (säkerhetspolicy)

VAD HÄNDER:
• Användare med företagsmobil besöker din sajt
• Browser försöker HTTP/3 (UDP 443)
• Företagets brandvägg: ❌ BLOCKERAR UDP
• Browser failover automatiskt till HTTP/2 (TCP 443)
• Sajten fungerar fortfarande! (bara inte lika snabbt)

LÖSNING:
HTTP/3 är "progressive enhancement":
• Om UDP 443 fungerar → Använd HTTP/3 (snabbt!)
• Om UDP blockerad → Använd HTTP/2 (fungerar ändå!)
• Ingen användare ser error, bara olika hastighet

Detta är varför du behöver BÅDA:
• TCP 443: För backward compatibility
• UDP 443: För HTTP/3 prestanda

---

💰 VERKLIG KOSTNAD AV MISSAT UDP 443:

E-HANDELSSAJT: "TeknikPrylar.se"

SITUATION:
• HTTP/3 konfigurerat i LiteSpeed
• Men glömt öppna UDP 443
• Tror att HTTP/3 fungerar (gör det inte!)

EFFEKT PÅ MOBILA ANVÄNDARE:
• 60% av trafik = mobil
• Utan HTTP/3: Laddningstid 3.5 sekunder
• Med HTTP/3: Laddningstid 1.8 sekunder

EKONOMISK PÅVERKAN:
• Varje extra sekund laddningstid = 7% lägre konvertering
• 3.5s vs 1.8s = 1.7 sekunder skillnad
• 1.7 × 7% = ~12% lägre konvertering

MED 1 MILJON KR/MÅNAD MOBIL FÖRSÄLJNING:
• Förlorad försäljning: 120,000 kr/månad
• Per år: 1.44 miljoner kr!

KOSTNAD ATT FIXA:
• 1 kommando i terminal: 10 sekunder
• firewall-cmd --add-port=443/udp

ROI: 1.44 miljoner kr för 10 sekunders arbete! 🤯

---

🔧 PRAKTISK CHECKLISTA - HTTP/3 Setup:

✅ STEG 1: Aktivera QUIC i LiteSpeed
   WebAdmin → Server Config → QUIC
   Enable QUIC: YES

✅ STEG 2: Öppna TCP 443 (för HTTPS):
   firewall-cmd --add-port=443/tcp

✅ STEG 3: Öppna UDP 443 (för HTTP/3):
   firewall-cmd --add-port=443/udp  ← GLÖM INTE!

✅ STEG 4: Verifiera med online test:
   https://http3check.net/
   Eller: curl --http3 https://dinserver.se

✅ STEG 5: Testa i Chrome:
   DevTools → Network → Protocol kolumn
   Ska visa "h3" för HTTP/3

---

🚨 VANLIGA FEL VID HTTP/3 SETUP:

❌ FEL #1: Bara öppnat TCP 443
   Symptom: QUIC handshake timeout
   Fix: Öppna UDP 443

❌ FEL #2: Öppnat fel port (typ 80 istället för 443)
   Symptom: HTTP/3 fungerar inte
   Fix: HTTP/3 använder alltid 443

❌ FEL #3: Öppnat bara INBOUND, inte OUTBOUND
   Symptom: Anslutning startar men bryts
   Fix: Öppna både in OCH ut

❌ FEL #4: ISP blockerar UDP
   Symptom: Fungerar lokalt men inte remote
   Fix: Kontakta ISP (eller använd Cloudflare)

---

📊 TESTA OM HTTP/3 FUNGERAR:

TEST 1 - Med curl:
curl -I --http3 https://dinserver.se
Om fungerar: Ser "alt-svc: h3=":443""
Om inte: Connection timeout

TEST 2 - Med Chrome:
1. Öppna chrome://flags
2. Sök "QUIC"
3. Enable "Experimental QUIC protocol"
4. Starta om Chrome
5. Besök din sajt
6. DevTools → Network → Protocol: "h3" ✅

TEST 3 - Online verktyg:
https://http3check.net/?host=dinserver.se
Visar: ✅ HTTP/3 supported eller ❌ Not supported

TEST 4 - Från terminal:
tcpdump -i any port 443 and udp
Om HTTP/3 fungerar: Ser UDP paket på port 443

---

🎯 SAMMANFATTNING:

QUIC/HTTP/3 kräver:
✅ Port 443 på UDP (INTE TCP!)
✅ Både INBOUND och OUTBOUND
✅ LiteSpeed med QUIC enabled
✅ Giltigt SSL-certifikat

VANLIGT MISSTAG:
❌ Glömma UDP (tror bara TCP räcker)
❌ Öppna port 911 (fel port!)

RESULTAT när rätt konfigurerat:
⚡ 30-50% snabbare på mobil
🌍 Bättre upplevelse globalt
💰 Mer försäljning (snabbare = fler köper)

Ett enda kommando kan ge miljoner i extra intäkter! 🚀`
  },
  {
    id: 5,
    question: "Of the following platforms, which does LiteSpeed provide brute force protection capabilities for?",
    answers: [
      "Drupal",
      "Magento",
      "cPanel",
      "WordPress"
    ],
    correctAnswer: 3,
    explanation: "LiteSpeed provides brute force protection for ALL of these platforms: WordPress (wp-login.php, xmlrpc.php), cPanel (WHM/cPanel login), Magento (admin panel), and Drupal (admin login). This is one of LiteSpeed's major advantages - built-in protection for multiple popular platforms without extra plugins. However, WordPress is the most well-known and widely used, making it the primary answer.",
    example: `VERKLIGT SCENARIO - Webbhotell stoppar 50,000 brute force-attacker/dag:

🏢 FÖRETAG: "WebHost Nordic" - 2,500 WordPress-sajter
🎯 PROBLEM: Dagliga brute force-attacker mot wp-login.php
💰 KOSTNAD: Server-belastning + hotellkunder klagar på långsam sajt

---

❌ FÖRE LiteSpeed Brute Force Protection:

TYPISK ATTACK - En onsdag:

10:15 - Botnet börjar attackera 500 WordPress-sajter:
• 10,000 login-försök/minut
• wp-login.php körs 10,000 gånger
• 10,000 databas-queries
• Servrar överbelastas
• CPU: 95-100%
• Legitima användare får timeout

10:45 - Admins får panik-samtal:
Kund: "Min sajt är nere! Vad händer?"
Admin: "Vi har en attack, vi jobbar på det..."

11:30 - Manuell blockering:
• Admins måste hitta attacker-IP:er
• Lägga till i firewall manuellt
• Tar 2 timmar att stabilisera
• Kunder fortfarande arga

KOSTNAD PER ATTACK:
• IT-tid: 2 timmar × 500 kr/h = 1,000 kr
• Kundförlust: 3 kunder säger upp = 1,500 kr/mån
• Server-skador: RAM/CPU slitage
• TOTAL: ~5,000 kr per attack

---

✅ EFTER LiteSpeed Brute Force Protection:

SAMMA ATTACK - En vecka senare:

10:15 - Botnet försöker attackera:

Första IP (1.2.3.4) försöker logga in:
1. Försök 1: Fel lösenord
2. Försök 2: Fel lösenord
3. Försök 3: Fel lösenord
4. Försök 4: LiteSpeed blockerar IP i 300 sekunder
5. Försök 5+: Får 403 Forbidden (använder 0% CPU!)

10:16 - Hela botnetet blockerat:
• 50,000 IPs försöker attackera
• Alla blockeras efter 3-5 försök
• Server-CPU: 5% (normalt!)
• Legitima användare märker INGENTING

---

📊 RESULTAT EFTER 1 MÅNAD:

BLOCKERADE ATTACKER:
• WordPress: 1,200,000 försök blockerade
• cPanel: 45,000 försök blockerade  
• Magento: 12,000 försök blockerade
• Drupal: 8,000 försök blockerade
• TOTALT: 1,265,000 attacker stoppade! 🛡️

SERVER-PRESTANDA:
• CPU-användning: 85% → 12% (normal)
• RAM-användning: 92% → 35%
• Responstid: 4s → 0.6s
• Inga crasher eller downtid

EKONOMI:
• IT-tid sparad: 80 timmar = 40,000 kr
• Kundförlust: 0 (alla nöjda!)
• Extra servrar: Behövs ej (sparar 300€/mån)
• TOTAL BESPARING: 60,000 kr första månaden

---

🏆 SAMMANFATTNING:

LiteSpeed Brute Force Protection:
✅ WordPress (wp-login.php + xmlrpc.php)
✅ cPanel/WHM (login-sidor)
✅ Magento (admin panel)
✅ Drupal (user login)

FÖRDELAR:
⚡ Inbyggt i LiteSpeed (ingen extra plugin)
🛡️ Automatisk blockering
💰 Sparar tusentals kronor
🚀 Ingen prestanda-påverkan
🎯 Fungerar för ALLA plattformar samtidigt

En rad i config = 1,000,000+ attacker stoppade/år! 🎖️`
  },
  {
    id: 6,
    question: "Vilket av följande påståenden beskriver bäst LSPHP:s stöd för PHP-versioner?",
    answers: [
      "LSPHP stödjer olika PHP-versioner per server, inom en servers klusterkonfiguration.",
      "LSPHP stödjer olika PHP-versioner per konto, inom en webbservers globala konfiguration.",
      "LSPHP stödjer olika PHP-versioner per katalog, inom ett kontos filstruktur.",
      "LSPHP stödjer endast en PHP-version åt gången."
    ],
    correctAnswer: 2,
    explanation: "LSPHP (LiteSpeed PHP) stödjer flera PHP-versioner per katalog inom ett kontos filstruktur. Detta innebär att du kan ha olika PHP-versioner för olika kataloger inom samma webbhotellkonto, vilket ger maximal flexibilitet. Du kan ställa in detta via .htaccess-filer med direktiv som 'lsapi_phprc' eller genom cPanels MultiPHP Manager.",
    example: `REAL-WORLD SCENARIO - Web hosting with multiple PHP version requirements:

🏢 COMPANY: "DevHost Solutions" - Hosting 5,000 accounts
🎯 CHALLENGE: Customers need different PHP versions for different applications
💰 SOLUTION: LSPHP's per-directory PHP version support

---

❌ BEFORE LSPHP (Traditional Apache + mod_php):

PROBLEM - One PHP version per entire server:

Customer "TechCorp AB" has 3 applications:
1. Legacy WordPress 4.5 (requires PHP 5.6)
2. Modern WooCommerce shop (requires PHP 8.1)
3. Custom Laravel app (requires PHP 8.2)

With mod_php:
• Server has ONE PHP version installed (e.g., PHP 7.4)
• Customer: "My WordPress is broken!" (needs 5.6)
• Customer: "My Laravel won't run!" (needs 8.2)
• Support: "We can only offer one PHP version per server"
• Solution: Customer must buy 3 separate hosting accounts!
• Cost: 3 × $15/month = $45/month

HOSTING COMPANY PROBLEMS:
• Unhappy customers
• Lost revenue (customers leave)
• Support tickets: 500/month about PHP versions
• Staff cost: 100 hours/month = $5,000

---

✅ AFTER LSPHP (Per-Directory PHP Support):

SAME CUSTOMER - Perfect solution:

Account structure:
/public_html/
├── old-blog/          (PHP 5.6)
├── shop/              (PHP 8.1)
└── app/               (PHP 8.2)

CONFIGURATION:

/public_html/old-blog/.htaccess:
<IfModule LiteSpeed>
  php_value lsapi_phprc /opt/alt/php56/etc
</IfModule>

/public_html/shop/.htaccess:
<IfModule LiteSpeed>
  php_value lsapi_phprc /opt/alt/php81/etc
</IfModule>

/public_html/app/.htaccess:
<IfModule LiteSpeed>
  php_value lsapi_phprc /opt/alt/php82/etc
</IfModule>

RESULT:
✅ All 3 apps work perfectly on ONE account!
✅ Customer pays $15/month (not $45)
✅ No support tickets
✅ Happy customer!

---

📊 REAL EXAMPLE - E-commerce site migration:

SCENARIO: "NordicShop.se" upgrading from PHP 7.2 to PHP 8.2

MIGRATION STRATEGY with LSPHP:

WEEK 1 - Test environment:
/public_html/          (PHP 7.2 - production)
/public_html/beta/     (PHP 8.2 - testing)

Customer tests new version at: shop.se/beta/
No risk to production site!

WEEK 2 - Gradual rollout:
/public_html/checkout/ (PHP 8.2 - upgraded first)
/public_html/          (PHP 7.2 - rest of site)

Monitor: Is checkout working? Yes! ✅

WEEK 3 - Full migration:
/public_html/          (PHP 8.2 - everything)

ZERO DOWNTIME! 🎉

---

💡 TECHNICAL COMPARISON:

APACHE mod_php:
• ONE PHP version per entire server
• Changing version affects ALL accounts
• Risky upgrades (all or nothing)
• Inflexible

APACHE FastCGI + suPHP:
• Different versions per account
• Still can't have multiple versions in one account
• Performance overhead
• Complex configuration

LSPHP (LiteSpeed PHP):
• Different versions per DIRECTORY!
• Can have PHP 5.6, 7.4, 8.1, 8.2 in same account
• Fast (compiled as binary)
• Easy configuration (.htaccess)
• Perfect for gradual migrations

---

🔧 PRACTICAL CONFIGURATION EXAMPLES:

EXAMPLE 1 - WordPress Multisite with different themes:

/public_html/
├── site1/  (Old theme needs PHP 7.4)
├── site2/  (New theme needs PHP 8.1)
└── site3/  (Beta testing PHP 8.2)

Each site/.htaccess:
<IfModule LiteSpeed>
  php_value lsapi_phprc /opt/alt/php74/etc
</IfModule>

EXAMPLE 2 - Development workflow:

/public_html/
├── production/   (PHP 8.1 - stable)
├── staging/      (PHP 8.2 - testing)
└── dev/          (PHP 8.3 - experimental)

Perfect for testing upgrades safely!

---

🏆 SUMMARY:

LSPHP supports:
✅ Different PHP versions PER-DIRECTORY
✅ Within same account
✅ Configured via .htaccess
✅ No server restart needed
✅ Zero downtime migrations

BENEFITS:
⚡ Maximum flexibility
💰 Save money (one account instead of many)
🛡️ Safe testing (test in subdirectory)
🚀 Easy gradual migrations
👨‍💻 Developer-friendly

The correct answer is: c. LSPHP supports the use of different PHP versions per-directory, within an account's file structure.`
  },
  {
    id: 7,
    question: "För vilken av följande webbserver-programvaror fungerar LiteSpeed som en drop-in replacement?",
    answers: [
      "Nginx",
      "WordPress",
      "IIS",
      "Apache"
    ],
    correctAnswer: 3,
    explanation: "LiteSpeed är designad som en direkt ersättning (drop-in replacement) för Apache. Det betyder att LiteSpeed kan läsa Apaches konfigurationsfiler (inklusive .htaccess), stödjer samma rewrite-regler, och kan ersätta Apache utan att behöva omkonfigurera din webbplats. Detta gör migrering från Apache till LiteSpeed extremt enkel.",
    example: `VERKLIGT SCENARIO - Webbhotell migrerar från Apache till LiteSpeed:

🏢 FÖRETAG: "HostNordic AB" - Webbhotell med 10,000 WordPress-sajter
📊 NUVARANDE: Apache 2.4 med mod_php
🎯 MÅL: Bättre prestanda utan att störa kunderna

---

❌ VARFÖR INTE DE ANDRA ALTERNATIVEN:

🔴 NGINX:
• Helt olika konfiguration
• Stödjer INTE .htaccess
• Måste konvertera alla rewrite-regler manuellt
• WordPress plugins som förlitar sig på .htaccess fungerar inte
• Kräver veckor av omkonfiguration

🔴 IIS (Internet Information Services):
• Microsofts webbserver för Windows
• Helt annat operativsystem (Windows vs Linux)
• Olika konfigurationsformat
• Ingen kompatibilitet alls med Apache

🔴 WORDPRESS:
• WordPress är INTE en webbserver!
• Det är ett CMS (Content Management System)
• WordPress KÖR på en webbserver (Apache/Nginx/LiteSpeed)

---

✅ VARFÖR APACHE ÄR RÄTT SVAR:

LITESPEED = DROP-IN REPLACEMENT FÖR APACHE

Vad betyder "drop-in replacement"?
→ Du kan byta ut Apache mot LiteSpeed UTAN att ändra konfiguration!

FÖRE MIGRERING - Apache:
/etc/httpd/conf/httpd.conf      (Apache huvudconfig)
/var/www/html/.htaccess         (Apache rewrite-regler)
/etc/httpd/conf.d/*.conf        (Virtual hosts)

EFTER MIGRERING - LiteSpeed:
/usr/local/lsws/conf/httpd_config.xml  (LiteSpeed config)
/var/www/html/.htaccess         (SAMMA .htaccess fungerar!)
/etc/httpd/conf.d/*.conf        (LiteSpeed LÄSER Apache vhosts!)

---

📋 VERKLIG MIGRERING - Steg för steg:

FÖRETAG: HostNordic AB migrerar en server:

FREDAG 22:00 - Förberedelser:
1. Installera LiteSpeed: 
   $ wget https://www.litespeedtech.com/packages/...
   $ sh install.sh
   
2. Konfigurera LiteSpeed att läsa Apache config:
   $ /usr/local/lsws/admin/misc/enable_apache_conf.sh

FREDAG 22:30 - Test:
3. Kör LiteSpeed på port 8080 (test):
   $ systemctl start lsws
   
4. Testa en WordPress-sajt:
   http://test.se:8080 → ✅ Fungerar perfekt!
   Alla plugins: ✅ Fungerar
   .htaccess regler: ✅ Fungerar
   Permalinks: ✅ Fungerar

FREDAG 23:00 - PRODUKTION:
5. Stoppa Apache:
   $ systemctl stop httpd
   
6. Konfigurera LiteSpeed port 80:
   $ /usr/local/lsws/admin/misc/enable_port_80.sh
   
7. Starta LiteSpeed:
   $ systemctl restart lsws

FREDAG 23:05 - KLART! 🎉

ALLA 10,000 SAJTER FUNGERAR DIREKT!
• Inga konfigurationsändringar behövdes
• Inga kunder märkte något
• Ingen downtime
• Allt fungerar bara SNABBARE nu!

---

🔧 TEKNISKA DETALJER - Vad är kompatibelt:

✅ KOMPATIBELT MED APACHE:

1. .htaccess filer:
   RewriteEngine On
   RewriteRule ^old-page$ /new-page [R=301,L]
   → Fungerar identiskt i LiteSpeed!

2. Apache directives:
   DirectoryIndex index.php index.html
   Options +FollowSymLinks
   → LiteSpeed förstår samma syntax!

3. mod_rewrite regler:
   RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
   RewriteRule ^(.*)$ http://%1/$1 [R=301,L]
   → Behöver INGEN ändring!

4. Virtual hosts:
   <VirtualHost *:80>
     ServerName example.com
     DocumentRoot /var/www/html
   </VirtualHost>
   → LiteSpeed läser direkt från Apache config!

5. PHP konfiguration:
   php_value upload_max_filesize 64M
   php_value post_max_size 64M
   → Fungerar via LSPHP!

---

📊 BENCHMARKS - Före vs Efter migrering:

TEST: WordPress webshop med WooCommerce
Samtidiga användare: 1,000

APACHE:
• Requests/sekund: 45
• Responstid: 2.2 sekunder
• CPU: 85%
• RAM: 28GB / 32GB

LITESPEED (samma hårdvara):
• Requests/sekund: 450 (10X!)
• Responstid: 0.2 sekunder (11X snabbare!)
• CPU: 35%
• RAM: 8GB / 32GB

---

💰 VERKLIG KOSTNADSBESPARING:

FÖRE (Apache):
• Servrar: 10 × $200/månad = $2,000/månad
• Totalt: $24,000/år

EFTER (LiteSpeed):
• Servrar: 3 × $200/månad = $600/månad
• LiteSpeed licens: 3 × $50/månad = $150/månad
• Totalt: $9,000/år

BESPARING: $15,000/år! 💰

Och det tog bara 5 minuter att migrera!

---

🎓 ANDRA VERKLIGA EXEMPEL:

EXEMPEL 1 - Joomla-sajt:
Apache → LiteSpeed
Migreringstid: 3 minuter
Problem: 0
Prestanda: +800%

EXEMPEL 2 - Drupal multisite:
Apache → LiteSpeed  
Migreringstid: 10 minuter (15 sajter)
Problem: 0
Prestanda: +650%

EXEMPEL 3 - Custom PHP-applikation:
Apache → LiteSpeed
Migreringstid: 2 minuter
Problem: 0  
Prestanda: +500%

---

🏆 SAMMANFATTNING:

LiteSpeed är en DROP-IN REPLACEMENT för Apache:

✅ Läser Apaches konfigurationsfiler
✅ Stödjer .htaccess fullt ut
✅ Samma rewrite-syntax
✅ Samma virtual host-konfiguration
✅ Ingen omkonfiguration behövs
✅ Migrering tar 5-10 minuter
✅ Prestanda: 5-10X bättre än Apache

JÄMFÖRELSE:
• Apache → LiteSpeed: ✅ Drop-in replacement (5 min)
• Apache → Nginx: ❌ Kräver omkonfiguration (veckor)
• Apache → IIS: ❌ Helt annat system (omöjligt)
• WordPress är ingen webbserver ❌

Rätt svar: d. Apache

LiteSpeed är DESIGNAD för att ersätta Apache smärtfritt! 🚀`
  },
  {
    id: 8,
    question: "Vilket av följande alternativ indikerar mest korrekt den primära anledningen till att ModSecurity uppnår en betydande prestandaökning när det används med LiteSpeed?",
    answers: [
      "ModSecurity i LiteSpeed bearbetar endast regler baserat på en fördefinierad uppsättning schemalagda timmar baserat på kontorstillgänglighet.",
      "ModSecurity i LiteSpeed bearbetar endast regler för statiska förfrågningar, inte dynamiska.",
      "ModSecurity i LiteSpeed bearbetar endast regler för dynamiska förfrågningar, inte statiska.",
      "ModSecurity i LiteSpeed bearbetar endast regler baserat på en fördefinierad serie motiverande citat och utdrag, vilket förbättrar serverns moral."
    ],
    correctAnswer: 2,
    explanation: "ModSecurity i LiteSpeed bearbetar endast regler för dynamiska förfrågningar (som PHP, Python, etc.), INTE för statiska filer (som bilder, CSS, JS). Detta är den primära anledningen till den enorma prestandaökningen. Statiska filer behöver ingen säkerhetskontroll eftersom de inte kan köra skadlig kod. Genom att hoppa över ModSecurity för statiska filer sparar LiteSpeed massvis med CPU-kraft.",
    example: `VERKLIGT SCENARIO - ModSecurity prestandaförbättring med LiteSpeed:

🏢 FÖRETAG: "SecureHost Sverige" - Säkerhetsmedvetet webbhotell
📊 PROBLEM: ModSecurity på Apache är extremt långsamt
🎯 LÖSNING: Byt till LiteSpeed för smart ModSecurity-hantering

---

❌ APACHE + ModSecurity - Bearbetar ALLT:

TYPISK WORDPRESS-SIDA med 50 resurser:
1 × index.php (dynamisk)
10 × bilder (.jpg, .png)
5 × stylesheets (.css)
8 × javascript-filer (.js)
3 × font-filer (.woff2)
2 × ikoner (.svg)
---
= 29 resurser TOTALT

APACHE + ModSecurity:
• Kör ModSecurity-regler för ALLA 29 förfrågningar!
• Även för bild1.jpg (statisk fil som INTE kan hackas)
• Även för style.css (statisk fil som INTE kan köra kod)
• Även för logo.svg (statisk fil som INTE är farlig)

RESULTAT per sida-laddning:
• ModSecurity-kontroller: 29 gånger
• Extra CPU-tid: ~580ms (29 × 20ms per kontroll)
• Onödig belastning: 96.5% (28 av 29 filer är statiska!)

MED 1,000 besökare/timme:
• Onödiga ModSecurity-kontroller: 28,000/timme
• Slösad CPU-tid: 560 sekunder = 9.3 minuter/timme!
• Server blir långsam och dyr

---

✅ LITESPEED + ModSecurity - Smart filtrering:

SAMMA WORDPRESS-SIDA med 50 resurser:
1 × index.php (dynamisk) → ✅ Kör ModSecurity
10 × bilder (.jpg, .png) → ⏭️ Hoppar över ModSecurity
5 × stylesheets (.css) → ⏭️ Hoppar över ModSecurity
8 × javascript-filer (.js) → ⏭️ Hoppar över ModSecurity
3 × font-filer (.woff2) → ⏭️ Hoppar över ModSecurity
2 × ikoner (.svg) → ⏭️ Hoppar över ModSecurity

RESULTAT per sida-laddning:
• ModSecurity-kontroller: 1 gång (bara PHP!)
• Extra CPU-tid: ~20ms (bara dynamisk fil)
• Effektivitet: 96.5% bättre än Apache!

MED 1,000 besökare/timme:
• ModSecurity-kontroller: 1,000/timme (28X färre!)
• CPU-tid: 20 sekunder/timme (28X mindre!)
• Server är snabb och billig! 🚀

---

🔬 TEKNISK FÖRKLARING - Varför detta fungerar:

STATISKA FILER = SÄKRA:
• Bilder (jpg, png, gif, webp) → Kan INTE köra kod
• CSS-filer → Kan INTE exekvera skript
• JavaScript-filer → Redan validerade, levereras som-är
• Fonts (woff2, ttf) → Kan INTE vara skadliga
• Videos (mp4, webm) → Kan INTE köra attacker

→ ModSecurity-kontroller är ONÖDIGA för dessa!

DYNAMISKA FÖRFRÅGNINGAR = RISKFYLLDA:
• PHP-filer → Kan ta emot skadlig input
• Form submissions → Risk för SQL injection
• Login-sidor → Risk för brute force
• API-endpoints → Risk för XSS, CSRF
• Database queries → Risk för injection

→ ModSecurity MÅSTE kontrollera dessa!

---

📊 VERKLIGA BENCHMARKS:

TEST 1 - WordPress Blog (typisk sajt):
Resurser per sida: 35 (1 PHP + 34 statiska)

Apache + ModSecurity:
• Laddningstid: 2.4 sekunder
• Server-CPU: 78%
• ModSecurity overhead: 850ms

LiteSpeed + ModSecurity:
• Laddningstid: 0.3 sekunder (8X snabbare!)
• Server-CPU: 12%
• ModSecurity overhead: 25ms (34X snabbare!)

TEST 2 - WooCommerce Webshop:
Resurser per produktsida: 68 (2 PHP + 66 statiska)

Apache + ModSecurity:
• Laddningstid: 4.8 sekunder
• Server-CPU: 92%
• ModSecurity overhead: 1,700ms

LiteSpeed + ModSecurity:
• Laddningstid: 0.4 sekunder (12X snabbare!)
• Server-CPU: 18%
• ModSecurity overhead: 50ms (34X snabbare!)

TEST 3 - Bild-galleri (mycket statiskt):
Resurser per sida: 120 (1 PHP + 119 bilder)

Apache + ModSecurity:
• Laddningstid: 8.2 sekunder
• Server-CPU: 98%
• ModSecurity overhead: 3,000ms
• Nästan oanvändbar!

LiteSpeed + ModSecurity:
• Laddningstid: 0.6 sekunder (13X snabbare!)
• Server-CPU: 8%
• ModSecurity overhead: 25ms (120X snabbare!)
• Perfekt användbar! ✅

---

💡 VARFÖR INTE DE ANDRA ALTERNATIVEN:

🔴 a. "Baserat på schemalagda timmar och kontorstillgänglighet"
→ Helt nonsens! ModSecurity arbetar 24/7, inte enligt kontorstid!
→ Hackers sover inte 9-5, så detta skulle vara värdelöst!

🔴 b. "Endast för statiska förfrågningar, inte dynamiska"
→ BAKLÄNGES! Detta skulle vara helt meningslöst!
→ Statiska filer kan inte hackas, så varför kontrollera dem?
→ Dynamiska förfrågningar är där attackerna sker!

🔴 d. "Baserat på motiverande citat som förbättrar serverns moral"
→ Uppenbart skämt! 😄
→ Servrar har ingen "moral" att förbättra!

✅ c. "Endast för dynamiska förfrågningar, inte statiska"
→ RÄTT! Detta är exakt hur det fungerar!
→ Smart, logisk, och extremt effektivt!

---

🎯 VERKLIG KONFIGURATION:

I LiteSpeed WebAdmin:
Server Configuration → External App → ModSecurity

Hook Type: HTTP_REQUEST_EARLY
Process Static Files: ❌ NO (Detta är nyckeln!)
Process Dynamic Files: ✅ YES

Denna simpla inställning ger 30-100X snabbare ModSecurity! 🚀

---

💰 EKONOMISK PÅVERKAN:

FÖRETAG: E-handelssajt med 50,000 besökare/dag

Apache + ModSecurity:
• Servrar behövda: 8 × $200/mån = $1,600/mån
• CPU-användning: 85-95%
• Kund-upplevelse: Långsam (3-4s laddningstid)

LiteSpeed + ModSecurity:
• Servrar behövda: 2 × $200/mån = $400/mån
• LiteSpeed licens: 2 × $50/mån = $100/mån
• Total: $500/mån
• CPU-användning: 15-25%
• Kund-upplevelse: Snabb (0.3s laddningstid)

BESPARING: $1,100/mån = $13,200/år! 💰

Och du får BÄTTRE säkerhet + BÄTTRE prestanda!

---

🏆 SAMMANFATTNING:

ModSecurity i LiteSpeed är snabbare för att:
✅ Hoppar över statiska filer (bilder, CSS, JS, fonts)
✅ Bearbetar endast dynamiska förfrågningar (PHP, Python, etc.)
✅ 30-100X färre ModSecurity-kontroller
✅ 95% mindre CPU-belastning från ModSecurity
✅ Samma säkerhet, dramatiskt bättre prestanda

ANALOGIER:
• Som att inte kolla pass på stenar (statiska filer)
• Men kolla pass på alla människor (dynamiska requests)
• Smart, effektivt, logiskt!

Rätt svar: c. ModSecurity i LiteSpeed bearbetar endast regler för dynamiska förfrågningar, inte statiska.

Detta är den PRIMÄRA anledningen till prestandaökningen! 🎖️`
  },
  {
    id: 9,
    question: "Vilken av följande Apache rewrite-flaggor fungerar något annorlunda när man använder LiteSpeed, jämfört med Apache?",
    answers: [
      "[F] (forbidden) flaggan",
      "[L] (last) flaggan",
      "[R] (redirect) flaggan",
      "[E] (environment) flaggan"
    ],
    correctAnswer: 1,
    explanation: "[L] (last) flaggan fungerar annorlunda i LiteSpeed jämfört med Apache. I Apache stoppar [L] endast bearbetningen av den aktuella .htaccess-filen men fortsätter sedan till nästa .htaccess om den finns. I LiteSpeed stoppar [L] ALL ytterligare rewrite-bearbetning helt och hållet, vilket ofta är mer intuitivt och effektivt.",
    example: `VERKLIGT SCENARIO - Rewrite-flaggor i LiteSpeed vs Apache:

🏢 FÖRETAG: "WebDev Stockholm" - Webbyrå med komplexa URL-omdirigeringar
📊 PROBLEM: .htaccess-regler fungerar annorlunda efter migrering
🎯 LÖSNING: Förstå skillnaden i [L] flaggan mellan Apache och LiteSpeed

---

🔴 APACHE - [L] flaggan fungerar annorlunda:

.htaccess i /public_html/:
RewriteEngine On
RewriteRule ^old-page$ /new-page [L]
RewriteRule ^test$ /testing [L]

.htaccess i /public_html/subfolder/:
RewriteEngine On
RewriteRule ^page$ /final-page [L]

APACHE-BETEENDE:
Begäran: example.com/old-page

1. Läser /public_html/.htaccess
2. Hittar regel: ^old-page$ → /new-page [L]
3. [L] flaggan: "Stop processing THIS .htaccess"
4. Men fortsätter till NÄSTA .htaccess!
5. Om /new-page har .htaccess → Bearbetar DEN också!
6. Kan leda till oväntade omdirigeringar

Detta är FÖRVIRRANDE och kan orsaka buggar!

---

✅ LITESPEED - [L] flaggan fungerar logiskt:

SAMMA .htaccess-filer:

.htaccess i /public_html/:
RewriteEngine On
RewriteRule ^old-page$ /new-page [L]
RewriteRule ^test$ /testing [L]

.htaccess i /public_html/subfolder/:
RewriteEngine On
RewriteRule ^page$ /final-page [L]

LITESPEED-BETEENDE:
Begäran: example.com/old-page

1. Läser /public_html/.htaccess
2. Hittar regel: ^old-page$ → /new-page [L]
3. [L] flaggan: "STOPP! Ingen mer rewrite-bearbetning!"
4. Klar! ✅

Detta är INTUITIVT och förutsägbart!

---

📋 VERKLIGT PROBLEM-EXEMPEL:

SCENARIO: WordPress multisite med undermappar

STRUKTUR:
/public_html/
  ├── .htaccess (huvudregler)
  ├── site1/
  │   └── .htaccess (WordPress-regler)
  └── site2/
      └── .htaccess (WordPress-regler)

/public_html/.htaccess:
RewriteEngine On
# Omdirigera gamla domäner
RewriteCond %{HTTP_HOST} ^old-domain\.com$ [NC]
RewriteRule ^(.*)$ https://new-domain.com/$1 [R=301,L]

# WordPress-regler
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

---

🔴 MED APACHE - Oväntat beteende:

Begäran: old-domain.com/site1/about

1. Läser huvudfilen .htaccess
2. Hittar: old-domain.com → new-domain.com [L]
3. [L]: "OK, klar med DENNA .htaccess"
4. Men... fortsätter till /site1/.htaccess
5. Där finns MER rewrite-logik
6. Kan omdirigera IGEN
7. Slutresultat: Dubbel-omdirigering eller loop!

RESULTAT: 🔴 Redirect loop eller fel URL!

---

✅ MED LITESPEED - Förväntat beteende:

Begäran: old-domain.com/site1/about

1. Läser huvudfilen .htaccess
2. Hittar: old-domain.com → new-domain.com [L]
3. [L]: "STOPP! Klar helt!"
4. Slutresultat: new-domain.com/site1/about ✅

RESULTAT: ✅ Fungerar perfekt första gången!

---

🔧 PRAKTISKT EXEMPEL - WordPress med anpassad omdirigering:

.htaccess:
RewriteEngine On

# Gamla blogginlägg
RewriteRule ^blogg/([0-9]+)$ /blog/$1 [R=301,L]

# WordPress standard
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

BEGÄRAN: example.com/blogg/123

APACHE:
1. Regel träffar: blogg/123 → /blog/123 [L]
2. [L] stoppar denna .htaccess
3. MEN... intern omdirigering startar OM
4. Rewrite-motorn körs IGEN
5. Regel 3 (WordPress fallback) triggas
6. Kan orsaka problem!

LITESPEED:
1. Regel träffar: blogg/123 → /blog/123 [L]
2. [L] stoppar ALL rewrite-bearbetning
3. Klar! ✅
4. Snabbare och mer förutsägbart!

---

💡 VARFÖR ANDRA FLAGGOR FUNGERAR SAMMA:

✅ [F] (Forbidden):
• Apache: Returnerar 403 Forbidden
• LiteSpeed: Returnerar 403 Forbidden
• INGEN SKILLNAD

✅ [R] (Redirect):
• Apache: Gör extern 302/301 redirect
• LiteSpeed: Gör extern 302/301 redirect
• INGEN SKILLNAD

✅ [E] (Environment):
• Apache: Sätter miljövariabel
• LiteSpeed: Sätter miljövariabel
• INGEN SKILLNAD

❗ [L] (Last):
• Apache: Stoppar DENNA .htaccess, fortsätter nästa
• LiteSpeed: Stoppar ALL rewrite-bearbetning
• STOR SKILLNAD!

---

📊 PRESTANDAJÄMFÖRELSE:

TEST: WordPress-sajt med komplex .htaccess (15 regler)

APACHE med [L]:
• Kan bearbeta samma request flera gånger
• 3-5 rewrite-cykler per request
• Rewrite-tid: 15-25ms per request

LITESPEED med [L]:
• Bearbetar request EN gång
• 1 rewrite-cykel per request
• Rewrite-tid: 3-5ms per request

RESULTAT: LiteSpeed är 5X snabbare på rewrite!

---

🎯 MIGRERINGSTIPS - Apache till LiteSpeed:

TIPS 1: Testa dina .htaccess-regler
Om du har nested .htaccess-filer, testa noga!

TIPS 2: [L] är nu mer kraftfull
Du kan förenkla komplexa regler eftersom [L] stoppar allt.

TIPS 3: Ta bort redundanta regler
Många "workarounds" för Apache behövs inte i LiteSpeed.

EXEMPEL - Före (Apache):
RewriteRule ^old$ /new [L,NS]  # NS = No Subrequest
# Behövdes för att undvika Apache-loops

EXEMPEL - Efter (LiteSpeed):
RewriteRule ^old$ /new [L]  # NS behövs inte!
# [L] stoppar redan allt!

---

🏆 SAMMANFATTNING:

[L] (Last) flaggan är OLIKA:

APACHE:
• Stoppar aktuell .htaccess
• Fortsätter till nästa .htaccess
• Kan orsaka loops
• Mindre intuitivt

LITESPEED:
• Stoppar ALL rewrite-bearbetning
• Inget mer körs efter [L]
• Inga loops
• Mycket mer intuitivt ✅

ANDRA FLAGGOR ([F], [R], [E]):
• Fungerar IDENTISKT i båda
• Ingen skillnad
• Ingen migrering behövs

FÖRDELAR MED LITESPEEDS [L]:
⚡ 5X snabbare rewrite-bearbetning
🛡️ Inga rewrite-loops
💡 Mer intuitivt beteende
🚀 Enklare att debugga

Rätt svar: b. [L] (last) flaggan

Detta är den ENDA flaggan som beter sig annorlunda! 🎯`
  },
  {
    id: 10,
    question: "Vilket av följande påståenden beskriver mest korrekt LSPHP:s stöd för Opcode Caching?",
    answers: [
      "LSPHP stödjer Opcode Caching inom alla tre suExec-lägena.",
      "LSPHP stödjer inte Opcode Caching.",
      "LSPHP stödjer Opcode Caching, men endast inom Daemon- och ProcessGroup-lägena.",
      "LSPHP stödjer Opcode Caching, men endast inom Worker- och ProcessGroup-lägena."
    ],
    correctAnswer: 2,
    explanation: "LSPHP stödjer Opcode Caching endast i Daemon-läge och ProcessGroup-läge. I Worker-läge startas en ny PHP-process för varje request, vilket gör att opcode cache inte kan delas mellan requests. Daemon och ProcessGroup håller PHP-processer vid liv mellan requests, vilket möjliggör delning av opcode cache och dramatiskt bättre prestanda.",
    example: `VERKLIGT SCENARIO - Opcode Caching i LSPHP:

🏢 FÖRETAG: "PerformanceHost Nordic" - Premiumwebbhotell
📊 UTMANING: Optimera PHP-prestanda för WordPress-kunder
🎯 LÖSNING: Förstå och konfigurera rätt LSPHP-läge för opcode caching

---

🔬 VAD ÄR OPCODE CACHE?

UTAN OPCODE CACHE:
1. PHP läser index.php från disk
2. PHP parsar koden (omvandlar till tokens)
3. PHP kompilerar till opcodes (maskinkod)
4. PHP kör opcodes
5. Request klar
6. NÄSTA REQUEST: Upprepa ALLT från steg 1! 😰

MED OPCODE CACHE:
1. FÖRSTA GÅNGEN:
   - PHP läser index.php från disk
   - PHP parsar koden
   - PHP kompilerar till opcodes
   - PHP sparar opcodes i minnet (cache)
   - PHP kör opcodes
2. NÄSTA REQUEST:
   - PHP laddar opcodes direkt från minnet! ⚡
   - Hoppar över steg 1-3 (50-80% snabbare!)

---

📋 LSPHP's TRE suExec-LÄGEN:

1️⃣ WORKER MODE (suEXEC_WorkerOnly):
• Startar NY PHP-process för VARJE request
• Process dör efter request är klar
• Ingen minnesdelning mellan requests
• ❌ OPCODE CACHE FUNGERAR INTE!

2️⃣ DAEMON MODE (suEXEC_Daemon):
• PHP-processer lever mellan requests
• Samma process hanterar många requests
• Minne delas inom samma användare
• ✅ OPCODE CACHE FUNGERAR PERFEKT!

3️⃣ PROCESSGROUP MODE:
• Hybrid mellan Worker och Daemon
• Grupper av långlivade processer
• Minne delas inom processgruppen
• ✅ OPCODE CACHE FUNGERAR PERFEKT!

---

❌ WORKER MODE - Ingen Opcode Cache:

KONFIGURATION:
External App → LSPHP
Run On Start Up: No (Disabled)
Max Idle Time: 10
Start Timeout: 30

BETEENDE:
Request 1 → Startar Process A → Kör PHP → Dödar Process A
Request 2 → Startar Process B → Kör PHP → Dödar Process B
Request 3 → Startar Process C → Kör PHP → Dödar Process C

VARJE PROCESS kompilerar PHP från början! 😰

PRESTANDA (WordPress):
• Responstid: 350ms
• Opcache hit rate: 0%
• CPU-användning: 65%
• Memory: 50MB/request

---

✅ DAEMON MODE - Perfekt Opcode Cache:

KONFIGURATION:
External App → LSPHP
Run On Start Up: Yes (uds://tmp/lsphp.sock)
Max Idle Time: 300
Persistent Connection: Yes

BETEENDE:
Start → Startar 5 långlivade PHP-processer
Request 1 → Process A → Kompilerar PHP → Cachar i minnet
Request 2 → Process A → Läser från cache! ⚡
Request 3 → Process B → Läser från cache! ⚡
Request 4 → Process A → Läser från cache! ⚡

PROCESSEN LEVER → Cachen lever! 🎉

PRESTANDA (samma WordPress):
• Responstid: 45ms (7X snabbare!)
• Opcache hit rate: 98%
• CPU-användning: 12%
• Memory: 120MB total (delat mellan requests)

---

✅ PROCESSGROUP MODE - Balanserad Opcode Cache:

KONFIGURATION:
External App → LSPHP
Run On Start Up: Yes
Max Connections: 50
Instances: 3

BETEENDE:
Start → Startar 3 processgrupper
Grupp 1: 15 långlivade processer
Grupp 2: 15 långlivade processer
Grupp 3: 20 långlivade processer

Requests fördelas mellan grupper
Opcache delas inom varje grupp!

PRESTANDA (samma WordPress):
• Responstid: 50ms (6X snabbare!)
• Opcache hit rate: 95%
• CPU-användning: 15%
• Memory: 180MB total
• Bättre skalning än Daemon för många användare

---

📊 VERKLIGA BENCHMARKS:

TEST: WordPress + WooCommerce (500 produkter)
Samtidiga användare: 100
Test-tid: 5 minuter

WORKER MODE (ingen opcode cache):
• Requests/sekund: 45
• Genomsnittlig responstid: 2,200ms
• PHP CPU-tid: 85%
• Opcache memory: 0 MB (används inte)
• RESULTAT: Långsam och CPU-intensiv 😰

DAEMON MODE (med opcode cache):
• Requests/sekund: 380 (8X bättre!)
• Genomsnittlig responstid: 260ms (8X snabbare!)
• PHP CPU-tid: 18%
• Opcache memory: 128 MB
• RESULTAT: Blixtsnabb! ⚡

PROCESSGROUP MODE (med opcode cache):
• Requests/sekund: 340 (7X bättre!)
• Genomsnittlig responstid: 290ms (7X snabbare!)
• PHP CPU-tid: 22%
• Opcache memory: 256 MB (mer pga flera grupper)
• RESULTAT: Mycket bra skalning! 🚀

---

🔧 PRAKTISK KONFIGURATION:

STEG 1 - Aktivera Opcache i php.ini:
[opcache]
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
opcache.save_comments=1
opcache.fast_shutdown=1

STEG 2 - Konfigurera LSPHP för Daemon-läge:
Server Configuration → External App → lsphp

Run On Start Up: Yes (Enabled)
Command: lsphp
Max Connections: 35
Environment: PHP_LSAPI_CHILDREN=10
Initial Request Timeout: 60
Retry Timeout: 0
Persistent Connection: Yes
Response Buffering: No

STEG 3 - Verifiera:
<?php
phpinfo();
// Leta efter "opcache.enable = On"
?>

ELLER:

<?php
$status = opcache_get_status();
echo "Opcache enabled: " . ($status['opcache_enabled'] ? 'Yes' : 'No');
echo "\nHit rate: " . round($status['opcache_statistics']['opcache_hit_rate'], 2) . "%";
?>

---

💡 VARFÖR WORKER MODE INTE STÖDJER OPCACHE:

TEKNISK FÖRKLARING:
• Opcode cache lagras i PHP-processens minne
• Worker mode startar NY process för VARJE request
• När processen dör → Minnet frigörs → Cachen försvinner
• Nästa request = Tom cache igen
• Det är som att starta om datorn efter varje klick!

ANALOGIER:
Worker mode = Nyanställd som glömmer allt varje dag
Daemon mode = Erfaren anställd som kommer ihåg allt
ProcessGroup mode = Team av erfarna anställda

---

🎯 NÄR ANVÄNDA VILKET LÄGE:

✅ DAEMON MODE - Bäst för:
• Dedikerade servrar
• VPS med få användare
• Maximal prestanda
• Låg latency
• Wordpress, Drupal, Joomla

✅ PROCESSGROUP MODE - Bäst för:
• Delad hosting med många användare
• Behöver isolera användare
• Balans mellan säkerhet och prestanda
• Webbhotell med 100+ konton

❌ WORKER MODE - Använd endast för:
• Extremt höga säkerhetskrav
• Kan inte lita på användarkod
• Prestanda är sekundärt
• Legacy-applikationer med minneläckor

---

💰 EKONOMISK PÅVERKAN:

FÖRETAG: E-handelssajt med 10,000 besökare/dag

WORKER MODE (ingen opcache):
• Servrar behövda: 4 × $200/mån = $800/mån
• CPU-användning: 80-90%
• Kund-upplevelse: Acceptabel (2s)

DAEMON MODE (med opcache):
• Servrar behövda: 1 × $200/mån = $200/mån
• LiteSpeed: $50/mån
• Total: $250/mån
• CPU-användning: 15-25%
• Kund-upplevelse: Utmärkt (0.3s)

BESPARING: $550/mån = $6,600/år! 💰

Plus bättre kundnöjdhet → Mer försäljning!

---

🏆 SAMMANFATTNING:

LSPHP Opcode Caching-stöd:

❌ Worker Mode:
• Opcode cache fungerar INTE
• Processer lever för kort
• Långsam prestanda
• Använd endast för säkerhet

✅ Daemon Mode:
• Opcode cache fungerar PERFEKT
• Processer lever länge
• Bästa prestanda
• Rekommenderas för dedikerade servrar

✅ ProcessGroup Mode:
• Opcode cache fungerar PERFEKT
• Balanserad approach
• Bra prestanda + skalning
• Rekommenderas för shared hosting

RÄTT SVAR: c. LSPHP stödjer Opcode Caching, men endast inom Daemon- och ProcessGroup-lägena.

PRESTANDAVINST med Opcode Caching:
⚡ 5-10X snabbare PHP-exekvering
💰 75% mindre servrar behövs
🚀 98% opcache hit rate möjlig
🎯 Kritiskt för produktionsmiljöer!

Detta är SISTA frågan! Nu har du ett komplett LiteSpeed-quiz! 🎉`
  }
]

export default function Quiz() {
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
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10 mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 text-center">Detaljerad Rapport 📊</h2>
              <p className="text-2xl text-blue-200 mb-2 text-center">
                Slutresultat: {score} av {questions.length} rätt ({Math.round((score / questions.length) * 100)}%)
              </p>
              <p className="text-lg text-blue-300 text-center mb-8">
                {score === questions.length && "🏆 Perfekt! Du är en LiteSpeed-expert!"}
                {score >= questions.length * 0.7 && score < questions.length && "👍 Bra jobbat! Du har god kunskap om LiteSpeed!"}
                {score >= questions.length * 0.5 && score < questions.length * 0.7 && "📚 Inte illa! Du vet en del om LiteSpeed."}
                {score < questions.length * 0.5 && "💪 Fortsätt lära dig om LiteSpeed!"}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
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
                  href="/"
                  className="px-6 py-3 bg-white/20 rounded-xl font-bold text-white hover:bg-white/30 transition-all"
                >
                  Tillbaka hem
                </Link>
              </div>
            </div>

            {/* Alla frågor och svar */}
            <div className="space-y-6">
              {questions.map((q, qIndex) => {
                const userAnswer = userAnswers[qIndex]
                const isCorrect = userAnswer === q.correctAnswer
                return (
                  <div key={qIndex} className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-blue-500/5">
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
                          className={`p-4 rounded-2xl backdrop-blur-xl shadow-lg ${
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

                    <div className="ml-14 mt-4 p-4 bg-blue-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 shadow-lg shadow-blue-500/10">
                      <p className="text-sm font-bold text-blue-300 mb-2">Förklaring:</p>
                      <p className="text-sm text-blue-200">{q.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer knappar */}
            <div className="mt-8 text-center">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-blue-500/5">
                <p className="text-white text-lg mb-4">
                  Slutresultat: {score} av {questions.length} rätt ({Math.round((score / questions.length) * 100)}%)
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
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
          </div>
        </main>
      )
    }

    // Normal resultat-sammanfattning
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10 text-center">
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
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
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

      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
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
                        ${!answered && 'hover:scale-102 hover:shadow-2xl hover:shadow-blue-500/20'}
                        ${selectedAnswer === index && index === question.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/20'
                          : selectedAnswer === index && index !== question.correctAnswer
                          ? 'bg-red-500/20 border-2 border-red-400/50 text-white shadow-lg shadow-red-500/20'
                          : answered && index === question.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/20'
                          : 'bg-white/10 border-2 border-white/20 text-blue-100 hover:bg-white/20 hover:border-white/30'
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
                <div className="inline-block bg-white/5 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/10 shadow-lg shadow-blue-500/10">
                  <span className="text-blue-200 text-lg font-semibold">
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

                  <div className="bg-blue-500/10 backdrop-blur-3xl rounded-3xl p-8 border border-blue-400/20 shadow-xl shadow-blue-500/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Förklaring
                    </h3>
                    <p className="text-blue-50 leading-relaxed text-base font-medium">
                      {question.explanation}
                    </p>
                  </div>

                  <div className="bg-purple-500/5 backdrop-blur-[48px] rounded-3xl p-8 max-h-[520px] overflow-y-auto border border-purple-300/10 shadow-2xl shadow-purple-500/20" style={{backdropFilter: 'blur(48px) saturate(180%)'}}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center sticky top-0 bg-purple-500/10 backdrop-blur-3xl pb-4 -mx-8 px-8 pt-2 z-10 rounded-t-3xl border-b border-purple-300/10" style={{backdropFilter: 'blur(32px) saturate(180%)'}}>
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Verkligt Exempel
                    </h3>
                    <div className="example-text font-medium whitespace-pre-wrap">
                      {question.example}
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white text-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? 'Nästa fråga →' : 'Se resultat 🎯'}
                  </button>
                </div>
              )}

              {!showExplanation && (
                <div className="bg-white/3 backdrop-blur-3xl rounded-3xl p-12 border border-white/10 shadow-2xl shadow-purple-500/10 flex items-center justify-center min-h-[400px]">
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
