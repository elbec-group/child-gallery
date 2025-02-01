.PHONY: lib
OWNER=Carlos Villuendas<carlosvillu@gmail.com>

SHELL := /bin/sh
.DEFAULT_GOAL := help

repomix:
	npx repomix ./src -c .repomix/config.json -o .repomix/repomix-src.xml
