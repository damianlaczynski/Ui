# Guideline tworzenia showcase

## Cel
Showcase ma pomagac ludziom szybko zrozumiec komponent i od razu go uzyc. Markdown dla LLM ma byc krotsza wersja tego samego materialu: tylko rzeczy wazne, praktyczne i prawdziwe dla komponentu.

## Glowne zasady
- Projektuj showcase od zera pod aktualny komponent. Nie kopiuj bezrefleksyjnie starych showcase'y.
- Pokazuj realne scenariusze uzycia, nie tylko warianty wizualne.
- Kazda sekcja ma odpowiadac na pytanie: "kiedy tego uzyc?" albo "jak tego uzyc poprawnie?".
- Unikaj sztucznych zapychaczy, tekstow marketingowych i oczywistosci.
- Jesli cos nie jest naprawde wspierane przez komponent, nie sugeruj tego w showcase ani w markdown.

## Co powinien zawierac showcase
- Krotki opis komponentu: po co istnieje i w jakich sytuacjach jest uzywany.
- Import.
- Zestaw sekcji feature pokazujacych najwazniejsze mozliwosci.
- Sekcje accessibility tylko dla tych tematow, ktore rzeczywiscie maja zastosowanie.
- API reference oparte na realnych inputach, outputach, modelach, metodach i typach pomocniczych.

## Jak dobierac sekcje feature
- Zacznij od podstawowego scenariusza uzycia.
- Dodaj sekcje dla najwazniejszych wariantow zachowania, nie tylko wygladu.
- Dodaj co najmniej jeden przyklad bardziej zlozony, laczacy kilka komponentow albo pokazujacy gotowy fragment UI do uzycia przez uzytkownika koncowego.
- Jesli komponent ma tryby, stany, integracje z serwisem, formularzem, templatem albo content projection, pokaz to.
- Jesli jakas mozliwosc jest niszowa albo malo wartosciowa, nie musi miec osobnej sekcji.

## Jak pisac opisy sekcji
- Jedno krotkie wprowadzenie: co pokazuje sekcja i po co to istnieje.
- Opis ma byc praktyczny, nie encyklopedyczny.
- Pisz o decyzji projektowej i skutku dla uzytkownika.
- Nie opisuj kodu linia po linii.

## Snippety i przyklady
- Kazdy snippet zapisuj jako osobny plik `*-demo.ts`.
- Snippet ma byc czytelny bez dodatkowego tlumaczenia.
- Preferuj przyklady kompletne, ale krotkie.
- Jesli przyklad potrzebuje prostego layoutu, uzywaj inline `style=""`.
- Zachowuj spojnnosc z minimalizmem Fluent UI 2: spokojny layout, oszczedne odstepy, brak dekoracyjnego chaosu.
- Nie buduj przykladu wylacznie po to, zeby pokazac wszystkie inputy naraz.
- Jesli snippet ma dodatkowe opcje pomocnicze, np. `Reset`, `Clear`, podglad wartosci, ostatnia akcje albo status, umieszczaj je w lekkiej inline karcie.
- Taka karta powinna miec dashed border, neutralne tlo oraz uklad oparty o `display:flex`, sensowny `gap` i `align-items:center`.
- `flex-wrap:wrap` traktuj jako fallback dla mniejszych szerokosci. Na szerszym ukladzie taki panel powinien czytac sie jak jeden spokojny inline row.

## Przyklady zaawansowane
- Dodawaj przyklady gotowych patternow, nie tylko isolated demo.
- Dobre kierunki:
  - akcje w toolbarze lub headerze,
  - status + akcja + feedback,
  - integracja z formularzem,
  - komponent sterowany serwisem,
  - kompozycja z content projection lub template.
- Zaawansowany przyklad nadal ma byc maly i latwy do skopiowania.

## Accessibility
- Uwzgledniaj tylko sekcje, ktore sa prawdziwe dla danego komponentu.
- Typowe sekcje to:
  - accessible name,
  - keyboard,
  - ARIA,
  - role / live region,
  - focus management.
- Jesli komponent nie ma sensownej historii dla ktorejs z tych sekcji, pomin ja.
- Nie wpisuj ogolnych porad accessibility, ktore nie wynikaja z implementacji komponentu.
- Traktuj `button` jako wzorzec jakosci sekcji accessibility: krotkie, konkretne bloki i czytelny podzial tematow.
- Jesli komponent ma realny model klawiatury albo mapowanie stanow na atrybuty ARIA, pokaz to w tabeli zamiast w dlugim akapicie.
- Dobre tabele w accessibility to najczesciej:
  - `Key | Action`,
  - `State | Attribute`,
  - `Mode / input | Exposed semantics`.
- Nie dodawaj tabel na sile. Jesli komponent jest czysto dekoracyjny albo nieinteraktywny, wystarczy krotkie wyjasnienie dlaczego nie ma sekcji keyboard.
- Sekcja accessibility ma byc bardziej uzyteczna niz kompletna. Pokaz to, co pomaga poprawnie wdrozyc komponent, a nie ogolna teorie o WCAG.

## LLM markdown
- Ma zawierac tylko najwazniejsze informacje potrzebne do uzycia komponentu.
- Zachowaj:
  - krotki intro,
  - import,
  - najwazniejsze sekcje feature,
  - sensowne uwagi accessibility.
- Nie przenos tam pelnego API reference.
- Nie duplikuj tresci, ktore nic nie wnosza poza tym, co juz widac w snippetach.

## Zrodlo danych
- Traktuj `*.showcase.meta.json` jako zrodlo prawdy dla tresci showcase i markdown.
- Snippety sa osobnymi assetami i powinny odpowiadac sekcjom z meta.
- Adapter Angulara powinien tylko mapowac `componentKey` na realne komponenty i sciezki assetow.

## Checklist przed dodaniem nowego showcase
- Czy opis komponentu mowi po co go uzyc?
- Czy sekcje pokazuja najwazniejsze scenariusze, a nie tylko warianty wizualne?
- Czy jest przynajmniej jeden przyklad bardziej zlozony i gotowy do uzycia?
- Czy accessibility obejmuje tylko realnie aplikowalne zagadnienia?
- Czy markdown dla LLM jest krotszy i bez zbednego API?
- Czy snippety sa spojne, krotkie i uzywaja `style=""` tam, gdzie prosty layout tego wymaga?
- Czy pomocnicze akcje i podglad stanu siedza w lekkiej inline karcie z dashed border?
- Czy calosc wyglada jak Fluent UI 2: prosto, spokojnie i bez przeladowania?