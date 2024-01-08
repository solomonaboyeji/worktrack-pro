
build-local:
	docker build -t tasks-mgt . --no-cache

kill-local:
	docker compose -p payment-service -f docker/local/docker-compose.yml down -v --remove-orphans
