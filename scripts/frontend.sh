#!/bin/sh

echo "###########################################"
echo "#                                         #"
echo "#       GITLAB DEPLOYMENT SCRIPT          #"
echo "#        Author: Sandeep Kaur             #"
echo "#                                         #"
echo "###########################################"

echo ""
echo ""

echo "/------Get updated code from Gitlab------/"
echo "$ git pull";
cd /path/of/directory/ && git pull
echo ""
echo ""

echo "/------Go to Backend and Initialize enviornment------/"
echo "$ source env/bin/activate"
cd /path/of/directory/backend/ && source env/bin/activate


echo "/------Collect static files------/"
echo "$ collectstatic"
cd /path/of/directory/backend/ &&  DATABASE_HOST=localhost DATABASE_ENGINE=django.db.backends.mysql DATABASE_NAME=test_db DATABASE_USER=root DATABASE_PASS=anypassword DEBUG=False python manage.py collectstatic --no-input

echo ""
echo ""

echo "/------deactivate enviornment------/"
echo "$ deactivate"
deactivate

echo "/------Rebuild Webpack------/"
echo "$ webpack"
cd /path/of/directory/static && webpack
echo ""
echo ""

echo "###########################################"
echo "###########################################"

