FROM golang:1.22

WORKDIR /app

RUN go mod init election-analysis

COPY main.go .

CMD ["go", "run", "main.go"]