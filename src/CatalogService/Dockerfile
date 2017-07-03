FROM ubuntu:14.04

# Define working directory
WORKDIR /app

# Install base package for dev
RUN apt-get update \
    && apt-get install -y \
        build-essential \
        git \
        curl \
        wget \
        sudo

# Install NodeJs last LTS release
RUN curl -o /tmp/setup_node.sh https://deb.nodesource.com/setup_6.x
RUN chmod +x /tmp/setup_node.sh
RUN /tmp/setup_node.sh
RUN apt-get update \
    && apt-get install -y \
    nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update \
    && apt-get install -y \
    yarn

# Install nodemon globally
RUN npm install -g nodemon

# Install application dependencies
ADD package.json /app/package.json
RUN yarn install && yarn list
RUN mv /app/node_modules /node_modules
ADD . /app

# Expose Port
EXPOSE 3000

CMD ["node", "server.js"]
