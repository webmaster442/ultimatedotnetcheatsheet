Remove-Item -r .\docs
Copy-Item template .\docs -Recurse
Remove-Item .\docs\template.html
bookgen script build.script