bookgen md2html --svg --title "Ultimate .NET Cheat sheet" -i .\cheatsheet.md --no-css -tf .\template.html -o docs\index.html
tidy -i -m -ashtml docs\index.html