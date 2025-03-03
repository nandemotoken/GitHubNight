output "bucket_id" {
  description = "作成されたS3バケットのID"
  value       = aws_s3_bucket.demo_bucket.id
}

output "bucket_arn" {
  description = "作成されたS3バケットのARN"
  value       = aws_s3_bucket.demo_bucket.arn
}

output "bucket_region" {
  description = "S3バケットが作成されたリージョン"
  value       = var.aws_region
}