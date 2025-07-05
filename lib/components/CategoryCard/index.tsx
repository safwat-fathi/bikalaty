import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/models";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.slug}`} className="group relative block overflow-hidden rounded-lg">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={category.image_url}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={200}
          height={200}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          priority={false}
        />
        <div className="absolute top-0 z-10 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="h-fit p-4">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <p className="text-sm text-white/80">{category.product_count} products</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
