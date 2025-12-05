import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, Settings } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'freelance' | 'internship';
}

const ExperienceManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceItem>>({
    title: '',
    company: '',
    location: '',
    period: '',
    description: [''],
    technologies: [],
    type: 'work'
  });

  // Load experiences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('workExperiences');
    if (stored) {
      setExperiences(JSON.parse(stored));
    } else {
      // Initialize with default experience
      const defaultExperience: ExperienceItem[] = [{
        id: '1',
        title: "Associate Software Engineer",
        company: "EVERVENT",
        location: "India",
        period: "Nov 2023 - Present",
        type: "work",
        description: [
          "Engineered an Insurance Management System for multiple brokers (JIO, Muthoot, Policy Parivaar, Unison), ensuring seamless integration, scalability, and robust performance across platforms",
          "Developed and optimized Node.js applications for a fintech platform, enhancing user experience and operational efficiency for insurance providers, with solutions aligned to capital market regulations",
          "Designed and optimized MySQL databases to efficiently handle and process large datasets from multiple brokers, ensuring high availability and fast data retrieval",
          "Automated key insurance processes (policy updates, renewals, reporting), significantly reducing manual intervention and improving system reliability and speed",
          "Integrated with third-party brokers and platforms, ensuring seamless data synchronization and enhancing platform interoperability"
        ],
        technologies: ["Node.js", "MySQL", "Insurance Systems", "API Integration", "Fintech"]
      }];
      setExperiences(defaultExperience);
      localStorage.setItem('workExperiences', JSON.stringify(defaultExperience));
    }
  }, []);

  // Save to localStorage whenever experiences change
  const saveExperiences = (updatedExperiences: ExperienceItem[]) => {
    setExperiences(updatedExperiences);
    localStorage.setItem('workExperiences', JSON.stringify(updatedExperiences));
    // Dispatch event to refresh Experience component
    window.dispatchEvent(new Event('experiencesUpdated'));
  };

  const handleAdd = () => {
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      title: formData.title || '',
      company: formData.company || '',
      location: formData.location || '',
      period: formData.period || '',
      description: formData.description?.filter(d => d.trim() !== '') || [],
      technologies: formData.technologies || [],
      type: formData.type || 'work'
    };
    saveExperiences([newExperience, ...experiences]);
    resetForm();
  };

  const handleEdit = (id: string) => {
    const exp = experiences.find(e => e.id === id);
    if (exp) {
      setFormData(exp);
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (editingId) {
      const updated = experiences.map(exp =>
        exp.id === editingId
          ? { ...exp, ...formData, id: editingId }
          : exp
      );
      saveExperiences(updated);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      saveExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      period: '',
      description: [''],
      technologies: [],
      type: 'work'
    });
    setEditingId(null);
  };

  const addDescriptionField = () => {
    setFormData({
      ...formData,
      description: [...(formData.description || ['']), '']
    });
  };

  const updateDescriptionField = (index: number, value: string) => {
    const newDesc = [...(formData.description || [])];
    newDesc[index] = value;
    setFormData({ ...formData, description: newDesc });
  };

  const removeDescriptionField = (index: number) => {
    const newDesc = formData.description?.filter((_, i) => i !== index);
    setFormData({ ...formData, description: newDesc });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg z-50 transition-all"
        title="Manage Work Experience"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings size={24} className="text-purple-500" />
            Manage Work Experience
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Form */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Period (e.g., Jan 2024 - Present)"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="work">Full-time</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsibilities/Achievements</label>
              {formData.description?.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a responsibility or achievement"
                    value={desc}
                    onChange={(e) => updateDescriptionField(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeDescriptionField(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addDescriptionField}
                className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                + Add another point
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, MySQL, etc."
                value={formData.technologies?.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '')
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                  >
                    <Save size={16} />
                    Update
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                >
                  <Plus size={16} />
                  Add Experience
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Experiences ({experiences.length})</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-purple-600 dark:text-purple-400">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.location} • {exp.period}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp.id)}
                      className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceManager;
