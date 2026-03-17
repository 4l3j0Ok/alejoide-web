interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}
// Tecnologías que utilizo como SRE:
// Infraestructura: Digital Ocean, AWS
// Contenedores: Docker, Kubernetes, Helm
// CI/CD: Jenkins, GitHub Actions, GitLab CI, ArgoCD
// Servidores web: Apache, Nginx
// Monitorización: Grafana, Prometheus, Elastic Kibana
// Scripting: Bash, Python
// IaC: Terraform
export const skills: SkillCategory[] = [
  {
    name: "SRE & DevOps",
    skills: [
      {
        name: "Docker",
        icon: "mdi:docker",
      },
      {
        name: "Kubernetes",
        icon: "mdi:kubernetes",
      },
      {
        name: "Helm",
        icon: "mdi:helm",
      },
      {
        name: "Digital Ocean",
        icon: "mdi:digital-ocean",
      },
      {
        name: "AWS",
        icon: "mdi:aws",
      },
      {
        name: "Jenkins",
        icon: "mdi:jenkins",
      },
      {
        name: "GitHub Actions",
        icon: "mdi:github",
      },
      {
        name: "GitLab CI",
        icon: "mdi:gitlab",
      },
      {
        name: "ArgoCD",
        icon: "mdi:argocd",
      },
    ],
  },

]