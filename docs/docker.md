# Docker commands :

List of docker command & usage.

Useful doc :
- [Swarm tutorial](https://docs.docker.com/engine/swarm/swarm-tutorial)
- [How services work](https://docs.docker.com/engine/swarm/how-swarm-mode-works/services/#replicated-and-global-services)


## Base :

- List container :

        ~> docker ps -a
        ~> dops (alias)

- List images :

        ~> docker images
        ~> doi (alias)

- Remove all containers :

        ~> docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
        ~> dost (alias)

- Remove all images :

        ~> docker rmi $(docker images -q)
        ~> doirm (alias)

- Show docker networks :

        ~> docker networks ls

## docker-compose commands :

- Start containers :

        $ docker-compose up -d

- Shutdown & remove containers and networks used by compose file :

        $ docker-compose down

- Restart service containers :

        $ docker-compose restart

- Delete stopped container (won't affect running container) :

        $ docker-compose rm -f

- Show logs of services :

        # Show all logs
        $ docker-compose logs -f

        # Show logs of catalog_service
        $ docker-compose logs -f catalog_service


## Swarm services :

- List swarm nodes :

        ~> docker service ls

- See details about stack :

        ~> docker stack ps tick_stack

- See details about service behind stack :

        ~> docker service ls

- See logs of service :

        # here we display logs of booking_service
        ~> docker service logs -f tick_stack_booking_service

## Swarm setup (manual connection) :

The following commands assume that your are ssh to the swarm manager node

        $ vagrant ssh manager1

- Init the swarm mode :

        ~> docker swarm init --advertise-addr <MANAGER-IP>

        # In our case, ip of the manager1 is 192.168.42.100
        ~> docker swarm init --advertise-addr 192.168.42.100

- Add worker to the swarm :

        # Retrieve to access token (in manager1 cli)
        ~> docker swarm join-token worker
        To add a worker to this swarm, run the following command:

            docker swarm join \
            --token SWMTKN-1-18aipdh7uz9p80vda6at0u3wiffzo7zm7wpjyrsi12joh6ylav-1npijtig144p5k27wcxhz8lej \
            192.168.42.100:2377

        # Run the command (in worker1 or worker2 cli)
        $ vagrant ssh worker1 #
        ~> docker swarm join --token SWMTKN-1-18aipdh7uz9p80vda6at0u3wiffzo7zm7wpjyrsi12joh6ylav-1npijtig144p5k27wcxhz8lej 192.168.42.100:2377

- List node of your swarm :

        ~> docker node ls
       ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
       8fd9p5qgrz2w7o6lnvw9qdmql *   manager1            Ready               Active              Leader
       99l92i5pebohofr869bhjysnn     worker2             Ready               Active              
       nmyfda6q2syyvd5k02ayjun4i     worker1             Ready               Active              

- See info about node :

        ~> docker node inspect --pretty <node_name>

        # ex :
        ~> docker node inspect --pretty worker2
        ID:			99l92i5pebohofr869bhjysnn
        Hostname:              	worker2
        Joined at:             	2017-05-27 11:30:49.45077015 +0000 utc
        Status:
         State:			Ready
         Availability:         	Active
         Address:		192.168.42.120
        Platform:
         Operating System:	linux
         Architecture:		x86_64
        Resources:
         CPUs:			1
         Memory:		494.4MiB
        Plugins:
         Network:		bridge, host, macvlan, null, overlay
         Volume:		local
        Engine Version:		17.05.0-ce
