##############################################################################
#
# Overview:
#   This Dockerfile was drafted in a way to make sure that we do not change
#   The node.JS code that would be moved out of apigee
#   As we go after the migration, the file would change as we mature
#
##############################################################################

# get the base image
FROM alpine:3.7

# install app dependencies

RUN apk upgrade --update
RUN apk add --update bash sed nodejs

# create app directory

WORKDIR /opt/

# copy the source files

COPY ./ /opt/

ENV IP=0.0.0.0

EXPOSE 3002

# main entry point
CMD node app.js
