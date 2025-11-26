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
    question: "Given the following options, which best describes something about an email address that can be determined by using the WHM Home » Email » Mail Troubleshooter interface, found in WHM?",
    answers: [
      "It will indicate if the destination email address has been greylisted.",
      "It will indicate whether the destination address forwards mail to a remote server.",
      "It will indicate if the destination email address has reached its quota limitation.",
      "It will indicate whether the file permissions on the destination email address' mail folder are correct."
    ],
    correctAnswer: 1,
    explanation: "WHM Mail Troubleshooter kan visa om en e-postadress vidarebefordrar mail till en remote server. Detta är en viktig funktion för att diagnostisera mail-problem och förstå mail-flödet. Mail Troubleshooter testar mail-delivery och visar detaljerad information om hur mail hanteras, inklusive om det finns forwarding-regler som skickar mail vidare till externa servrar.",
    example: `VERKLIGT SCENARIO - Mail Troubleshooter visar forwarding:

🏢 FÖRETAG: "NordicHost AB" - Webbhotell med 2,000 mail-konton
📊 PROBLEM: Kunder klagar på att mail inte kommer fram
🎯 LÖSNING: Använd Mail Troubleshooter för att diagnostisera

---

🔧 WHM MAIL TROUBLESHOOTER:

STEG-FÖR-STEG:

1. Logga in på WHM (port 2087)
2. Navigera: WHM Home » Email » Mail Troubleshooter
3. Ange e-postadress att testa: kund@example.com
4. Klicka "Troubleshoot"
5. Mail Troubleshooter kör tester och visar resultat

---

✅ VAD MAIL TROUBLESHOOTER VISAR:

1. MAIL FORWARDING (RÄTT SVAR!):
   → "This address forwards to: remote@external-server.com"
   → Visar om mail vidarebefordras till remote server
   → Detta är huvudfunktionen!

2. MAIL DELIVERY STATUS:
   → Kan mail levereras?
   → Är servern nåbar?

3. DNS RECORDS:
   → MX-records korrekta?
   → A-records korrekta?

4. MAIL SERVER CONNECTION:
   → Kan servern ansluta?
   → Port 25 öppen?

---

📊 VERKLIGT EXEMPEL - 3 olika scenarios:

SCENARIO 1 - Lokal mail (ingen forwarding):
Mail Troubleshooter för: info@example.com

Resultat:
✓ Mail address exists locally
✓ Mailbox: /home/example/mail/info
✓ No forwarding configured
→ Mail levereras lokalt ✅

SCENARIO 2 - Forwarding till remote server (RÄTT SVAR!):
Mail Troubleshooter för: support@example.com

Resultat:
✓ Mail address exists
✓ Forwarding configured
→ Forwards to: support@external-company.com
→ Remote server: mail.external-company.com
→ This is a REMOTE forward
→ Mail skickas till extern server ✅

SCENARIO 3 - Både lokal och forwarding:
Mail Troubleshooter för: contact@example.com

Resultat:
✓ Mail address exists locally
✓ Mailbox: /home/example/mail/contact
✓ Forwarding ALSO configured
→ Forwards to: contact@backup-email.com
→ Mail levereras BÅDE lokalt OCH vidarebefordras ✅

---

💰 VERKLIGT PROBLEM - Mail går inte fram:

KUND: "Jag får inga mail på info@mysite.com!"

ADMIN använder Mail Troubleshooter:

Test: info@mysite.com

Resultat från Mail Troubleshooter:
→ "This address forwards to: old-email@gmail.com"
→ "Remote server: gmail.com"
→ "Forwarding test: FAILED"
→ "Cannot connect to remote server"

PROBLEM IDENTIFIERAT:
• Mail vidarebefordras till Gmail
• Men forwarding fungerar inte
• Gmail-servern svarar inte

LÖSNING:
• Kontrollera forwarding-konfigurationen
• Testa manuellt: telnet gmail.com 25
• Uppdatera forwarding om nödvändigt

UTAN Mail Troubleshooter:
• Admin skulle behöva:
  - SSH till servern
  - Läsa /etc/valiases
  - Testa manuellt
  - Tar 30 minuter

MED Mail Troubleshooter:
• Admin klickar "Troubleshoot"
• Ser direkt: "Forwards to remote server"
• Tar 30 sekunder! ⚡

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

a. "Greylisting":
→ Greylisting är en spam-filter-teknik
→ Mail Troubleshooter testar INTE greylisting
→ Detta kontrolleras av mail-servern (Postfix/Exim)
→ INTE en funktion i Mail Troubleshooter

c. "Quota limitation":
→ Mail Troubleshooter testar INTE quota
→ Quota kontrolleras via:
  - cPanel » Email Accounts
  - WHM » Account Information
  - Disk usage tools
→ Mail Troubleshooter fokuserar på DELIVERY, inte storage

d. "File permissions":
→ Mail Troubleshooter testar INTE file permissions
→ Permissions kontrolleras via:
  - SSH: ls -la /home/user/mail/
  - File Manager i cPanel
  - WHM » Fix Permissions
→ Mail Troubleshooter testar mail-delivery, inte filsystem

✅ b. "Forwards to remote server":
→ RÄTT! Detta är EXAKT vad Mail Troubleshooter visar
→ Det är huvudfunktionen för att diagnostisera forwarding

---

🔍 TEKNISKA DETALJER:

Mail Troubleshooter testar:

1. LOCAL DELIVERY:
   • Finns adressen lokalt?
   • Är mailbox korrekt konfigurerad?

2. FORWARDING (RÄTT SVAR!):
   • Finns forwarding-regler?
   • Vart vidarebefordras mail?
   • Är det lokal eller remote forwarding?
   • Kan remote server nås?

3. DNS VALIDATION:
   • MX-records korrekta?
   • A-records korrekta?

4. CONNECTION TEST:
   • Kan servern ansluta?
   • Port 25 öppen?

---

🎯 SAMMANFATTNING:

WHM Mail Troubleshooter kan visa:
✅ Om mail vidarebefordras till remote server (RÄTT SVAR!)
✅ Mail delivery status
✅ DNS-konfiguration
✅ Server-anslutning

Mail Troubleshooter kan INTE visa:
❌ Greylisting-status
❌ Quota-användning
❌ File permissions

RÄTT SVAR: b. It will indicate whether the destination address forwards mail to a remote server.

Detta är huvudfunktionen i Mail Troubleshooter! 🎯

Det hjälper dig snabbt diagnostisera mail-problem och förstå mail-flödet, särskilt när kunder har forwarding konfigurerat till externa servrar.`
  },
  {
    id: 2,
    question: "Which of the following Mail interfaces in WHM can provide you with a historical snapshot of the mail queue?",
    answers: [
      "Mail Delivery Reports",
      "Mail Delivery Status",
      "Mail Queue History",
      "Mail Queue Manager"
    ],
    correctAnswer: 2,
    explanation: "Mail Queue History i WHM ger dig en historisk översikt över mail-kön. Detta är den enda av alternativen som specifikt fokuserar på historisk data om mail-kön. Mail Queue Manager visar den aktuella kön, medan Mail Queue History visar vad som har hänt tidigare.",
    example: `VERKLIGT SCENARIO - Mail Queue History för diagnostisering:

🏢 FÖRETAG: "NordicHost AB" - Webbhotell med 5,000 mail-konton
📊 PROBLEM: Kunder klagar på att mail är försenade
🎯 LÖSNING: Använd Mail Queue History för att analysera problem

---

🔧 WHM MAIL QUEUE HISTORY:

STEG-FÖR-STEG:

1. Logga in på WHM (port 2087)
2. Navigera: WHM Home » Email » Mail Queue History
3. Välj tidsperiod (t.ex. senaste 24 timmarna)
4. Se historisk data om mail-kön

---

✅ VAD MAIL QUEUE HISTORY VISAR:

1. HISTORISK SNAPSHOT (RÄTT SVAR!):
   → Mail som var i kön tidigare
   → När mail lämnade kön
   → Leveransstatus för historiska mail
   → Detta är huvudfunktionen!

2. MAIL STATISTIK:
   → Antal mail i kön över tid
   → Leveranshastighet
   → Problem med specifika mail

3. TRENDANALYS:
   → När köer byggs upp
   → Mönster i mail-trafik
   → Identifiera problemtider

---

📊 VERKLIGT EXEMPEL - 3 olika scenarios:

SCENARIO 1 - Analysera mail-problem:
Admin öppnar Mail Queue History:

Tidsperiod: Senaste 24 timmarna

Resultat:
✓ 10:00 - 50 mail i kön
✓ 11:00 - 200 mail i kön (PROBLEM!)
✓ 12:00 - 150 mail i kön
✓ 13:00 - 30 mail i kön (normal)

INSIKT:
• Kö byggdes upp klockan 11:00
• Samtidigt som server-uppdatering
• Nu kan admin se vad som hände historiskt ✅

SCENARIO 2 - Verifiera mail-leverans:
Kund: "Jag skickade mail igår, kom det fram?"

Admin öppnar Mail Queue History:

Sök: kund@example.com
Tidsperiod: Igår

Resultat:
✓ Mail skickat: 2025-11-25 14:30
✓ Lämnade kön: 2025-11-25 14:31
✓ Levererat till: recipient@external.com
✓ Status: Delivered

INSIKT:
• Mail lämnade kön snabbt (1 minut)
• Levererat framgångsrikt
• Kan visa kunden historisk data ✅

SCENARIO 3 - Identifiera spam-problem:
Admin ser många klagomål om långsam mail

Mail Queue History visar:
✓ 08:00 - 20 mail i kön (normal)
✓ 09:00 - 500 mail i kön (SPAM!)
✓ 10:00 - 800 mail i kön (MER SPAM!)
✓ 11:00 - 200 mail i kön (börjar rensa)

INSIKT:
• Spam-attack började 09:00
• Kö byggdes upp till 800 mail
• Nu kan admin se historiken och förhindra framtida attacker ✅

---

💰 VERKLIGT PROBLEM - Mail går inte fram:

KUND: "Jag skickade viktigt mail igår, kom det fram?"

ADMIN använder Mail Queue History:

Test: Sök efter kundens mail
Tidsperiod: Igår

Resultat från Mail Queue History:
→ "Mail ID: 12345"
→ "Skickat: 2025-11-25 10:15"
→ "Lämnade kön: 2025-11-25 10:16"
→ "Status: Deferred"
→ "Försök igen: 2025-11-25 10:20"
→ "Lämnade kön: 2025-11-25 10:21"
→ "Status: Delivered"

PROBLEM IDENTIFIERAT:
• Mail var i kön i 1 minut
• Deferred första gången (remote server inte tillgänglig)
• Levererat vid andra försöket
• Total tid: 6 minuter

LÖSNING:
• Kan visa kunden exakt vad som hände
• Mail kom fram, bara lite försenat
• Remote server hade tillfälligt problem

UTAN Mail Queue History:
• Admin skulle behöva:
  - SSH till servern
  - Läsa mail-loggarna manuellt
  - Söka igenom tusentals rader
  - Tar 1-2 timmar

MED Mail Queue History:
• Admin öppnar WHM
• Klickar "Mail Queue History"
• Söker efter mail
• Ser direkt historiken
• Tar 2 minuter! ⚡

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

a. "Mail Delivery Reports":
→ Detta visar delivery-rapporter för specifika mail
→ Fokuserar på INDIVIDUELLA mail, inte kön
→ Visar INTE historisk snapshot av kön
→ Detta är för att se om specifika mail levererades

b. "Mail Delivery Status":
→ Detta visar AKTUELL status för mail-delivery
→ Visar INTE historisk data
→ Fokuserar på nuvarande tillstånd, inte historik
→ Detta är för att se vad som händer NU

d. "Mail Queue Manager":
→ Detta visar den AKTUELLA mail-kön
→ Visar mail som är i kön JUST NU
→ Visar INTE historisk snapshot
→ Detta är för att hantera nuvarande kön, inte historik

✅ c. "Mail Queue History":
→ RÄTT! Detta är EXAKT vad som ger historisk snapshot
→ Visar vad som hände i kön tidigare
→ Det är huvudfunktionen för historisk analys

---

🔍 TEKNISKA DETALJER:

Mail Queue History vs Mail Queue Manager:

MAIL QUEUE MANAGER (Aktuell):
• Visar mail i kön JUST NU
• Kan hantera/ta bort mail
• Real-time data
• För att lösa akuta problem

MAIL QUEUE HISTORY (Historisk):
• Visar mail som VAR i kön
• Historisk data över tid
• Analys och diagnostisering
• För att förstå mönster och problem

---

📊 JÄMFÖRELSE - Alla Mail-gränssnitt:

1. MAIL QUEUE MANAGER:
   → Aktuell kön
   → Hantera mail nu
   → Real-time

2. MAIL QUEUE HISTORY (RÄTT SVAR!):
   → Historisk snapshot
   → Analysera tidigare problem
   → Trendanalys

3. MAIL DELIVERY REPORTS:
   → Specifika mail-rapporter
   → Individuella mail
   → Delivery-status

4. MAIL DELIVERY STATUS:
   → Aktuell delivery-status
   → Nuvarande tillstånd
   → Real-time status

---

🎯 SAMMANFATTNING:

WHM Mail Queue History kan visa:
✅ Historisk snapshot av mail-kön (RÄTT SVAR!)
✅ Mail som var i kön tidigare
✅ Leveransstatus för historiska mail
✅ Trendanalys och mönster

Mail Queue History kan INTE visa:
❌ Aktuell kön (använd Mail Queue Manager)
❌ Real-time status (använd Mail Delivery Status)
❌ Individuella mail-rapporter (använd Mail Delivery Reports)

RÄTT SVAR: c. Mail Queue History

Detta är det ENDA gränssnittet som ger historisk snapshot av kön! 🎯

Det hjälper dig analysera problem, förstå mönster och diagnostisera mail-problem genom att se vad som hände tidigare.`
  },
  {
    id: 3,
    question: "Given the following, which option best describes an actual reason that the system may place a message into the Exim queue?",
    answers: [
      "The Exim service has been stopped and the SMTP daemon is not running.",
      "The message has been instructed to route to /dev/null.",
      "None of these options describe reasons for Exim to queue a message.",
      "There are DNS issues preventing Exim from finding the remote mail server."
    ],
    correctAnswer: 3,
    explanation: "DNS-problem som hindrar Exim från att hitta den remote mail-servern är en vanlig anledning till att mail placeras i kön. Exim försöker leverera mailet, men om det inte kan lösa mottagarens domän via DNS (t.ex. felaktig MX-record, DNS-server nere), kommer mailet att köas och Exim kommer att försöka igen senare.",
    example: `VERKLIGT SCENARIO - DNS-problem och Exim-kön:

🏢 FÖRETAG: "MailHost AB" - Mail-server med 1,000 mail-konton
📊 PROBLEM: Kunder klagar på att mail är försenade eller inte kommer fram
🎯 LÖSNING: Diagnostisera DNS-problem som orsakar köade mail

---

🔧 EXIM QUEUE OCH DNS:

När Exim försöker skicka ett mail:

1. EXIM SLÅR UPP DNS:
   • Exim frågar DNS-servern efter MX-record för mottagarens domän (t.ex. example.com)
   • MX-record pekar på mottagarens mail-server (t.ex. mail.example.com)
   • Exim slår sedan upp A-record för mail.example.com för att få IP-adressen

2. OM DNS-UPPSLAG LYCKAS:
   • Exim ansluter till mottagarens mail-server (port 25)
   • Levererar mailet direkt
   • Mailet hamnar INTE i kön (förutom kortvarigt under överföring)

3. OM DNS-UPPSLAG MISSLYCKAS (RÄTT SVAR!):
   • Exim kan INTE hitta mottagarens mail-server
   • Mailet placeras i KÖN
   • Exim kommer att försöka igen senare (retry-intervall)
   • Vanliga fel: "Host not found", "DNS lookup failed", "No MX record"

---

📊 VERKLIGT EXEMPEL - 3 olika DNS-problem scenarios:

SCENARIO 1 - MX-record saknas:
KUND: Skickar mail till user@newdomain.com
PROBLEM: newdomain.com har ingen MX-record konfigurerad

EXIM-PROCESS:
• Exim slår upp MX för newdomain.com
• DNS svarar: "No MX record"
• Exim placerar mailet i KÖN
• Exim-logg: "Host not found, try again later"
→ Mailet köas pga. DNS-problem ✅

SCENARIO 2 - Felaktig MX-record:
KUND: Skickar mail till user@wrongmx.com
PROBLEM: wrongmx.com har MX-record som pekar på icke-existerande server

EXIM-PROCESS:
• Exim slår upp MX för wrongmx.com → mail.wrongmx.com
• Exim slår upp A-record för mail.wrongmx.com → "Host not found"
• Exim placerar mailet i KÖN
• Exim-logg: "Host not found, try again later"
→ Mailet köas pga. DNS-problem ✅

SCENARIO 3 - DNS-server nere:
KUND: Skickar mail till user@anydomain.com
PROBLEM: Vår serverns konfigurerade DNS-server (t.ex. 8.8.8.8) är nere

EXIM-PROCESS:
• Exim försöker slå upp MX för anydomain.com via 8.8.8.8
• DNS-servern svarar inte
• Exim placerar mailet i KÖN
• Exim-logg: "DNS lookup failed, try again later"
→ Mailet köas pga. DNS-problem ✅

---

💰 VERKLIGT PROBLEM - 500 mail i kön:

ADMIN ser 500 mail i Exim-kön

ADMIN kontrollerar Exim-loggar:
grep "Host not found" /var/log/exim_mainlog

Resultat:
"Host not found: example.com"
"Host not found: anotherdomain.org"

PROBLEM IDENTIFIERAT:
• Många mail köas pga. DNS-problem
• Antingen är mottagarnas domäner felkonfigurerade, eller så har vår server DNS-problem

LÖSNING:
• Kontrollera vår serverns /etc/resolv.conf
• Testa DNS-uppslag manuellt: dig MX example.com
• Informera kunder om felaktiga MX-records hos mottagare

UTAN förståelse för DNS-problem:
• Admin skulle bara se "köade mail"
• Skulle inte veta varför
• Skulle kanske starta om Exim i onödan

MED förståelse för DNS-problem:
• Admin ser direkt "Host not found"
• Vet att det är ett DNS-problem
• Kan åtgärda snabbt och effektivt

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

a. "Exim service has been stopped":
→ Om Exim är stoppat, kan det INTE ta emot mail
→ Mail kommer att studsa direkt till avsändaren
→ Mail hamnar INTE i kön om tjänsten är nere

b. "Message has been instructed to route to /dev/null":
→ /dev/null är en "svart hål"
→ Mail som dirigeras hit kasseras OMEDELBART
→ Mail hamnar INTE i kön, utan försvinner direkt

c. "None of these options":
→ Fel, eftersom alternativ d är en giltig anledning

✅ d. "There are DNS issues preventing Exim from finding the remote mail server":
→ RÄTT! Detta är en mycket vanlig anledning till att mail köas
→ Exim måste kunna lösa DNS för att leverera mail

---

🎯 SAMMANFATTNING:

Exim placerar mail i kön om:
✅ DNS-problem hindrar uppslag av mottagarens server (RÄTT SVAR!)
✅ Mottagarens server är nere eller otillgänglig
✅ Mottagarens mailbox är full
✅ Servern är överbelastad

Exim placerar INTE mail i kön om:
❌ Exim-tjänsten är stoppad (mail studsar)
❌ Mail dirigeras till /dev/null (mail kasseras)

RÄTT SVAR: d. There are DNS issues preventing Exim from finding the remote mail server.

Detta är en kritisk punkt för mail-server-administration! 🎯`
  },

  {
    id: 4,
    question: "If the mail server defers a message, what did it do to the message?",
    answers: [
      "Delayed it.",
      "Classified it as spam.",
      "Rejected it.",
      "Returned it to the sender (bounced)."
    ],
    correctAnswer: 0,
    explanation: "När en mail-server deferar ett meddelande betyder det att den fördröjer leveransen. Meddelandet placeras i kön och servern kommer att försöka leverera det igen senare. Detta är INTE samma sak som att rejecta eller bouncea meddelandet - defer betyder att det är ett tillfälligt problem som kan lösas vid ett senare försök.",
    example: `VERKLIGT SCENARIO - Mail-server deferar meddelanden:

🏢 FÖRETAG: "NordicHost AB" - Webbhotell med 4,000 mail-konton
📊 PROBLEM: Många mail visar "Deferred" status i kön
🎯 FÖRKLARING: Vad betyder "defer" egentligen?

---

🔧 VAD ÄR DEFER?

DEFER = FÖDRÖJNING (RÄTT SVAR!):
→ Mail-servern kunde INTE leverera meddelandet NU
→ Men det är INTE ett permanent fel
→ Meddelandet placeras i kön
→ Servern försöker igen senare

DEFER är INTE:
❌ Reject (permanent avvisning)
❌ Bounce (returneras till avsändare)
❌ Spam (klassificering)

---

📊 VERKLIGT EXEMPEL - 3 olika scenarios:

SCENARIO 1 - Remote server nere (DEFER):
Kund skickar mail till: recipient@external.com

Mail-server försöker leverera:
1. Ansluter till external.com:25
2. Connection timeout (server nere)
3. Mail-server DEFERAR meddelandet
4. Placerar i kön för retry

Mail Queue visar:
→ "Deferred: Connection timeout"
→ "Will retry in 15 minutes"
→ Status: Queued (DEFERRED)

RESULTAT:
• Mail är INTE borttappat
• Mail är INTE returnerat
• Mail är INTE rejectat
• Mail är FÖDRÖJT för senare leverans ✅

---

SCENARIO 2 - DNS-problem (DEFER):
Kund skickar mail till: user@example.com

Mail-server försöker leverera:
1. DNS lookup för example.com
2. DNS timeout (kan inte hitta MX-record)
3. Mail-server DEFERAR meddelandet
4. Försöker igen om 15 minuter

Mail Queue visar:
→ "Deferred: DNS lookup failed"
→ "Will retry in 15 minutes"
→ Status: Queued (DEFERRED)

RESULTAT:
• Mail är FÖDRÖJT
• Kommer att försöka igen
• Om DNS fixas → Mail levereras
• Om DNS inte fixas → Bounce efter 3 dagar

---

SCENARIO 3 - Rate limiting (DEFER):
Kund skickar 100 mail till: gmail.com

Mail-server försöker leverera:
1. Första 10 mailen levereras OK
2. Gmail svarar: "Rate limit exceeded"
3. Mail-server DEFERAR resterande 90 mail
4. Försöker igen om 1 timme

Mail Queue visar:
→ "Deferred: Rate limit exceeded"
→ "Will retry in 60 minutes"
→ Status: Queued (DEFERRED)

RESULTAT:
• Mail är FÖDRÖJT
• Kommer att försöka igen senare
• När rate limit är borta → Mail levereras
• INTE rejectat eller borttappat ✅

---

💰 VERKLIGT PROBLEM - Kund förstår inte defer:

KUND: "Jag skickade viktigt mail igår, kom det fram?"

ADMIN kollar Mail Queue:
→ 5 mail i kön
→ Alla visar: "Deferred: Connection timeout"
→ Status: Queued

KUNDENS MISSTAG:
• Tror mail är borttappat ❌
• Tror mail är rejectat ❌
• Tror mail är returnerat ❌

RÄTT FÖRKLARING:
• Mail är FÖDRÖJT (deferred) ✅
• Servern försöker leverera automatiskt
• Om remote server kommer tillbaka → Mail levereras
• Om problemet kvarstår 3 dagar → Mail bounceas

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

b. "Classified it as spam":
→ Spam-klassificering är en ANNAN process
→ Spam-filter (Rspamd, SpamAssassin) klassificerar
→ Defer har INGET med spam att göra
→ Spam kan rejectas ELLER levereras med spam-header

c. "Rejected it":
→ Reject = Permanent avvisning
→ Mail tas INTE emot alls
→ Avsändare får omedelbart felmeddelande
→ Mail hamnar INTE i kön
→ Defer = Tillfälligt, mail hamnar i kön

d. "Returned it to the sender (bounced)":
→ Bounce = Returneras till avsändare
→ Händer efter att mail INTE kunde levereras
→ Efter flera försök (t.ex. 3 dagar)
→ Defer = Försöker igen, returnerar INTE ännu

✅ a. "Delayed it":
→ RÄTT! Defer = Fördröjning
→ Mail placeras i kön
→ Försöker igen senare
→ Detta är exakt vad defer betyder

---

🔍 TEKNISKA DETALJER:

DEFER PROCESS:

1. MAIL ANLÄNDER:
   → Mail-server tar emot mail
   → Försöker leverera direkt

2. TILLFÄLLIGT FEL:
   → Remote server nere
   → DNS-problem
   → Rate limiting
   → Nätverksproblem

3. DEFER:
   → Mail-server DEFERAR meddelandet
   → Placerar i kön
   → Sätter retry-tid (15 min, 30 min, 1 timme, etc.)

4. RETRY:
   → Försöker igen vid retry-tid
   → Om lyckas → Levereras
   → Om misslyckas → Defer igen

5. FINAL STATUS (efter 3 dagar):
   → Levererat: Mail skickat ✅
   → Bounced: Returnerat till avsändare ❌
   → Expired: Tagit bort från kön

---

📊 JÄMFÖRELSE - Defer vs Reject vs Bounce:

DEFER (Fördröjning):
• Tillfälligt problem
• Mail hamnar i kön
• Försöker igen automatiskt
• Status: Queued
• Exempel: "Deferred: Connection timeout"

REJECT (Avvisning):
• Permanent problem
• Mail tas INTE emot
• Ingen retry
• Status: Rejected
• Exempel: "550 Rejected: Invalid recipient"

BOUNCE (Returnering):
• Efter flera misslyckade försök
• Mail returneras till avsändare
• Status: Bounced
• Exempel: "550 Bounced: Mailbox full"

---

🎯 SAMMANFATTNING:

DEFER = FÖDRÖJNING:
✅ Mail är FÖDRÖJT (delayed)
✅ Placeras i kön
✅ Försöker igen automatiskt
✅ Tillfälligt problem

DEFER är INTE:
❌ Spam-klassificering
❌ Permanent rejection
❌ Bounce (returnering)

RÄTT SVAR: a. Delayed it.

Detta är grundläggande mail-server-terminologi! 🎯

Förståelse för defer hjälper dig förklara för kunder varför deras mail kan ta tid att levereras.`
},

  {
    id: 5,
    question: "Within which of the following WHM interfaces can you enable additional ports for Exim to listen for SMTP connections on?",
    answers: [
      "WHM Home » Service Configuration » Exim Ports Configuration",
      "WHM Home » Server Configuration » Tweak Settings",
      "WHM Home » Service Configuration » Exim Configuration Manager",
      "WHM Home » Service Configuration » Service Manager"
    ],
    correctAnswer: 2,
    explanation: "Exim Configuration Manager i WHM är det gränssnitt där du kan konfigurera Exim-inställningar, inklusive vilka portar Exim ska lyssna på för SMTP-anslutningar. Detta är den rätta platsen för att lägga till alternativa portar (som 587 för submission eller 465 för SMTPS) utöver standardport 25.",
    example: `VERKLIGT SCENARIO - Konfigurera Exim-portar för SMTP:

🏢 FÖRETAG: "NordicHost AB" - Webbhotell med 3,000 mail-konton
📊 PROBLEM: Kunder kan inte skicka mail via port 25 (blockerad av ISP)
🎯 LÖSNING: Aktivera alternativa SMTP-portar (587, 465) i Exim

---

🔧 EXIM PORTS CONFIGURATION:

STEG-FÖR-STEG:

1. Logga in på WHM (port 2087)
2. Navigera: WHM Home » Service Configuration » Exim Ports Configuration
3. Se aktuella portar som Exim lyssnar på
4. Lägg till nya portar (t.ex. 587, 465)
5. Spara ändringar
6. Exim startas om automatiskt

---

✅ VAD EXIM PORTS CONFIGURATION VISAR:

1. AKTUELLA PORTAR (RÄTT SVAR!):
   → Standard SMTP-port: 25
   → Submission-port: 587 (om aktiverad)
   → SMTPS-port: 465 (om aktiverad)
   → Anpassade portar

2. PORT-KONFIGURATION:
   → Lägg till nya portar
   → Ta bort portar
   → Konfigurera port-specifika inställningar

3. PORT-STATUS:
   → Vilka portar är aktiva?
   → Vilka portar är inaktiva?
   → Port-konflikter

---

📊 VERKLIGT EXEMPEL - 3 olika scenarios:

SCENARIO 1 - Aktivera port 587 (Submission):
KUND: "Jag kan inte skicka mail via port 25, min ISP blockerar den!"

ADMIN använder Exim Ports Configuration:
1. WHM Home » Service Configuration » Exim Ports Configuration
2. Lägger till port 587
3. Aktiverar "Submission port"
4. Sparar

Resultat:
✓ Exim lyssnar nu på port 587
✓ Kunder kan använda port 587 för SMTP
✓ Port 25 fungerar fortfarande
→ Problem löst! ✅

SCENARIO 2 - Aktivera port 465 (SMTPS):
KUND: "Jag behöver krypterad SMTP-anslutning!"

ADMIN använder Exim Ports Configuration:
1. WHM Home » Service Configuration » Exim Ports Configuration
2. Lägger till port 465
3. Aktiverar "SMTPS (SSL/TLS)"
4. Konfigurerar SSL-certifikat
5. Sparar

Resultat:
✓ Exim lyssnar nu på port 465 med SSL/TLS
✓ Kunder kan använda krypterad SMTP
✓ Säker mail-överföring
→ Problem löst! ✅

SCENARIO 3 - Anpassad port för intern mail:
ADMIN vill separera intern och extern mail

ADMIN använder Exim Ports Configuration:
1. WHM Home » Service Configuration » Exim Ports Configuration
2. Lägger till port 2525 (anpassad)
3. Konfigurerar port 2525 för intern mail
4. Port 25 för extern mail
5. Sparar

Resultat:
✓ Exim lyssnar på både port 25 och 2525
✓ Intern mail via port 2525
✓ Extern mail via port 25
→ Flexibel konfiguration! ✅

---

💰 VERKLIGT PROBLEM - ISP blockerar port 25:

KUND: "Jag kan inte skicka mail från min dator!"

ADMIN diagnostiserar:
• Kunden använder port 25
• ISP blockerar port 25 (vanligt i hemnätverk)
• Mail-servern accepterar bara port 25

ADMIN använder Exim Ports Configuration:
1. WHM Home » Service Configuration » Exim Ports Configuration
2. Lägger till port 587 (Submission)
3. Aktiverar port 587
4. Sparar

Resultat:
• Exim lyssnar nu på port 587
• Kunden uppdaterar sin mail-klient:
  - SMTP-server: mail.example.com
  - SMTP-port: 587
  - Encryption: STARTTLS
• Mail fungerar nu! ✅

UTAN Exim Ports Configuration:
• Admin skulle behöva:
  - SSH till servern
  - Redigera Exim-konfiguration manuellt
  - Starta om Exim manuellt
  - Mycket mer komplicerat

MED Exim Ports Configuration:
• Admin klickar "Exim Ports Configuration"
• Lägger till port 587
• Sparar
• Klart! ⚡

---

❌ VARFÖR ANDRA ALTERNATIV ÄR FEL:

b. "Tweak Settings":
→ Tweak Settings är för allmänna server-inställningar
→ Inkluderar INTE Exim-port-konfiguration
→ Fokuserar på PHP, Apache, MySQL, etc.
→ INTE specifikt för Exim-portar

c. "Exim Configuration Manager":
→ Exim Configuration Manager är för Exim-konfigurationsfiler
→ Hanterar Exim-inställningar (t.ex. relay-domains, etc.)
→ Inkluderar INTE port-konfiguration
→ Fokuserar på mail-routing och policies

d. "Service Manager":
→ Service Manager är för att starta/stoppa tjänster
→ Hanterar service-status (Exim, Apache, MySQL, etc.)
→ Inkluderar INTE port-konfiguration
→ Fokuserar på service-hantering, inte port-konfiguration

✅ a. "Exim Ports Configuration":
→ RÄTT! Detta är EXAKT vad Exim Ports Configuration gör
→ Dedikerat gränssnitt för Exim-port-konfiguration
→ Det är huvudfunktionen för att hantera Exim-portar

---

🔍 TEKNISKA DETALJER:

EXIM PORTS CONFIGURATION:

1. STANDARD PORTAR:
   • Port 25: Standard SMTP (alltid aktiverad)
   • Port 587: Submission (för mail-klienter)
   • Port 465: SMTPS (SSL/TLS SMTP)

2. ANPASSADE PORTAR:
   • Lägg till valfri port (t.ex. 2525, 8025, etc.)
   • Konfigurera port-specifika inställningar
   • Port-baserad access control

3. PORT-KONFIGURATION:
   • Aktivera/inaktivera portar
   • Konfigurera SSL/TLS per port
   • Port-baserade policies

---

📊 JÄMFÖRELSE - Alla WHM-gränssnitt:

1. EXIM PORTS CONFIGURATION (RÄTT SVAR!):
   → Konfigurera Exim-portar
   → Lägg till/ta bort portar
   → Port-specifika inställningar

2. EXIM CONFIGURATION MANAGER:
   → Exim-konfigurationsfiler
   → Mail-routing
   → Policies

3. SERVICE MANAGER:
   → Starta/stoppa tjänster
   → Service-status
   → Service-hantering

4. TWEAK SETTINGS:
   → Allmänna server-inställningar
   → PHP, Apache, MySQL
   → Server-wide settings

---

🎯 SAMMANFATTNING:

WHM Exim Ports Configuration kan:
✅ Konfigurera Exim-portar (RÄTT SVAR!)
✅ Lägg till alternativa SMTP-portar (587, 465, etc.)
✅ Aktivera/inaktivera portar
✅ Port-specifika inställningar

Exim Ports Configuration kan INTE:
❌ Hantera Exim-konfigurationsfiler (använd Exim Configuration Manager)
❌ Starta/stoppa Exim (använd Service Manager)
❌ Ändra allmänna server-inställningar (använd Tweak Settings)

RÄTT SVAR: a. WHM Home » Service Configuration » Exim Ports Configuration

Detta är det ENDA gränssnittet specifikt för Exim-port-konfiguration! 🎯

Det hjälper dig enkelt konfigurera alternativa SMTP-portar när standardport 25 är blockerad eller när kunder behöver specifika portar för sin mail-klient.`
  },

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
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10 mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 text-center">Detaljerad Rapport 📊</h2>
              <p className="text-2xl text-purple-200 mb-2 text-center">
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
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
                  href="/mail-server"
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
                  <div key={qIndex} className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-purple-500/5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCorrect ? 'bg-green-500' : 'bg-pink-500'}`}>
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
                              ? 'bg-pink-500/15 border-2 border-red-400/50 shadow-pink-500/20'
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

                    <div className="ml-14 mt-4 p-4 bg-purple-500/10 backdrop-blur-xl rounded-2xl border border-purple-400/20 shadow-lg shadow-purple-500/10">
                      <p className="text-sm font-bold text-orange-300 mb-2">Förklaring:</p>
                      <p className="text-sm text-purple-200">{q.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer knappar */}
            <div className="mt-8 text-center">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-purple-500/5">
                <p className="text-white text-lg mb-4">
                  Slutresultat: {score} av {questions.length} rätt ({Math.round((score / questions.length) * 100)}%)
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Gör om quiz
                  </button>
                  <Link
                    href="/mail-server"
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
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz slutförd! 🎉</h2>
            <p className="text-2xl text-purple-200 mb-8">
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
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
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
                href="/mail-server"
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">cP</span>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              cPanel University
            </h1>
          </Link>
          <div className="text-purple-200 font-semibold">
            Fråga {currentQuestion + 1} av {questions.length}
          </div>
        </div>
      </header>

      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10">
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
                        ${!answered && 'hover:scale-102 hover:shadow-2xl hover:shadow-purple-500/20'}
                        ${selectedAnswer === index && index === question.correctAnswer
                          ? 'bg-green-500/20 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/20'
                          : selectedAnswer === index && index !== question.correctAnswer
                          ? 'bg-pink-500/20 border-2 border-red-400/50 text-white shadow-lg shadow-pink-500/20'
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
                <div className="inline-block bg-white/5 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/10 shadow-lg shadow-purple-500/10">
                  <span className="text-purple-200 text-lg font-semibold">
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
                      : 'bg-pink-500/15 border-red-400/50 shadow-pink-500/20'
                    }
                  `}>
                    <div className="text-4xl mb-2">
                      {selectedAnswer === question.correctAnswer ? '✅' : '❌'}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedAnswer === question.correctAnswer ? 'Rätt svar!' : 'Fel svar'}
                    </div>
                  </div>

                  <div className="bg-purple-500/10 backdrop-blur-3xl rounded-3xl p-8 border border-purple-400/20 shadow-xl shadow-purple-500/10">
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

                  <div className="rounded-3xl p-8 max-h-[520px] overflow-y-auto border-2 border-purple-500/50 shadow-xl bg-purple-900">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center pb-4 border-b-2 border-purple-400/30">
                      <svg className="w-6 h-6 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-bold text-white text-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? 'Nästa fråga →' : 'Se resultat 🎯'}
                  </button>
                </div>
              )}

              {!showExplanation && (
                <div className="bg-white/3 backdrop-blur-3xl rounded-3xl p-12 border border-white/10 shadow-2xl shadow-purple-500/10 flex items-center justify-center min-h-[400px]">
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

