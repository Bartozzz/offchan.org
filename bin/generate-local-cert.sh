#!/usr/bin/env bash
# Based on: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec

BASE_DIR=$(cd "$(dirname $BASH_SOURCE[0])" && cd "../" && pwd)
COMPOSE_DIR=$(cd "$(dirname $BASH_SOURCE[0])" && pwd)

echo "Certificates will be saved at '$BASE_DIR/'\n"

# This file will be used as the key to generate the Root SSL certificate:
openssl genrsa -des3 -out $BASE_DIR/_localCA.key 2048

# We can use the key we've generated to create a new Root SSL certificate:
openssl req -x509 -new -nodes -sha256 -days 1024 \
  -key $BASE_DIR/_localCA.key \
  -out $BASE_DIR/_localCA.pem

# Create a certificate key for localhost using the configuration settings stored
# in server.csr.cnf. This key is stored in _localhost.key.
openssl req -new -sha256 -nodes \
  -newkey rsa:2048 \
  -out $BASE_DIR/_localhost.csr \
  -keyout $BASE_DIR/_localhost.key \
  -config $COMPOSE_DIR/config/offchan.csr.cnf

openssl x509 -req -days 500 -sha256 \
  -in $BASE_DIR/_localhost.csr \
  -CA $BASE_DIR/_localCA.pem \
  -CAkey $BASE_DIR/_localCA.key -CAcreateserial \
  -out $BASE_DIR/_localhost.crt \
  -extfile $COMPOSE_DIR/config/offchan.v3.ext

echo "\nAdd generated certificates to your local machine's keychain.\n"
