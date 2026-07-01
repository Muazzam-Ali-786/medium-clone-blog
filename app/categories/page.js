import Link from 'next/link';
import { getMixedTags } from '@/services/mixedApi';

export const revalidate = 3600;

export const metadata = {
  title: 'Categories | MediumClone',
  description: 'Browse articles by category on MediumClone.',
};

export default async function CategoriesPage() {
  const tags = await getMixedTags({ perPage: 24 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Explore by Category</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise across all of our featured topics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tags.map((cat, index) => {
          // Cycle through the 5 generated glassmorphism images
          const bgImageNumber = (index % 5) + 1;
          const bgImageUrl = `/images/categories/cat_glass_${bgImageNumber}.png`;

          return (
            <Link key={cat.id} href={`/categories/${cat.name.toLowerCase()}`}>
              <div 
                className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-lg group min-h-[160px] flex flex-col justify-end p-6"
              >
                {/* 3D Glass Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${bgImageUrl}')` }}
                />
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-colors group-hover:bg-black/40" />

                {/* Content */}
                <div className="relative z-10 text-white">
                  <h2 className="text-2xl font-bold mb-1 tracking-wide drop-shadow-md">#{cat.name}</h2>
                  <div className="opacity-90 text-sm font-medium drop-shadow flex items-center gap-2">
                    Explore Topic <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
