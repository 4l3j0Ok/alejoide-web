import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import "../styles/ProjectsList.css";

export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  repo_url?: string;
  created_at: string;
  updated_at: string;
  image?: string;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (projects.length === 0) return <p>No hay proyectos para mostrar.</p>;

  return projects.map((project) => {
    const { title, description, image, url, repo_url } = project;
    return (
      <div key={project.id} className="project">
        <img src={image} alt={title} loading="lazy" />
        <div className="project-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="project-links">
          {url && (
            <a href={url} target="_blank">
              <Icon icon="mdi:open-in-new" /> Ver sitio
            </a>
          )}
          {repo_url && (
            <a href={repo_url} target="_blank">
              <Icon icon="mdi:github" /> Ver código
            </a>
          )}
        </div>
      </div>
    );
  });
}
