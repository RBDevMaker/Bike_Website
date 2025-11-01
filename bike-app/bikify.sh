#!/bin/bash
source_files_path="/var/tmp"
app_path="/Users/rachellebriscoe/environment/microservices/bike-app"

mkdir $app_path/src/components

cp $source_files_path/App.css $app_path/src/
cp $source_files_path/App.jsx $app_path/src/
cp $source_files_path/index.css $app_path/src/
cp $source_files_path/main.jsx $app_path/src/

cp $source_files_path/Products.jsx $app_path/src/components/
cp $source_files_path/Services.jsx $app_path/src/components/
cp $source_files_path/Sidebar.jsx $app_path/src/components/

unzip ~/environment/microservices/bike-app/bicycle-images.zip -d $app_path/src/assets/
cp $source_files_path/favicon.ico $app_path/public/
cp $source_files_path/index.html $app_path/