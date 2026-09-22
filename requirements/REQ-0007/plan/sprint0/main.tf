# OpenTofu — REQ-0007 single environment
terraform { required_version = ">= 1.6.0" }
variable "uat_name" { type = string }
resource "null_resource" "uat" {
  triggers = { name = var.uat_name }
}
