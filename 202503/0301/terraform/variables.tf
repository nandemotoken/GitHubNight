variable "aws_region" {
  description = "AWSリージョン"
  type        = string
  default     = "ap-northeast-1"
}

variable "bucket_name" {
  description = "作成するS3バケットの名前"
  type        = string
  default     = "terraform-demo-bucket-123456"
}