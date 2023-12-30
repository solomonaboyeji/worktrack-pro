
# ****************** DIRECT DEVELOPMENT ****************** #

start-hypercorn:
	hypercorn src.main:app --reload --bind 0.0.0.0:8100

start-dev-postgres:
	make down-dev-postgres
	docker-compose -f ./docker/local/compose-files/docker-compose-postgres.yml up

down-dev-postgres:
	docker-compose -f ./docker/local/compose-files/docker-compose-postgres.yml down

# ****************** END DIRECT DEVELOPMENT ****************** #

# -- 
# -- 
# -- 

# ****************** ALEMBIC ****************** #

run-db-upgrade:
	docker compose -f docker/local/docker-compose.yml run -v ./:/usr/src/timesheets-mgt-api  --rm timesheets-mgt-api alembic upgrade head


run-alembic-revision:
	docker compose -f docker/local/docker-compose.yml run -v ./:/usr/src/timesheets-mgt-api  --rm timesheets-mgt-api  alembic revision --autogenerate

# ****************** END ALEMBIC ****************** #



# -- 
# -- 
# -- 


# ****************** TESTS ****************** #

build-local:
	docker compose -f docker/local/docker-compose.yml build 

kill-local:
	docker compose -f docker/local/docker-compose.yml down -v --remove-orphans

run-local-migrations:
	docker compose -f docker/local/docker-compose.yml run -v ./:/usr/src/timesheets-mgt-api  --rm timesheets-mgt-api  alembic upgrade head

make init-platform:
	docker compose -f docker/local/docker-compose.yml run -v ./:/usr/src/timesheets-mgt-api --rm timesheets-mgt-api python ./src/init_platform.py

run:
	make run-local-migrations

	make make init-platform

	docker compose -f docker/local/docker-compose.yml up  --remove-orphans  -d

run-prod:
	docker build -f Dockerfile.prod -t regnify-api .
	docker run -p 8100:8000 regnify-api

restart:
	docker compose -f docker/local/docker-compose.yml down timesheets-mgt-api
	make run


follow-logs:
	docker compose -f docker/local/docker-compose.yml logs timesheets-mgt-api -f


# ****************** END TESTS ****************** #

# -- 
# -- 
# -- 

# ****************** TESTS ****************** #

build-test:
	docker compose -f docker/test/docker-compose-test.yml build 

kill-test: kill-local
	docker compose -f docker/test/docker-compose-test.yml down

run-test-migrations:
	docker compose -f docker/test/docker-compose-test.yml run -v ./:/usr/src/timesheets-mgt-api  --rm timesheets-mgt-api alembic upgrade head

run-tests:
	make kill-test

	make run-test-migrations

	# * run the tests
	docker compose -f docker/test/docker-compose-test.yml run -v ./:/usr/src/timesheets-mgt-api  --rm timesheets-mgt-api python -m pytest --cov-report term-missing --cov=src/

	make kill-test

# * ------ User Module ------ * #

# Runs all tests under the user modules

# * ------ End File Modules ------ * #

# ****************** END TESTS ****************** #

# -- 
# -- 
# -- 

# ****************** MISC ****************** #

create-network:
	docker network create timesheets-mgt-network

# ****************** END MISC ****************** #
