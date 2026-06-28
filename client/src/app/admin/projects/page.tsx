"use client";
import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

type Project = {
  _id: string;
  title: string;
  description: string;
  tag: string;
  imageUrl: string;
  link: string;
  technologies: string[];
  sortOrder: number;
};

// Sortable Card Component
function SortableProjectCard({ project, onEdit, onDelete }: { project: Project, onEdit: (p: Project) => void, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project._id });
  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center transition-colors shadow-2xl backdrop-blur-xl group ${isDragging ? 'border-accent shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'hover:bg-white/5'}`}>
      {/* Drag Handle */}
      <div {...attributes} {...listeners} className="p-2 cursor-grab active:cursor-grabbing text-gray-500 hover:text-white transition-colors shrink-0 outline-none">
        <GripVertical size={24} />
      </div>

      {/* Image Preview */}
      {project.imageUrl ? (
        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#111]">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full md:w-48 h-32 rounded-xl shrink-0 border border-white/10 bg-white/5 flex items-center justify-center text-white/20">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="flex-grow w-full">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-1 block">
          {project.tag || "Project"}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(t => (
            <span key={t} className="bg-white/10 border border-white/5 text-xs px-2.5 py-1 rounded-md text-gray-300 shadow-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex md:flex-col gap-3 shrink-0 mt-4 md:mt-0">
        <button 
          onClick={() => onEdit(project)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-4 py-2 md:p-3 rounded-xl transition-all"
          title="Edit Project"
        >
          <Edit2 size={18} /> <span className="md:hidden">Edit</span>
        </button>
        <button 
          onClick={() => onDelete(project._id)}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 md:p-3 rounded-xl transition-all"
          title="Delete Project"
        >
          <Trash2 size={18} /> <span className="md:hidden">Delete</span>
        </button>
      </div>
    </div>
  );
}


export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', tag: '', imageUrl: '', link: '', technologies: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL + '/projects');
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
    fetchProjects();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex(p => p._id === active.id);
      const newIndex = projects.findIndex(p => p._id === over.id);
      
      const newArray = arrayMove(projects, oldIndex, newIndex);
      
      // Update local state immediately with new normalized sort orders
      const updatedProjects = newArray.map((p, index) => ({ ...p, sortOrder: index + 1 }));
      setProjects(updatedProjects);
      
      // Save all updated sort orders to database
      try {
        await Promise.all(updatedProjects.map(p => 
          fetch(`${API_URL}/projects/${p._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ sortOrder: p.sortOrder })
          })
        ));
      } catch (err) {
        console.error("Failed to save new order to database", err);
        fetchProjects(); // Revert on failure
      }
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEditing = !!editingProjectId;
      const url = isEditing 
        ? `${API_URL}/projects/${editingProjectId}`
        : API_URL + '/projects';
        
      const formData = new FormData();
      formData.append('title', newProject.title);
      formData.append('description', newProject.description);
      formData.append('tag', newProject.tag);
      formData.append('link', newProject.link);
      
      if (!isEditing) {
        formData.append('sortOrder', (projects.length > 0 ? projects[projects.length - 1].sortOrder + 1 : 1).toString());
      }
      
      const techs = typeof newProject.technologies === 'string' 
        ? newProject.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        : newProject.technologies as string[];
        
      techs.forEach((t: string) => formData.append('technologies', t));
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Note: When using FormData, do not set Content-Type header. The browser will automatically set it to multipart/form-data with the correct boundary.
        },
        body: formData
      });

      if (res.ok) {
        closeModal();
        fetchProjects(); // Refresh list
        toast.success(`Project ${isEditing ? 'updated' : 'added'} successfully`);
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'add'} project. Please login first.`);
      }
    } catch (error) {
      console.error(`Error ${editingProjectId ? 'updating' : 'adding'} project`, error);
    }
  };

  const openEditModal = (p: Project) => {
    setEditingProjectId(p._id);
    setNewProject({
      title: p.title,
      description: p.description,
      tag: p.tag || '',
      imageUrl: p.imageUrl || '',
      link: p.link || '',
      technologies: p.technologies.join(', ')
    });
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProjectId(null);
    setNewProject({ title: '', description: '', tag: '', imageUrl: '', link: '', technologies: '' });
    setImageFile(null);
  };

  const executeDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project.');
    }
  };

  const handleDeleteProject = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="font-semibold text-white">Are you sure you want to delete this project?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => toast.dismiss(t.id)} className="px-4 py-1.5 bg-gray-700 text-sm font-medium rounded-lg text-white hover:bg-gray-600 transition-colors">Cancel</button>
          <button onClick={() => {
            toast.dismiss(t.id);
            executeDelete(id);
          }} className="px-4 py-1.5 bg-red-600 text-sm font-medium rounded-lg text-white hover:bg-red-500 transition-colors">Delete</button>
        </div>
      </div>
    ), { duration: Infinity });
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
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-12 text-center text-gray-500">
              No projects found. Add one!
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={projects.map(p => p._id)} strategy={verticalListSortingStrategy}>
                {projects.map((p) => (
                  <SortableProjectCard 
                    key={p._id} 
                    project={p} 
                    onEdit={openEditModal} 
                    onDelete={handleDeleteProject} 
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSaveProject} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-400 mb-1">Tag / Category</label>
                <input 
                  required
                  type="text" 
                  placeholder="E.g. E-Commerce Web App"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                  value={newProject.tag}
                  onChange={(e) => setNewProject({...newProject, tag: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Image</label>
                {newProject.imageUrl && !imageFile && (
                  <div className="mb-2 w-32 h-20 rounded overflow-hidden border border-gray-700">
                    <img src={newProject.imageUrl} alt="Current" className="w-full h-full object-cover" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Link</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent"
                  value={newProject.link}
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
                <input 
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
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingProjectId ? 'Save Changes' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

