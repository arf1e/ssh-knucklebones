generate-ssh-keypair:
	# generates unencrypted keypair
	[ ! -f ./ssh/host-key ] && ssh-keygen -t rsa -f ./ssh/host-key -N "" || echo "host key already exists"

run: generate-ssh-keypair
	docker compose up --build --force-recreate -d

production:
	docker compose down
	cp ~/knucklebones-ssh-keys -r ./ssh
	docker compose up --build -d

test:
	npm run test

develop-html:
	npx live-server --port=1337 --no-browser
