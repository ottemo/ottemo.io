FROM gcr.io/ottemo-kube/node:7.8.0

USER root
RUN apk add --no-cache nginx
RUN apk add --no-cache openssl

RUN mkdir -pv /etc/nginx/ssl
RUN mkdir -pv /var/cache/nginx/cache
RUN mkdir -pv /etc/nginx/sites-enabled/
RUN mkdir -pv /home/ottemo/ottemo-io

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=US/ST=TEST/L=TEST/O=TEST ORG/OU=IT Department/CN=test CN"

COPY . /home/ottemo/ottemo-io
RUN rm -rf /home/ottemo/ottemo-io/.git
WORKDIR /home/ottemo/ottemo-io
RUN npm install
RUN gulp build

COPY ottemo.d /etc/nginx/ottemo.d
COPY nginx-default-alpine.conf /etc/nginx/nginx.conf
COPY nginx-ottemo-io.conf /etc/nginx/sites-enabled/nginx-ottemo-io.conf
COPY bin/docker-entrypoint.sh /etc/nginx

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /etc/nginx

EXPOSE 80 443
CMD ./docker-entrypoint.sh
