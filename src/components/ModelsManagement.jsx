import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from "convex/react";
import { api } from '../../convex/_generated/api';

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ModelCard = styled.div`
  border: 1px solid #404040;
  border-radius: 12px;
  padding: 1.5rem;
  background: #323232;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  color: #ffffff;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  h3 {
    color: #d4af37;
    margin-bottom: 0.5rem;
  }
  
  h4 {
    color: #d4af37;
    font-size: 0.9rem;
    margin: 1rem 0 0.5rem 0;
  }
  
  ul {
    color: #b0b0b0;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'delete' ? '#dc3545' : '#d4af37'};
  color: ${props => props.variant === 'delete' ? '#fff' : '#000'};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 0.75rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'delete' ? '#c82333' : '#f4c842'};
    transform: translateY(-1px);
  }
`;

const ModelForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 1.5rem 0;
  background: #2d2d2d;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #404040;

  h3, h4 {
    color: #d4af37;
    margin: 0 0 1rem 0;
  }

  input, textarea {
    padding: 0.75rem;
    border: 1px solid #404040;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    background: #323232;
    color: #ffffff;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #d4af37;
    }
    
    &::placeholder {
      color: #888;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }

  button {
    width: fit-content;
  }
`;

export default function ModelsManagement({ sessionToken }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    tagline: '',
    mainImage: '',
    categoryImages: {
      casual: '',
      formal: '',
      sports: '',
      evening: '',
      commercial: ''
    },
    bio: '',
    status: 'active',
    highlights: {
      ageRange: '',
      skinTone: '',
      styleVibe: '',
      height: '',
      build: '',
      ethnicity: '',
      features: ''
    }
  });

  const models = useQuery(api.models.getAll) || [];
  const createModel = useMutation(api.models.create);
  const deleteModel = useMutation(api.models.remove);
  const updateModel = useMutation(api.models.update);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const modelData = {
        ...formData,
        age: Number(formData.age),
      };

      if (editingId) {
        await updateModel({ id: editingId, ...modelData, sessionToken });
      } else {
        // For create, we can remove status since backend sets it to 'active'
        const { status, ...createData } = modelData;
        await createModel({ ...createData, sessionToken });
      }

      setFormData({
        name: '',
        age: 0,
        tagline: '',
        mainImage: '',
        categoryImages: {
          casual: '',
          formal: '',
          sports: '',
          evening: '',
          commercial: ''
        },
        bio: '',
        status: 'active',
        highlights: {
          ageRange: '',
          skinTone: '',
          styleVibe: '',
          height: '',
          build: '',
          ethnicity: '',
          features: ''
        }
      });
      setIsAdding(false);
      setEditingId(null);
      alert('Model saved successfully!');
    } catch (error) {
      console.error('Error saving model:', error);
      const errorMessage = error.message || 'Failed to save model. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleEdit = (model) => {
    setFormData({
      name: model.name,
      age: model.age,
      tagline: model.tagline,
      mainImage: model.mainImage,
      categoryImages: model.categoryImages || {
        casual: '',
        formal: '',
        sports: '',
        evening: '',
        commercial: ''
      },
      bio: model.bio,
      status: model.status || 'active',
      highlights: { ...model.highlights }
    });
    setEditingId(model._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      try {
        await deleteModel({ id, sessionToken });
        alert('Model deleted successfully!');
      } catch (error) {
        console.error('Error deleting model:', error);
        const errorMessage = error.message || 'Failed to delete model. Please try again.';
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div>
      <ActionButton onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add New Model'}
      </ActionButton>

      {isAdding && (
        <ModelForm onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Model' : 'Add New Model'}</h3>
          
          {/* Basic Information */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age || ''}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
              required
              min="1"
              max="120"
            />
          </div>
          
          <input
            type="text"
            placeholder="Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({...formData, tagline: e.target.value})}
            required
          />
          
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="featured">Featured</option>
          </select>
          
          {/* Main Profile Image */}
          <h4>Main Profile Image</h4>
          <input
            type="url"
            placeholder="Main Profile Image URL"
            value={formData.mainImage}
            onChange={(e) => setFormData({...formData, mainImage: e.target.value})}
            required
          />
          {formData.mainImage && (
            <div style={{marginTop: '0.5rem'}}>
              <img src={formData.mainImage} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} />
            </div>
          )}
          
          {/* Category Images */}
          <h4>Category Images</h4>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{color: '#d4af37', fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>Casual Look</label>
              <input
                type="url"
                placeholder="Casual image URL"
                value={formData.categoryImages.casual}
                onChange={(e) => setFormData({...formData, categoryImages: {...formData.categoryImages, casual: e.target.value}})}
                required
              />
            </div>
            <div>
              <label style={{color: '#d4af37', fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>Formal Look</label>
              <input
                type="url"
                placeholder="Formal image URL"
                value={formData.categoryImages.formal}
                onChange={(e) => setFormData({...formData, categoryImages: {...formData.categoryImages, formal: e.target.value}})}
                required
              />
            </div>
            <div>
              <label style={{color: '#d4af37', fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>Sports Look</label>
              <input
                type="url"
                placeholder="Sports image URL"
                value={formData.categoryImages.sports}
                onChange={(e) => setFormData({...formData, categoryImages: {...formData.categoryImages, sports: e.target.value}})}
                required
              />
            </div>
            <div>
              <label style={{color: '#d4af37', fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>Evening Look</label>
              <input
                type="url"
                placeholder="Evening image URL"
                value={formData.categoryImages.evening}
                onChange={(e) => setFormData({...formData, categoryImages: {...formData.categoryImages, evening: e.target.value}})}
                required
              />
            </div>
            <div>
              <label style={{color: '#d4af37', fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>Commercial Look</label>
              <input
                type="url"
                placeholder="Commercial image URL"
                value={formData.categoryImages.commercial}
                onChange={(e) => setFormData({...formData, categoryImages: {...formData.categoryImages, commercial: e.target.value}})}
                required
              />
            </div>

          </div>
          
          <textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            required
          />
          <h4>Highlights</h4>
          <input
            type="text"
            placeholder="Age Range"
            value={formData.highlights.ageRange}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, ageRange: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Skin Tone"
            value={formData.highlights.skinTone}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, skinTone: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Style Vibe"
            value={formData.highlights.styleVibe}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, styleVibe: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Height"
            value={formData.highlights.height}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, height: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Build"
            value={formData.highlights.build}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, build: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Ethnicity"
            value={formData.highlights.ethnicity}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, ethnicity: e.target.value}})}
            required
          />
          <input
            type="text"
            placeholder="Features"
            value={formData.highlights.features}
            onChange={(e) => setFormData({...formData, highlights: {...formData.highlights, features: e.target.value}})}
            required
          />
          <ActionButton type="submit">
            {editingId ? 'Save Changes' : 'Add Model'}
          </ActionButton>
          {editingId && (
            <ActionButton 
              type="button" 
              variant="delete" 
              onClick={() => {
                setEditingId(null);
                setIsAdding(false);
                setFormData({
                  name: '',
                  age: 0,
                  tagline: '',
                  mainImage: '',
                  categoryImages: {
                    casual: '',
                    formal: '',
                    sports: '',
                    evening: '',
                    commercial: ''
                  },
                  bio: '',
                  status: 'active',
                  highlights: {
                    ageRange: '',
                    skinTone: '',
                    styleVibe: '',
                    height: '',
                    build: '',
                    ethnicity: '',
                    features: ''
                  }
                });
              }}
            >
              Cancel Edit
            </ActionButton>
          )}
        </ModelForm>
      )}

      <ModelsGrid>
        {models.map(model => (
          <ModelCard key={model._id}>
            <img 
              src={model.mainImage} 
              alt={model.name} 
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem' }} 
            />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
              <h3 style={{margin: 0}}>{model.name}</h3>
              <span style={{
                background: model.status === 'featured' ? '#d4af37' : model.status === 'active' ? '#28a745' : '#6c757d',
                color: model.status === 'featured' ? '#000' : '#fff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {model.status}
              </span>
            </div>
            <p style={{margin: '0 0 0.5rem 0', color: '#d4af37'}}>{model.tagline}</p>
            <p style={{margin: '0 0 1rem 0'}}>Age: {model.age}</p>
            
            {/* Category Images Preview */}
            {model.categoryImages && (
              <div style={{marginBottom: '1rem'}}>
                <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Category Images</h4>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem'}}>
                  {Object.entries(model.categoryImages).slice(0, 6).map(([category, url]) => (
                    url && (
                      <img
                        key={category}
                        src={url}
                        alt={category}
                        style={{width: '100%', height: '40px', objectFit: 'cover', borderRadius: '4px'}}
                        title={category.charAt(0).toUpperCase() + category.slice(1)}
                      />
                    )
                  ))}
                </div>
              </div>
            )}
            
            <h4>Highlights</h4>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
              <li>Height: {model.highlights.height}</li>
              <li>Build: {model.highlights.build}</li>
              <li>Style: {model.highlights.styleVibe}</li>
            </ul>

            <div style={{marginTop: '1rem'}}>
              <ActionButton onClick={() => handleEdit(model)}>Edit</ActionButton>
              <ActionButton 
                variant="delete" 
                onClick={() => handleDelete(model._id)}
              >
                Delete
              </ActionButton>
            </div>
          </ModelCard>
        ))}
      </ModelsGrid>
    </div>
  );
}