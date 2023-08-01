#!/bin/bash
# build script

padocInstall=false
pdfInstall=false

# check dependencies

if ! command -v pandoc &> /dev/null
then
    padocInstall=true
    echo "Pandoc not found."
fi

if ! command -v wkhtmltopdf &> /dev/null
then
    pdfInstall=true
    echo "wkhtmltopdf not found."
fi

# Install dependencies

if [ $padocInstall = true ] ; then
    echo "Installing pandoc..."
    sudo apt-get install pandoc -y
fi


if [ $pdfInstall = true ] ; then
    echo "Installing wkhtmltopdf..."
    sudo apt-get install wkhtmltopdf -y
fi

mkdir output
pandoc --self-contained --toc --metadata pagetitle=".NET Cheet sheet" --template template/template.html -c template/mvp.css -c template/style.css -i cheatsheet.md -o output/build.html
wkhtmltopdf --page-size A4 --image-quality 99 -B 10 -L 10 -R 10 -T 10 output/build.html output/build.pdf