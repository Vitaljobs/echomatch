"use client";

import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ProfileImageUploadProps {
    initialImage?: string;
    playerId?: string;
    userId?: string;
    onImageChange?: (image: string) => void;
}

export default function ProfileImageUpload({ initialImage, playerId, userId, onImageChange }: ProfileImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Resize image before processing
                const resizedImage = await resizeImage(file);

                setPreview(resizedImage);
                if (onImageChange) onImageChange(resizedImage);

                // Auto-save logic
                if (playerId || userId) {
                    setIsUploading(true);
                    try {
                        let url = '';
                        if (playerId) url = `/api/players/${playerId}`;
                        else if (userId) url = `/api/users/${userId}`;

                        const res = await fetch(url, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ photoUrl: resizedImage })
                        });

                        if (!res.ok) {
                            const errorData = await res.json().catch(() => ({}));
                            console.error("Upload error details:", errorData);
                            throw new Error("Upload failed");
                        }
                    } catch (error) {
                        console.error("Failed to save image", error);
                        alert("Fout bij opslaan afbeelding. Probeer een kleinere foto.");
                    } finally {
                        setIsUploading(false);
                    }
                }
            } catch (err) {
                console.error("Error processing image", err);
                alert("Er ging iets mis bij het verwerken van de foto.");
            }
        }
    };

    const removeImage = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        if (onImageChange) onImageChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';

        if (playerId || userId) {
            setIsUploading(true);
            try {
                let url = '';
                if (playerId) url = `/api/players/${playerId}`;
                else if (userId) url = `/api/users/${userId}`;

                await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photoUrl: '' })
                });
            } catch (error) {
                console.error("Failed to remove image", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="relative group">
            <div
                className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 group-hover:border-accent transition-all duration-300 cursor-pointer relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => fileInputRef.current?.click()}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Profile" className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : ''}`} />
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                        {isHovering && !isUploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        )}
                        <button
                            onClick={removeImage}
                            className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-accent transition-colors">
                        {isUploading ? (
                            <div className="w-6 h-6 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div className="absolute -bottom-2 -right-2 bg-accent p-1.5 rounded-lg shadow-lg shadow-accent/20 border border-white/10">
                <Camera className="w-3.5 h-3.5 text-white" />
            </div>
        </div>
    );
}
