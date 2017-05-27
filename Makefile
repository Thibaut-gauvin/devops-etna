start:
	@echo 'Start Virtual machines ............................'
	vagrant up --no-provision

stop:
	@echo 'Stop Virtual machines .............................'
	vagrant halt

reload:
	@echo 'Restart Virtual machines ..........................'
	vagrant reload --no-provision

remove:
	@echo 'Remove Virtual machines ...........................'
	vagrant destroy --force

provision-node:
	@echo 'Build & Configure Swarm nodes .....................'
	vagrant provision

provision: start provision-node
	@echo 'Done !'
