@echo off
echo web: gunicorn myprj.wsgi --log-file - > Procfile
rem https://devcenter.heroku.com/articles/python-support#supported-runtimes
echo python-3.9.7 > runtime.txt
pip install django-heroku
pip install gunicorn
pip freeze > requirements.txt
git init
git add .
git commit -m "first commit"
heroku login
heroku create kyt-shelter-map
heroku config:set DISABLE_COLLECTSTATIC=1
git push heroku master