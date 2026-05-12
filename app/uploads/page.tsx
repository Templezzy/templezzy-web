'use client';

import { useState } from 'react';
import { db } from "@/lib/db";
import { useRouter } from 'next/navigation';
import { Upload, Loader2, ArrowLeft, Link as LinkIcon, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Blog');
  const [previewUrl, setPreviewUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await db.auth.getUser();
      if (!user) throw new Error("Unauthorized");

      const { error: uploadError } = await db
        .from('template')
        .insert([
          { 
            name: title,
            desc: description,
            author: user.email,
            category, 
            preview_url: previewUrl,
            repo_url: repoUrl,
           
          }
        ]);

      if (uploadError) throw uploadError;

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-10 transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Submit Template</h1>
          <p className="text-zinc-500 mt-2">Masukkan link aset untuk kreasi kamu.</p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Nama Template</label>
              <input
                type="text"
                required
                placeholder="Contoh: Portofolio Minimalis"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 px-4 text-white outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Kategori Template</label>
              <select
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 px-4 text-white outline-none focus:border-zinc-400 transition-all appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Blog">Blog</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Portofolio">Portofolio</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Deskripsi Template</label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan fitur atau keunggulan template kamu..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 px-4 text-white outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-700 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Link Preview Gambar</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="url"
                  required
                  placeholder="https://imgur.com/image.png"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-12 pr-4 text-white outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-700"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Link File Source (Drive/GitHub)</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="url"
                  required
                  placeholder="https://github.com/user/repo"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-3 pl-12 pr-4 text-white outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-700"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-950 inset-shadow-2xs inset-shadow-zinc-800 text-white font-semibold py-4 rounded-md hover:bg-zinc-900 cursor-pointer transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={18} />}
              Publikasikan Template
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}