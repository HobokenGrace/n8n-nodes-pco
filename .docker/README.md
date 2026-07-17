# Local n8n Docker Development

This folder contains the local n8n Docker setup for testing `@hobokengrace/n8n-nodes-pco`.

## Files

- `docker-compose.yml` runs the official n8n image, mounts this repository read-only at `/workspace`, packs the package with `npm pack`, and installs that tarball into n8n's custom extensions folder on startup.
- `.env.example` documents local n8n settings.
- `.gitignore` keeps local secrets and npm install output inside `.docker/` but out of git.
- `custom/package.json` is the npm workspace n8n uses for custom community nodes.
- `n8n-data` is a Docker named volume that stores local n8n SQLite data, credentials, and settings without requiring Docker to `chown` a host bind mount.

## Start n8n

From the repository root:

```sh
pnpm install
pnpm build
cp .docker/.env.example .docker/.env
cd .docker
docker compose up
```

If you change `N8N_ENCRYPTION_KEY`, keep it alphanumeric or single-quote any value containing `$`. Docker Compose treats `$name` as variable interpolation in `.env` files.

`docker compose up` runs n8n in the foreground, so it is expected to keep running after `Initializing n8n process`. In another terminal, verify readiness with:

```sh
cd .docker
docker compose ps
```

The `n8n` service should show as `healthy`, then open `http://localhost:5678`.

Open n8n at `http://localhost:5678`.

## Update n8n

```sh
cd .docker
docker compose pull # pulls the latest n8n image
docker compose up -d --remove-orphans # restarts n8n in detached mode
docker image prune # removes old n8n images
```

## Test the Nodes

1. Create or sign in to the local n8n owner account.
2. Go to `Credentials`.
3. Add `Planning Center PAT API`.
4. Enter your Planning Center Application ID and Secret.
5. Test the credential.
6. Create a workflow and search for `Planning Center People`, `Planning Center Groups`, or `Planning Center Giving`.
7. Add an operation, execute the node, and inspect the output.

## After Code Changes

Rebuild the package and restart n8n so it reloads the compiled `dist/` files:

```sh
pnpm build
cd .docker
docker compose restart n8n
```

If npm does not pick up package metadata changes, recreate the container:

```sh
cd .docker
docker compose down
docker compose up
```

## Reset Local n8n State

This removes local workflows, credentials, executions, and settings:

```sh
cd .docker
docker compose down -v
rm -rf custom/node_modules custom/package-lock.json
```

## Notes

- Keep `.docker/.env` local. It may contain an encryption key and optional basic-auth values.
- The compose file persists n8n data in the `n8n-data` Docker volume, mounted to n8n's documented `/home/node/.n8n` data directory inside Docker.
- n8n local-node testing uses a `custom` directory under `.n8n`; this setup mounts `.docker/custom` there and installs a packed tarball from `/workspace` so n8n only loads the package contents declared in `package.json`.
