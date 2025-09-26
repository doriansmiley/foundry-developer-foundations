FROM node:22.13.0-alpine

RUN apk add --no-cache git python3 make g++

WORKDIR /workspace

RUN addgroup -g 1001 -S nodejs && \
    adduser -S larry -u 1001 -G nodejs

USER larry

EXPOSE 3000


ENTRYPOINT ["sh", "-c"]
CMD ["cd /workspace/apps/cli-tools && npm run start-simple-for-test"]