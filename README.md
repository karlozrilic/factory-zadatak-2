## Upute za postavljanje projekta
1. potrebno je "forkati" repozitorij https://git.plavatvornica.com/factory-public/hotel-zadatak
2. skinuti svoju (_forkanu verziju_) repozitorija na svoje računalo
3. navigirati se sa _**CMD-om**_ ili _**Git Bash terminalom**_ unutar kloniranog folder (_tamo gdje se nalazi fajl `composer.lock_)
4. pokrenuti komandu `composer install` (_preduvjet je da imate instaliran PHP i composer_)
5. za pokretanje servera potrebno je unutar tog istog servera pokrenuti naredbu `php -S localhost:8080 -t public/`
6. otvoriti link u browseru http://localhost:8080
