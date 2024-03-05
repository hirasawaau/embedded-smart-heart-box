FROM golang:1.21-bookworm as build
WORKDIR /go/src/hirasawaau/embedded-smart-heart-box/backend

COPY * ./
RUN go mod download
EXPOSE 80
ENV PORT=80
CMD ["go", "run" , "main.go"]
