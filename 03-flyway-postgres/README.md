# 03-flyway-postgres

### Start Postgres in docker
```shell
docker run -p 5432:5432 --name test-golang -e POSTGRES_PASSWORD=password -d postgres
```