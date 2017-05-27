start:
	vagrant up --no-provision

stop:
	vagrant halt

reload:
	vagrant reload --no-provision

provision:
	vagrant provision

setup: start provision
	@echo 'finished .............................. \o/ ............;'

retry: reload provision
	@echo 'finished .............................. \o/ ............;'

remove:
	vagrant destroy --force
