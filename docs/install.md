# Install guide


## Prerequisites

To provision virtual machines you need :
- [Virtual Box](https://www.virtualbox.org)
- [Vagrant](https://www.vagrantup.com)
- [Ansible](https://www.ansible.com)


## Installation:

**Assuming following :**  
`$ ...` is your local machine cli (terminal)    
`~> ...` is your docker cli (inside a container)


- **Start & Build VM :**
    
        $ make provision


- **Set hosts file :**

        sudo nano /etc/hosts

        # Add following entries
        127.0.0.1 tick-stack.dev catalog.tick-stack.dev booking.tick-stack.dev billing.tick-stack.dev mongo.tick-stack.dev
        192.168.42.100 tick-stack.com catalog.tick-stack.com booking.tick-stack.com billing.tick-stack.com mongo.tick-stack.com visualizer.tick-stack.com
