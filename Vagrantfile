Vagrant.require_version ">= 1.9.0"

servers=[
    {
        :hostname   => "manager1",
        :primary    => true,
        :autostart  => true,
        :ip         => "192.168.42.100",
        :ram        => 2048,
        :cpu        => 1,
        :cpu_cap    => 100
    },
    {
        :hostname   => "worker1",
        :primary    => false,
        :autostart  => true,
        :ip         => "192.168.42.110",
        :ram        => 512,
        :cpu        => 1,
        :cpu_cap    => 50
    },
    {
        :hostname   => "worker2",
        :primary    => false,
        :autostart  => true,
        :ip         => "192.168.42.120",
        :ram        => 512,
        :cpu        => 1,
        :cpu_cap    => 50
    }
]

Vagrant.configure(2) do |config|
    servers.each_with_index do |(machine), index|
        config.vm.define machine[:hostname], primary: machine[:primary], autostart: machine[:autostart] do |node|
            # Base box
            node.vm.box = "ARTACK/debian-jessie"
            node.vm.box_url = "https://atlas.hashicorp.com/ARTACK/boxes/debian-jessie"

            # Customize VM
            node.vm.hostname = machine[:hostname]

            # Port Forwarding
            node.vm.network "private_network", ip: machine[:ip]

#            # Disable automatic synced folder mount
#            node.vm.synced_folder '.', '/vagrant', disabled: true

            node.vm.provider "virtualbox" do |vb|
                vb.name = machine[:hostname]
                vb.memory = machine[:ram]
                vb.cpus = machine[:cpu]
                vb.customize ["modifyvm", :id, "--cpuexecutioncap", machine[:cpu_cap]]

                # Change the network card hardware for better performance
                vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
                vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]

                # Suggested fix for slow network performance
                # see https://github.com/mitchellh/vagrant/issues/1807
                vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
                vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]

                # Enable symlink
                vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]

                # Set the timesync threshold to 10 seconds, instead of the default 20 minutes.
                vb.customize ["guestproperty", "set", :id, "/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold", 10000]

                # Disable usb 2.0 support
                vb.customize ["modifyvm", :id, "--usb", "on"]
                vb.customize ["modifyvm", :id, "--usbehci", "off"]
            end

            # Run Ansible provisioning once
            if index == servers.size - 1
                node.vm.provision :ansible do |ansible|
                    ansible.playbook          = "provisioning/infrastructure.yml"
                    ansible.inventory_path    = "provisioning/hosts/hosts"
                    ansible.limit             = "docker-nodes"
                    ansible.verbose           = "" # Use v, vv, vvv, or vvvv to be ansible more verbose
                end
            end
        end
    end
end
