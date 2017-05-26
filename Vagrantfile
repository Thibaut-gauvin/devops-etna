Vagrant.configure("2") do |config|
  N = 3

  VAGRANT_VM_PROVIDER = "virtualbox"
  ANSIBLE_RAW_SSH_ARGS = []

  (1..N-1).each do |machine_id|
    ANSIBLE_RAW_SSH_ARGS << "-o IdentityFile=.vagrant/machines/machine#{machine_id}/#{VAGRANT_VM_PROVIDER}/private_key"
  end

  (1..N).each do |machine_id|
    config.vm.define "machine#{machine_id}" do |machine|
      machine.vm.box = "ARTACK/debian-jessie"
      machine.vm.box_url = "https://atlas.hashicorp.com/ARTACK/boxes/debian-jessie"
      machine.vm.hostname = "machine#{machine_id}"
      machine.vm.network "private_network", ip: "192.168.77.#{10+machine_id-1}"

      # Disable usb 2.0 support
      machine.customize ["modifyvm", :id, "--usb", "on"]
      machine.customize ["modifyvm", :id, "--usbehci", "off"]

      # Only execute once the Ansible provisioner,
      # when all the machines are up and ready.
      if machine_id == N
        machine.vm.provision :ansible do |ansible|
          # Disable default limit to connect to all the machines
          ansible.limit             = "vagrant"
          ansible.playbook          = "provisioning/playbook.yml"
          ansible.inventory_path    = "provisioning/hosts/hosts"
          ansible.verbose           = "vvv"
          ansible.raw_ssh_args      = ANSIBLE_RAW_SSH_ARGS
        end
      end
    end
  end
end
