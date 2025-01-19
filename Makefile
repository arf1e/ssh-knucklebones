generate-ssh-keypair:
	[ ! -f ./ssh/host-key ] && ssh-keygen -t rsa -f ./ssh/host-key -N "" || echo "host key already exists"

run: generate-ssh-keypair
	docker compose up --build --force-recreate -d

production:
	cp ~/knucklebones-ssh-keys -r ./ssh
	docker compose up --build --force-recreate -d

test:
	npm run test
