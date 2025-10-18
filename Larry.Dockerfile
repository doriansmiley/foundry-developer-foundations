FROM node:22.13.0-alpine
# check if python3 is needed
RUN apk add --no-cache git python3 make g++

WORKDIR /workspace

RUN addgroup -g 1001 -S nodejs && \
    adduser -S larry -u 1001 -G nodejs

USER larry

# Expose both ports
EXPOSE 4220 4210

# Set default port (can be overridden with -e PORT=4210)
ENV PORT=4220

ENTRYPOINT ["sh", "-c"]
CMD ["cd /workspace/apps/cli-tools && PORT=$PORT npm run server"]