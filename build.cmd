mkdir output
pandoc --self-contained --toc --metadata pagetitle=".NET Cheet sheet" --template template/template.html -c template/mvp.css -c template/style.css -i cheatsheet.md -o output/build.html
wkhtmltopdf --background --page-size A4 --image-quality 99 -B 10 -L 10 -R 10 -T 10 output/build.html output/build.pdf