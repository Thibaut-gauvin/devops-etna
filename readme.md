Devops module for etna

## Prerequisites

To provision virtual machines you need :
- [Virtual Box](https://www.virtualbox.org)
- [Vagrant](https://www.vagrantup.com)
- [Ansible](https://www.ansible.com)


## Installation:

**Assuming following :**
- `$ ...` is your local machine cli (terminal)  
- `~> ...` is your docker cli (inside a container)


- **Start VM :**
    
        $ make start
        
- **Build VM :**
    
        $ make provision

## Init Swarm :

- **SSH to manager1 virtual machine & type :**

        $ vagrant ssh manager1
        ~> docker swarm init --advertise-addr 192.168.42.100


## Docker helps :

Take a look at [docker helps](docker.md).
