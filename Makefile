###################################
#   MAKEFILE FOR OOSHOT-GALLERY   #
###################################

.SILENT:
.PHONY: build

#####
# Colors
COLOR_RESET     = \033[0m
COLOR_INFO      = \033[32m
COLOR_COMMENT   = \033[33m

#####
# Executed when you run "make" cmd
# Simply run "start" tasks
all: start

#####
# Start development vm's
start:
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                Start Virtual machines ...                         *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
	vagrant up --no-provision

#####
# Stop development vm's
stop:
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                Stop Virtual machines ...                          *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
	vagrant halt

#####
# Restart development vm's
reload:
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                Restart Virtual machines ...                       *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
	vagrant reload --no-provision

#####
# Remove development vm's
remove: stop
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                Remove Virtual machines ...                        *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
	vagrant destroy --force

#####
# Start provisioning
provision-node:
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                Provision Virtual machines ...                     *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
	vagrant provision

######
# Start development vm's & launch provisioning
provision: start provision-node
	printf '${COLOR_COMMENT}'
	@echo '*********************************************************************'
	@echo '*                            DONE                                   *'
	@echo '*********************************************************************'
	printf '${COLOR_RESET}'
