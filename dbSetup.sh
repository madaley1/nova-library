echo MYSQL_USER
mysqld
mysql --user=$MYSQL_USER --password=$MYSQL_PASSWORD --database=$MYSQL_DATABASE -e 'CREATE TABLE libraries (library VARCHAR(256) NOT NULL UNIQUE);'