FROM golang:1.21-alpine as build
WORKDIR /go/src/hirasawaau/embedded-smart-heart-box/backend

COPY * ./
RUN go mod download
RUN CGO_ENABLED=0 go build -o a.out main.go

FROM alpine:latest
WORKDIR /app
COPY --from=build /go/src/hirasawaau/embedded-smart-heart-box/backend/a.out ./
ENV PORT=80
EXPOSE 80
CMD ["./a.out"]