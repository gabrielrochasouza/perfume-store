# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This project is in its initial stage. Currently the repository contains only product photos in `assets/` — no application code, build system, or dependencies exist yet.

## Product catalog

The `assets/` directory holds product images for the store's inventory (WhatsApp-sourced photos of perfume boxes). Brands visible in the current assets include Carolina Herrera (212 VIP Rosé), Paco Rabanne (Olympéa), and ZAAD.

## Starting development

Before writing code, confirm with the user:
- **Stack choice** — no framework, language, or toolchain has been decided yet.
- **Image naming** — the current filenames contain spaces and WhatsApp timestamps; they will likely need to be renamed when wired into an actual product catalog.
- **Deployment target** — static site, full-stack app, or something else.
