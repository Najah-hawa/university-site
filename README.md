# University Site
Detta projekt handlar om att skapa  en enkel Angular-applikation för att hantera kurser för en universitet. Syftet med projektet är att träna på grundläggande kunskaper inom Angular-utveckling, och ha bättre kunskaper i :
- Användning av Angular CLI
- Routing mellan flera sidor
- Databindning
- Användning av komponenter
- CSS-styling
- Publicering via GitHub Pages

## Sidorna i projketet
Projektet innehåller två sidor:
- En sida för att söka efter kurser
- En sida för att visa ett schema (ramschema)

## krav för kurser sidan 
- kunna sortera data på kurskod, kursnamn, poäng, ämne.
- filtrera data på kurskod och kursnamn.
- välja ut kurser från ämne - exempelvis; bara visa kurser som tillhör ämnet "Datateknik".
- lägga till kurser till eget ramschema. 
- se antal kurser i aktuell sökning, exempelvis alla kurser, eller antal kurser i valt urval. 

## krav för ramscchema sidan 
- se valda kurser till ramschemat (dessa ska lagras i localStorage).
- se antal sammanlagda högskolepoäng för de valda kurserna. 
- plocka bort kurser från ramschemat.

## Viktig information

Projektet syftar till **grundläggande betyg**. Därför har **inga extra funktioner eller avancerade implementationer** lagts till. Fokus har varit på att visa förståelse för Angulars grundläggande struktur och funktionalitet.

## Installation

För att köra projektet lokalt:

```bash
git clone https://github.com/ditt-anvandarnamn/university-site.git
cd university-site
npm install
ng serve
