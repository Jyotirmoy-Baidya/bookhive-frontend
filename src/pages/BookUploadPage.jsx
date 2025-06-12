import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function BookUploadPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [author, setAuthor] = useState('');
    const [publication, setPublication] = useState('');
    const [editionYear, setEditionYear] = useState('');
    const [condition, setCondition] = useState('Good');
    const [basePrice, setBasePrice] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/tags/all-tags', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                credentials: 'include'
            }
        })
            .then(res => res.json())
            .then(data => { console.log(data.data); setAllTags(data.data || []) })
            .catch(err => toast.error('Failed to load tags', err));
    }, []);

    const getToken = () => {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : null;
    };// adjust as per auth setup

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 3) return toast.error('Max 3 images allowed.');

        setLoading(true);
        try {
            const uploadPromises = files.map(file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET);
                return fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                    method: 'POST',
                    body: formData,
                }).then(res => res.json());
            });

            const results = await Promise.all(uploadPromises);
            const urls = results.map(r => r.secure_url);
            setImages([...images, ...urls]);
        } catch (error) {
            toast.error('Image upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleTagAdd = async (tagName) => {
        const existingTag = allTags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
        if (existingTag) {
            // Just add to selected tags if not already added
            if (!tags.includes(existingTag.name)) {
                setTags([...tags, existingTag]);
                toast.success(`Tag ${tagName} added`);
            } else {
                toast.error(`Tag ${tagName} already selected`);
            }
            return;
        }
        try {
            console.log(getToken());
            const res = await fetch('http://localhost:3001/api/v1/tags/create-tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                credentials: 'include',
                body: JSON.stringify({ tag: tagName }),
            });

            const text = await res.text();
            console.log("Raw response:", text);

            const data = JSON.parse(text);

            toast.success(`Tag ${tagName} added`);
            setTags([...tags, { name: data.data.name, _id: data.data._id }]);
            console.log(tags);
        } catch (err) {
            toast.error('Failed to add tag');
            console.log("Error occurred:", err);
        }

    };

    const handleSubmit = async () => {
        if (!title || !images.length || !tags.length || !author) {
            return toast.error('Please fill in required fields');
        }

        const uploadTags = tags.map(tag => tag._id);

        const payload = {
            title,
            description,
            tags: uploadTags,
            basePrice,
            condition,
            editionYear,
            author,
            publication,
            images,
        };

        try {
            const res = await fetch('http://localhost:3001/api/v1/books/create-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });
            console.log(res);
            if (!res.ok) throw new Error('Upload failed');
            toast.success('Book uploaded successfully');
            setTitle('');
            setDescription('');
            setTags([]);
            setImages([]);
            setAuthor('');
            setPublication('');
            setEditionYear('');
            setBasePrice('');
        } catch (err) {
            toast.error('Book upload failed');
            console.log(err);
        }
    };
    console.log(tags);

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Upload Book</h2>

            <input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="input mt-2" rows={4} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input className="input mt-2" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
            <input className="input mt-2" placeholder="Publication" value={publication} onChange={e => setPublication(e.target.value)} />
            <input className="input mt-2" placeholder="Edition Year" value={editionYear} onChange={e => setEditionYear(e.target.value)} />
            <input className="input mt-2" type="number" placeholder="Base Price" value={basePrice} onChange={e => setBasePrice(e.target.value)} />
            <select className="input mt-2" value={condition} onChange={e => setCondition(e.target.value)}>
                <option>Good</option>
                <option>Fair</option>
                <option>New</option>
            </select>

            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-4" />
            <div className="flex gap-3 mt-2">
                {images.map((img, i) => (
                    <img key={i} src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
                ))}
            </div>

            <input
                className="input mt-4"
                placeholder="Add tag (press enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleTagAdd(tagInput.trim());
                        setTagInput('');
                        e.preventDefault();
                    }
                }}
            />
            {tagInput && (
                <ul className="mt-1 max-h-40 overflow-y-auto border border-gray-300 rounded-md shadow-sm">
                    {allTags
                        .filter(tag => tag.name.toLowerCase().includes(tagInput.toLowerCase()))
                        .map((tag, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    handleTagAdd(tag.name);
                                    setTagInput('');
                                }}
                                className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                            >
                                {tag.name}
                            </li>
                        ))}
                </ul>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tag.name}
                    </span>
                ))}
            </div>

            <button className="btn-primary mt-6 w-full" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Book'}
            </button>
        </div>
    );
}
