# Sprint 0 Notes

## CI Pipeline

- Implemented GitHub Actions workflow aligned with the locked stack profile.
- Workflow includes stages for:
  - Dependency allow-list verification.
  - Infrastructure as Code (IaC) scanning using Checkov.
  - Deployment to UAT environment using OpenTofu.
- Pipeline is configured to fail if:
  - Dependency allow-list check fails.
  - IaC scan reports critical or high severity findings.
- No credentials or secrets are inlined; all secrets are referenced via Vault.

## Dependency Allow-List

- Generated an allow-list of approved dependencies based on the locked stack profile.
- The allow-list check is integrated as a mandatory step in the CI pipeline.
- Any unauthorized or unapproved dependencies cause the pipeline to fail.

## UAT Environment

- Provisioned UAT environment using OpenTofu with infrastructure as code.
- UAT deployment is automated and triggered by the CI pipeline.
- The UAT URL is configured and accessible for functional testing.
- Argo CD Application manifest created for syncing deployments to the client’s Kubernetes cluster.
- Branch protection rules established:
  - Required status checks include allow-list verification and IaC scanning.
  - Force-pushes to `main` branch are disabled.
- CODEOWNERS file configured to assign Gate 4 reviewers for critical code areas.

---

No secrets or credentials are stored in the repository; all sensitive information is managed securely via Vault references.
