# Guideline tworzenia showcase

## Cel
Showcase ma pomagać ludziom szybko zrozumieć komponent i od razu go użyć. Markdown dla LLM ma być krótszą wersją tego samego materiału: tylko rzeczy ważne, praktyczne i prawdziwe dla komponentu.

## Główne zasady
- Projektuj showcase od zera pod aktualny komponent. Nie kopiuj bezrefleksyjnie starych showcase'y.
- Pokazuj realne scenariusze użycia, nie tylko warianty wizualne.
- Każda sekcja ma odpowiadać na pytanie: "kiedy tego użyć?" albo "jak tego użyć poprawnie?".
- Unikaj sztucznych zapychaczy, tekstów marketingowych i oczywistości.
- Jeśli coś nie jest naprawdę wspierane przez komponent, nie sugeruj tego w showcase ani w markdown.

## Co powinien zawierać showcase
- Krótki opis komponentu: po co istnieje i w jakich sytuacjach jest używany.
- Import.
- Zestaw sekcji feature pokazujących najważniejsze możliwości.
- Sekcję accessibility tylko dla tych tematów, które rzeczywiście mają zastosowanie.
- API reference oparte na realnych inputach, outputach, modelach, metodach i typach pomocniczych.

## Jak dobierać sekcje feature
- Zacznij od podstawowego scenariusza użycia.
- Dodaj sekcje dla najważniejszych wariantów zachowania, nie tylko wyglądu.
- Dodaj co najmniej jeden przykład bardziej złożony, łączący kilka komponentów albo pokazujący gotowy fragment UI do użycia przez użytkownika końcowego.
- Jeśli komponent ma tryby, stany, integrację z serwisem, formularzem, templatem albo content projection, pokaż to.
- Jeśli jakaś możliwość jest niszowa albo mało wartościowa, nie musi mieć osobnej sekcji.

## Jak pisać opisy sekcji
- Jedno krótkie wprowadzenie: co pokazuje sekcja i po co to istnieje.
- Opis ma być praktyczny, nie encyklopedyczny.
- Pisz o decyzji projektowej i skutku dla użytkownika.
- Nie opisuj kodu linia po linii.

## Snippety i przykłady
- Każdy snippet zapisuj jako osobny plik `*-demo.ts`.
- Snippet ma być czytelny bez dodatkowego tłumaczenia.
- Preferuj przykłady kompletne, ale krótkie.
- Jeśli przykład potrzebuje prostego layoutu, używaj inline `style=""`.
- Zachowuj spójność z minimalizmem Fluent UI 2: spokojny layout, oszczędne odstępy, brak dekoracyjnego chaosu.
- Nie buduj przykładu wyłącznie po to, żeby pokazać wszystkie inputy naraz.

## Przykłady zaawansowane
- Dodawaj przykłady gotowych patternów, nie tylko isolated demo.
- Dobre kierunki:
  - akcje w toolbarze lub headerze,
  - status + akcja + feedback,
  - integracja z formularzem,
  - komponent sterowany serwisem,
  - kompozycja z content projection lub template.
- Zaawansowany przykład nadal ma być mały i łatwy do skopiowania.

## Accessibility
- Uwzględniaj tylko sekcje, które są prawdziwe dla danego komponentu.
- Typowe sekcje to:
  - accessible name,
  - keyboard,
  - ARIA,
  - role / live region,
  - focus management.
- Jeśli komponent nie ma sensownej historii dla którejś z tych sekcji, pomiń ją.
- Nie wpisuj ogólnych porad accessibility, które nie wynikają z implementacji komponentu.

## LLM markdown
- Ma zawierać tylko najważniejsze informacje potrzebne do użycia komponentu.
- Zachowaj:
  - krótki intro,
  - import,
  - najważniejsze sekcje feature,
  - sensowne uwagi accessibility.
- Nie przenoś tam pełnego API reference.
- Nie duplikuj treści, które nic nie wnoszą poza tym, co już widać w snippetach.

## Źródło danych
- Traktuj `*.showcase.meta.json` jako źródło prawdy dla treści showcase i markdown.
- Snippety są osobnymi assetami i powinny odpowiadać sekcjom z meta.
- Adapter Angulara powinien tylko mapować `componentKey` na realne komponenty i ścieżki assetów.

## Checklist przed dodaniem nowego showcase
- Czy opis komponentu mówi po co go użyć?
- Czy sekcje pokazują najważniejsze scenariusze, a nie tylko warianty wizualne?
- Czy jest przynajmniej jeden przykład bardziej złożony i gotowy do użycia?
- Czy accessibility obejmuje tylko realnie aplikowalne zagadnienia?
- Czy markdown dla LLM jest krótszy i bez zbędnego API?
- Czy snippety są spójne, krótkie i używają `style=""` tam, gdzie prosty layout tego wymaga?
- Czy całość wygląda jak Fluent UI 2: prosto, spokojnie i bez przeładowania?
