.PHONY: docker

version ?= `git rev-parse --short HEAD`
imageUrl ?= europe-west9-docker.pkg.dev/prendresoin-479613/prendresoin/api
prendreSoinBaseURL ?= https://prendresoin.francetravail.fr

ENV ?= qvr

ifeq "$(ENV)" "qvr"
cloudRunName = prendresoin-qvr
location = europe-west1
zone = europe-west9
langfuseUrl = https://langfuse-y72kzcp7ka-od.a.run.app
langfusePk = pk-lf-cfdd5ae4-d8f2-4647-af41-ca58eb45f93c
secretsPrefix = PRENDRESOIN_QVR_
postHogHost=https://eu.i.posthog.com
endif

ifeq "$(ENV)" "prod"
cloudRunName = prendresoin-prod
location = europe-west1
zone = europe-west9
langfuseUrl = https://langfuse-y72kzcp7ka-od.a.run.app
langfusePk = pk-lf-8992b6e6-80ee-477b-a731-77d949e351c7
secretsPrefix = PRENDRESOIN_PROD_
postHogHost=https://eu.i.posthog.com
endif


docker-build:
	docker build --platform=linux/amd64 --target prod -t ${imageUrl}:${version} -f apps/api/Dockerfile .

docker-push: docker-check
	docker push ${imageUrl}:${version}

docker-check: docker-build
	@echo "Starting docker container and checking for successful startup..."
	@CONTAINER_ID=$$(docker run -d -p "3003:3000" ${imageUrl}:${version}); \
	echo "Container ID: $$CONTAINER_ID"; \
	i=1; \
	while [ $$i -le 30 ]; do \
		echo "Checking logs (attempt $$i/30)..."; \
		LOGS=$$(docker logs $$CONTAINER_ID 2>&1); \
		echo "$$LOGS"; \
		if echo "$$LOGS" | grep -q "Starting Nest application..."; then \
			echo "✓ Docker container started successfully"; \
			docker kill $$CONTAINER_ID >/dev/null 2>&1; \
			exit 0; \
		fi; \
		sleep 1; \
		i=$$((i + 1)); \
	done; \
	echo "✗ Failed to find 'Starting Nest application...' in docker logs"; \
	docker kill $$CONTAINER_ID >/dev/null 2>&1; \
	exit 1


deploy: docker-push
	gcloud config set project prendresoin-479613
	gcloud run deploy ${cloudRunName} --image ${imageUrl}:${version} \
	--update-secrets=LANGFUSE_SK=${secretsPrefix}LANGFUSE_SK:latest \
	--set-env-vars=PRENDRE_SOIN_BASE_URL=${prendreSoinBaseURL} \
	--set-env-vars=TZ=UTC \
    --set-env-vars=LANGFUSE_PK=${langfusePk},LANGFUSE_BASE_URL=${langfuseUrl},LOCATION=$(location) \
	--region=${zone} \
	--port=3000 \
	--min-instances=1 \
	--max-instances=1 \
	--service-account=prendresoin-api@prendresoin-479613.iam.gserviceaccount.com


