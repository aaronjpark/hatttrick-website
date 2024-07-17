# Makefile for cs373-idb project

# Variables
PYTHON=python
PIP=pip
APP=app.py

# Default target
all: install run

# Install dependencies
install:
	$(PIP) install -r requirements.txt

# Run the scraping scripts
scrape:
	$(PYTHON) clubScraper.py
	$(PYTHON) leagueScraper.py
	$(PYTHON) playerScraper.py

# Start the application
run:
	$(PYTHON) $(APP)

# Clean the project directory
clean:
	rm -rf __pycache__
	rm -rf *.pyc
	rm -rf *.pyo
	rm -rf *.log

# Help message
help:
	@echo "Makefile for cs373-idb project"
	@echo ""
	@echo "Usage:"
	@echo "  make            Default target: install and run the application"
	@echo "  make install    Install dependencies"
	@echo "  make scrape     Run the scraping scripts"
	@echo "  make run        Start the application"
	@echo "  make clean      Clean the project directory"
	@echo "  make help       Display this help message"

.PHONY: all install scrape run clean help
