bookgen build -a BuildWeb
Set-Location docs
Remove-Item search.html
Set-Location ..
bookgen md2html