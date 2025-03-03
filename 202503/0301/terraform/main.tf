# AWSプロバイダーの設定
provider "aws" {
  region = var.aws_region
  # 実際の環境では認証情報が必要ですが、デモのため省略しています
  # 通常は環境変数やAWS CLIの設定から自動的に取得されます
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_use_path_style           = true
  
  # ローカルでの動作確認用にエンドポイントを設定
  endpoints {
    s3 = "http://localhost:4566"
  }
}

# S3バケットの作成
resource "aws_s3_bucket" "demo_bucket" {
  bucket = var.bucket_name
  
  tags = {
    Name        = "デモバケット"
    Environment = "開発"
    Project     = "Terraform学習"
  }
}

# バケットのアクセス設定
resource "aws_s3_bucket_acl" "demo_bucket_acl" {
  bucket = aws_s3_bucket.demo_bucket.id
  acl    = "private"
}