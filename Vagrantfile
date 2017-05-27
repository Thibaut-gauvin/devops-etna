servers=[
    {
        :hostname   => "manager1",
        :primary    => true,
        :autostart  => true,
        :ip         => "192.168.42.100",
        :ssh_port   => 2201,
        :ram        => 512,
        :cpu        => 1,
        :cpu_cap    => 50
    },
    {
        :hostname   => "worker1",
        :primary    => false,
        :autostart  => true,
        :ip         => "192.168.42.110",
        :ssh_port   => 2202,
        :ram        => 512,
        :cpu        => 1,
        :cpu_cap    => 50
    },
    {
        :hostname   => "worker2",
        :primary    => false,
        :autostart  => true,
        :ip         => "192.168.42.120",
        :ssh_port   => 2203,
        :ram        => 512,
        :cpu        => 1,
        :cpu_cap    => 50
    }
]

Vagrant.configure(2) do |config|
    servers.each do |machine|
        config.vm.define machine[:hostname], primary: machine[:primary], autostart: machine[:autostart] do |node|
            # base box
            node.vm.box = "ARTACK/debian-jessie"
            node.vm.box_url = "https://atlas.hashicorp.com/ARTACK/boxes/debian-jessie"

            # customize VM
            node.vm.hostname = machine[:hostname]
            node.vm.network "private_network", ip: machine[:ip]
            node.vm.network :forwarded_port, guest: 22, host: machine[:ssh_port]

            node.vm.provider "virtualbox" do |vb|
                vb.name = machine[:hostname]
                vb.memory = machine[:ram]
                vb.cpus = machine[:cpu]
                vb.customize ["modifyvm", :id, "--cpuexecutioncap", machine[:cpu_cap]]

                # change the network card hardware for better performance
                vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
                vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]

                # suggested fix for slow network performance
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
        end
    end
end

Vagrant.configure(2) do |config|
    config.vm.provision :ansible do |ansible|
        ansible.playbook          = "provisioning/playbook.yml"
        ansible.inventory_path    = "provisioning/hosts/hosts"
        ansible.limit             = "vagrant"
        ansible.verbose           = "v" # Use v, vv, vvv, or vvvv to be ansible more verbose
    end
end
