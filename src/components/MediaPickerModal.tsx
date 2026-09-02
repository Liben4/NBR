import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Search, 
  Check, 
  Link as LinkIcon, 
  Plus, 
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MediaItem } from '../types';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (media: { url: string; caption?: string; credit?: string }) => void;
  currentSelectedUrl?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectMedia,
  currentSelectedUrl
}) => {
  const { mediaLibrary, addMediaItem, categories } = useApp();
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  
  // Custom URL upload form
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [captionInput, setCaptionInput] = useState('');
  const [creditInput, setCreditInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Business');
  
  // File upload state
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredMedia = mediaLibrary.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (item.credit && item.credit.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
    return matchesQuery && matchesCat;
  });

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFilePreview(dataUrl);
      setUrlInput(dataUrl);
      if (!titleInput) {
        setTitleInput(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSaveAndSelectUploaded = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const savedItem = addMediaItem({
      title: titleInput.trim() || 'Uploaded Newsroom Photo',
      url: urlInput.trim(),
      caption: captionInput.trim() || 'Executive editorial photograph',
      credit: creditInput.trim() || 'Negarit Business Desk',
      category: categoryInput,
      fileSize: '1.2 MB',
      dimensions: '1920x1080'
    });

    onSelectMedia({
      url: savedItem.url,
      caption: savedItem.caption,
      credit: savedItem.credit
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                Media Library & Photo Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose an existing high-resolution asset or upload newsroom media
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'library'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Browse Library ({mediaLibrary.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image File</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Import via Direct URL</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: BROWSE MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              {/* Search & Category Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search media by title, caption, credit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gallery Grid */}
              {filteredMedia.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
                  <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No media assets found</p>
                  <p className="text-xs text-slate-500 mt-1">Try a different search query or upload a new photo above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMedia.map((media) => {
                    const isSelected = currentSelectedUrl === media.url;
                    return (
                      <div
                        key={media.id}
                        onClick={() => {
                          onSelectMedia({
                            url: media.url,
                            caption: media.caption,
                            credit: media.credit
                          });
                          onClose();
                        }}
                        className={`group relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-slate-100 dark:bg-slate-800 shadow-sm hover:shadow-md ${
                          isSelected
                            ? 'border-blue-600 ring-4 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400'
                        }`}
                      >
                        <img
                          src={media.url}
                          alt={media.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                          <p className="text-[11px] font-bold text-white line-clamp-1">{media.title}</p>
                          <p className="text-[9px] text-slate-300 line-clamp-1">{media.credit}</p>
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {media.category && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-bold text-slate-200 uppercase">
                            {media.category}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2 & 3: FILE UPLOAD OR URL FORM */}
          {(activeTab === 'upload' || activeTab === 'url') && (
            <form onSubmit={handleSaveAndSelectUploaded} className="space-y-4 max-w-2xl mx-auto">
              {activeTab === 'upload' ? (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Drag & Drop or Select Image File
                  </label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    {filePreview ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="max-h-48 rounded-xl object-contain shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => { setFilePreview(null); setUrlInput(''); }}
                          className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline"
                        >
                          Change / Remove File
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          Drop photo file here to upload
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP, SVG</p>
                        <label className="mt-4 inline-block px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow">
                          Browse Local Files
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Direct Image URL (CDN / Web Link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setFilePreview(e.target.value);
                    }}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {urlInput && (
                    <div className="mt-3 aspect-video max-h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img src={urlInput} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Asset Title / Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ethiopian Airlines Flagship B787"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Caption & Credit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Editorial Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Commercial operations at Bole International Airport"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Photo Credit / Attribution
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Negarit Archive / ENA"
                    value={creditInput}
                    onChange={(e) => setCreditInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('library')}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!urlInput.trim()}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save & Use in Article</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
