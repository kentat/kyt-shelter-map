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
heroku run python manage.py createsuperuser
heroku run python manage.py makemigrations
heroku run python manage.py migrate

git rm -r -f log
git rm -r -f tmp
git rm -f *.sqlite3