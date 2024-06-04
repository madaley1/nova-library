. ./.env
docker compose down && \
docker compose up -d && \
until nc -z -v -w30 $MYSQL_HOST $MYSQL_EXTERNAL_PORT && docker exec db bash -c "mysql --database=$MYSQL_DATABASE --user=$MYSQL_USER --password=$MYSQL_PASSWORD"
do
  echo "Waiting for database connection..."
  # wait for 1 seconds before check again
  sleep 1
done &&\
docker exec db bash -c "cat /mnt/db/sql/templates.sql | mysql \
  --host=$MYSQL_HOST \
  --port=$MYSQL_INTERNAL_PORT \
  --protocol=tcp \
  --user=root \
  --password=$MYSQL_ROOT_PASSWORD \
  --database=$MYSQL_DATABASE" && \

docker exec db bash -c "mysql \
  --host=$MYSQL_HOST \
  --port=$MYSQL_INTERNAL_PORT \
  --protocol=tcp \
  --user=root \
  --password=$MYSQL_ROOT_PASSWORD \
  --database=$MYSQL_DATABASE \
  -e 'GRANT ALL PRIVILEGES ON testDB.* TO '"'"'$MYSQL_USER'"'"';'"