# Edycja galerii

Każde wydarzenie jest osobnym folderem ze zdjęciami w katalogu `ASSETS`. Nazwa folderu powinna zawierać datę, na przykład `2027.06.12 - Halka - Opole`.

Opisy wydarzeń ustawia się w `gallery.config.json`. Skrypt `npm run gallery:sync` sam dopisuje tam brakujące domyślne wpisy, które można później edytować:

- `folder` — dokładna nazwa folderu w `ASSETS`,
- `title`, `date`, `location`, `description`, `credit` — treść widoczna na stronie,
- `selected` — numery zdjęć, które mają wejść do galerii,
- `pinned: true` — przypina wydarzenie do trzech wpisów pokazywanych na stronie głównej.

Jeśli żadne wydarzenie nie jest przypięte, strona główna automatycznie pokazuje trzy najnowsze. Pełna galeria grupuje wszystkie wydarzenia według roku i obsługuje dowolną liczbę realizacji w każdym roku.

Galeria odświeża się automatycznie przy uruchomieniu lub budowaniu strony. Można też uruchomić `npm run gallery:sync`.
