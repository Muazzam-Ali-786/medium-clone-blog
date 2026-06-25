'use client';
import { useState } from 'react';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Technology', slug: 'technology', count: 124 },
  { id: 2, name: 'Programming', slug: 'programming', count: 213 },
  { id: 3, name: 'Science', slug: 'science', count: 89 },
  { id: 4, name: 'Self Improvement', slug: 'self-improvement', count: 156 },
  { id: 5, name: 'Data Science', slug: 'data-science', count: 78 },
];

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
}

export default function AdminCategories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'name') updated.slug = generateSlug(value);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setCategories((prev) => prev.map((c) => c.id === editId ? { ...c, ...form } : c));
      setMessage('Category updated!');
    } else {
      setCategories((prev) => [...prev, { ...form, id: Date.now(), count: 0 }]);
      setMessage('Category created!');
    }
    setForm({ name: '', slug: '' });
    setEditId(null);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug });
    setEditId(cat.id);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Category Management</h1>
        <p className="text-gray-500 mt-1">Manage blog categories and topics.</p>
      </div>

      {message && (
        <div className="mb-6 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg text-sm">{message}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            {editId ? 'Edit Category' : 'Add Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name *</label>
              <input name="name" type="text" required value={form.name} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g. Technology" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
              <input name="slug" type="text" value={form.slug} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                placeholder="e.g. technology" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                {editId ? 'Update' : 'Create'}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm({ name: '', slug: '' }); }}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">All Categories ({categories.length})</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{cat.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cat.count}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(cat)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
