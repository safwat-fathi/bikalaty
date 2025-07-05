/* eslint-disable sonarjs/no-duplicate-string */

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Filters from "@/lib/components/Filters";
// import { JsonLd } from "@/lib/components/JsonLd";
import ProductCard from "@/lib/components/ProductCard";
import { Product } from "@/types/models/product.model";

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

// --- Mock Data Fetching ---
// Replace this with your actual data fetching logic (e.g., from an API)
async function getCategoryData(slug: string): Promise<{ category: Category | null; products: Product[] }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Mock Category Data - find based on slug
  const mockCategories: Category[] = [
    {
      name: "Fresh Vegetables",
      slug: "fresh-vegetables",
      description: "Discover a wide variety of fresh, locally sourced vegetables perfect for any meal.",
    },
    {
      name: "Dairy & Eggs",
      slug: "dairy-eggs",
      description: "High-quality milk, cheese, yogurt, and farm-fresh eggs.",
    },
    // Add more categories
  ];

  const category = mockCategories.find((cat) => cat.slug === slug) || null;

  // Mock Product Data - filter based on category slug (example)
  const mockProducts: Product[] = [
    // Vegetables
    {
      id: 1,
      name: "Organic Broccoli",
      slug: "organic-broccoli",
      image: "/images/broccoli.jpg", // Replace with actual image paths
      price: 2.99,
      brand: "FarmFresh",
      rating: 4.5,
      unit: "kg",
      discount: 10,
      isNew: true,
      category: "fresh-vegetables",
      description: "Crisp organic broccoli, packed with nutrients.",
    },
    {
      id: 2,
      name: "Organic Carrots",
      slug: "organic-carrots",
      image: "/images/carrots.jpg", // Replace with actual image paths
      price: 1.99,
      brand: "FarmFresh",
      rating: 4.2,
      unit: "kg",
      isNew: true,
      category: "fresh-vegetables",
      description: "Fresh organic carrots, perfect for salads.",
    },
    // Dairy & Eggs
    {
      id: 3,
      name: "Organic Milk",
      slug: "organic-milk",
      image: "/images/milk.jpg", // Replace with actual image paths
      price: 3.49,
      brand: "FarmFresh",
      rating: 4.8,
      unit: "liters",
      isNew: true,
      category: "dairy-eggs",
      description: "Fresh organic milk, perfect for cooking and baking.",
    },
    {
      id: 4,
      name: "Organic Eggs",
      slug: "organic-eggs",
      image: "/images/eggs.jpg", // Replace with actual image paths
      price: 5.99,
      brand: "FarmFresh",
      rating: 4.6,
      unit: "dozen",
      isNew: true,
      category: "dairy-eggs",
      description: "Fresh organic eggs, perfect for any meal.",
    },
  ];

  const products = mockProducts.filter((p) => p.category === slug);

  return { category, products };
}
// --- End Mock Data Fetching ---

export interface CategoryPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// --- SEO: Dynamic Metadata Generation ---
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategoryData(slug); // Fetch category name

  if (!category) {
    return {
      title: "Category Not Found | Bikalaty",
    };
  }

  return {
    title: `${category.name} | Bikalaty`,
    description: category.description || `Browse our selection of ${category.name} at Bikalaty.`,
    // Add more metadata like openGraph, keywords, etc.
    openGraph: {
      title: `${category.name} | Bikalaty`,
      description: category.description || `Shop ${category.name}.`,
      // images: [ /* Add category image if available */ ],
    },
    // Consider adding canonical URL if applicable
    alternates: {
      canonical: `/category/${slug}`,
      languages: {
        "en-US": `/en/category/${slug}`,
        "ar-EG": `/ar/category/${slug}`,
      },
    },
  };
}
// --- End SEO Metadata ---

// --- The Page Component ---
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, products } = await getCategoryData(slug);

  if (!category) notFound();

  // return (
  //   <div className="container mx-auto py-8">
  //     <header className="mb-8 text-center md:text-left">
  //       <h1 className="mb-2 text-3xl font-bold md:text-4xl">{category.name}</h1>
  //       {category.description && <p className="text-lg text-gray-600">{category.description}</p>}
  //     </header>

  //     {/* Products Grid */}

  //     <section aria-labelledby="products-heading">
  //       {/* Screen reader only heading */}
  //       <h2 id="products-heading" className="sr-only">
  //         Products in {category.name}
  //       </h2>{" "}
  //       {products.length > 0 ? (
  //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  //           {products.map((product) => (
  //             <ProductCard key={product.id} product={product} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="py-10 text-center">
  //           <p className="text-xl text-gray-500">No products found in this category yet.</p>
  //           {/* Optional: Suggest related categories or link back home */}
  //         </div>
  //       )}
  //     </section>

  //     <JsonLd
  //       data={{
  //         "@context": "https://schema.org",
  //         "@type": "ItemList",
  //         name: category.name,
  //         description: category.description,
  //         itemListElement: products.map((product, index) => ({
  //           "@type": "ListItem",
  //           position: index + 1,
  //           item: {
  //             "@type": "Product",
  //             name: product.name,
  //             image: product.image,
  //             description: product.description,
  //             sku: product.id, // Or actual SKU
  //             brand: { "@type": "Brand", name: product.brand },
  //             offers: {
  //               "@type": "Offer",
  //               url: `/${locale}/products/${product.slug}`, // Link to product page
  //               priceCurrency: "USD", // Change as needed
  //               price: product.price,
  //               availability: "https://schema.org/InStock", // Update based on actual availability
  //             },
  //           },
  //         })),
  //       }}
  //     />
  //   </div>
  // );

  return (
    <div className="drawer lg:drawer-open">
      {/* Unique ID for the checkbox */}
      <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content (Main Area: Header + Products) */}
      <div className="drawer-content bg-base-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header Area */}
          <header className="mb-6 md:mb-8">
            {/* Mobile Filter Toggle Button */}
            <div className="mb-4 lg:hidden">
              <label htmlFor="filter-drawer" className="btn btn-primary drawer-button">
                <svg // Filter Icon
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                  />
                </svg>
                Filters
              </label>
            </div>

            {/* Category Title & Description */}
            <div className="text-center md:text-left">
              {/* Optional: Breadcrumbs */}
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">{category.name}</h1>
              {category.description && <p className="text-lg text-gray-600">{category.description}</p>}
            </div>
          </header>

          {/* Products Grid Section */}
          <section aria-labelledby="products-heading">
            <h2 id="products-heading" className="sr-only">
              Products in {category.name}
            </h2>
            {products.length > 0 ? (
              // Responsive grid: Adjust columns based on screen size
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-xl text-gray-500">No products found in this category yet.</p>
              </div>
            )}
          </section>
          {/* Optional: Pagination */}
          {/* Optional: JSON-LD Structured Data */}
        </div>
      </div>

      {/* Drawer Side (Filters) */}
      <div className="drawer-side">
        {/* Overlay for mobile */}
        <label htmlFor="filter-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* Filters Component placed inside the sidebar */}
        <aside className="bg-base-200 text-base-content min-h-full w-72 p-4 md:w-80">
          <h2 className="bg-base-200 sticky top-0 z-10 mb-4 py-2 text-xl font-semibold">Filters</h2>
          <Filters /> {/* Render the Filters component here */}
        </aside>
      </div>
    </div>
  );
}
