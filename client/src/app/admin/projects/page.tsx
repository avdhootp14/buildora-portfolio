"use client";

import { useState, useEffect } from 'react';

type Project = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '' });

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Admin auth token needed
        },
        body: JSON.stringify({
          ...newProject,
          technologies: newProject.technologies.split(',').map(t => t.trim())
        })
      });

      if (res.ok) {
        setShowModal(false);
        setNewProject({ title: '', description: '', technologies: '' });
        fetchProjects(); // Refresh list
      } else {
        alert('Failed to add project. Please login first.');
      }
    } catch (error) {
      console.error('Error adding project', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
        >
          + Add New Project
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading projects...</div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Tech Stack</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No projects found. Add one!</td>
                </tr>
              ) : projects.map((p) => (
                <tr key={p._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                  <td className="px-6 py-4 text-gray-400 truncate max-w-xs">{p.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {p.technologies.map(t => (
                        <span key={t} className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-lg p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent resize-none"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
                <input 
                  required
                  type="text" 
                  placeholder="React, Next.js, Tailwind"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
