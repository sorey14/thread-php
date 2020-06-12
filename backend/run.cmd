docker-compose up -d
docker exec -it thread-app php artisan migrate
docker exec -it thread-app php artisan db:seed
cd c:\Users\Andrey\thread-php\frontend\
yarn run serve