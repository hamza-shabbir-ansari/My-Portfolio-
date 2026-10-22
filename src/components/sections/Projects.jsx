import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { pipelineData } from '../../data/timeline';
import { AgentLabel } from '../agents/AgentLabel';
import { FlagshipProject } from './FlagshipProject';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Terminal } from 'lucide-react';

export const Projects = () => {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsStep = pipelineData.find((s) => s.id === 'projects') || pipelineData[2];
  const flagship = projectsData.find((p) => p.featured) || projectsData[0];
  const otherProjects = projectsData.filter((p) => !p.featured);

  const handleOpenModal = (project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="section-spacing section-container pt-16 pb-24">
      {/* Agent Header */}
      <div className="mb-6">
        <AgentLabel
          agent={projectsStep.agentKey || 'AGENT 02'}
          name={projectsStep.name}
          status="active"
          subtitle={projectsStep.subtext}
        />
      </div>

      {/* Section Subhead Narrative */}
      <div className="mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#fbbf24] uppercase tracking-widest mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#14b8a6]" />
          <span>Engineering Pipeline</span>
        </div>
        <h2 className="font-h1-fluid text-cream-50 uppercase tracking-tight leading-none mb-4">
          Selected Projects
        </h2>
        <p className="font-body-lg text-cream-muted leading-relaxed">
          Four selected projects built with AI agents, automation and full-stack software.
        </p>
      </div>

      {/* Flagship Project 1 (Pinned Cinematic Scene) */}
      <div className="mb-24 lg:mb-32">
        <FlagshipProject
          project={flagship}
          onOpenModal={handleOpenModal}
        />
      </div>

      {/* Projects 2, 3, 4: Core Pipeline Deployments */}
      <div className="space-y-16">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#2dd4bf] font-semibold">
              EXECUTION PIPELINE CORE BUILDS
            </h3>
          </div>
          <span className="font-mono text-xs text-cream-muted">
            03 Additional Core Deployments
          </span>
        </div>

        {otherProjects.map((proj, idx) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            index={idx + 1}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Fullscreen Case Study & Video Player Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
