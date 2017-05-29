FROM php:7.1-fpm

# Install some packages, extentions & composer
RUN apt-get update \
    && apt-get install -y \
        libicu-dev \
        zlib1g-dev \
        git \
        wget \
    && docker-php-ext-install \
        zip \
        intl \
        json \
        mbstring \
        mysqli \
        pdo_mysql \
    && php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/local/bin --filename=composer \
    && chmod +x /usr/local/bin/composer

# Install NodeJs
RUN curl -o /tmp/setup_node.sh https://deb.nodesource.com/setup_6.x
RUN chmod +x /tmp/setup_node.sh
RUN /tmp/setup_node.sh
RUN apt-get update \
    && apt-get install -y \
    nodejs \
    build-essential

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update \
    && apt-get install -y \
    yarn
