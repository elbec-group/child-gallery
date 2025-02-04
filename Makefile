.PHONY: lib
OWNER=Carlos Villuendas<carlosvillu@gmail.com>

SHELL := /bin/sh
.DEFAULT_GOAL := help

deploy:
	npm run build
	surge dist https://elmeutextdopinio.cat/

repomix:
	npx repomix ./ -c .repomix/config.json -o .repomix/repomix-src.xml
