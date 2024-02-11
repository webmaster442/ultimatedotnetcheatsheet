$f1 = Get-Content -Path .\cheatsheet.md
$f2 = Get-Content -Path .\footer.html
$merged = $f1 + $f2
$merged | Out-File -FilePath .\torender.md
bookgen md2html --svg --title "Ultimate .NET Cheat sheet" -i .\torender.md --css style.css -o gh-pages\index.html
Remove-Item -Path .\torender.md
tidy -m gh-pages\index.html