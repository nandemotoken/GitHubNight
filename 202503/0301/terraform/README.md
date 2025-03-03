# Terraform デモプロジェクト

このプロジェクトは、Terraform を使用して AWS S3 バケットを作成する簡単なデモです。
LocalStack を使用してローカル環境で動作確認ができます。

## 前提条件

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 以上)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## セットアップと実行手順

### 1. LocalStack の起動

以下のコマンドで LocalStack を起動します：

```bash
docker-compose up -d
```

### 2. Terraform の初期化

```bash
terraform init
```

### 3. 実行計画の確認

```bash
terraform plan
```

### 4. リソースの作成

```bash
terraform apply
```

確認メッセージが表示されたら、`yes`と入力して実行します。

### 5. 作成されたリソースの確認

LocalStack で作成された S3 バケットを確認するには：

```bash
aws --endpoint-url=http://localhost:4566 s3 ls
```

### 6. リソースの削除

```bash
terraform destroy
```

確認メッセージが表示されたら、`yes`と入力して実行します。

### 7. LocalStack の停止

```bash
docker-compose down
```

## ファイル構成

- `main.tf` - メインの Terraform コード（S3 バケットの定義）
- `variables.tf` - 変数の定義
- `outputs.tf` - 出力値の定義
- `terraform.tfvars` - 変数の値を設定
- `docker-compose.yml` - LocalStack の設定
