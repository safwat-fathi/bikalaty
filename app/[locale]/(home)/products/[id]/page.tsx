import { NextPage } from "next";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/lib/components/AddToCartButton";
import { JsonLd } from "@/lib/components/JsonLd"; // Helper component for JSON-LD
import { QuantitySelector } from "@/lib/components/QuantitySelector";

// Define the structure of your product data
interface ProductPageProps {
  params: Promise<{ id: string; locale: string }>;
}

// --- Placeholder Data Fetching ---
// Replace this with your actual data fetching logic (e.g., from an API or database)
const getProductById = async (_id: string): Promise<Product | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Example Product Data - Replace with your actual data source
  const products: { [key: string]: Product } = {
    "1": {
      id: "",
      name: "Fresh Gala Apples",
      description:
        "Crisp and sweet Gala apples, perfect for snacking, baking, or adding to salads. Grown locally and picked at peak freshness.",
      price: 2.99,
      currency: "USD",
      sku: "GROC-APP-GAL-1LB",
      brand: "Local Farms",
      category: "Fresh Produce > Fruits",
      imageUrl:
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D",
      stock: 150,
      rating: 4.7,
      reviewCount: 85,
      nutrition: {
        servingSize: "1 medium apple (182g)",
        calories: 95,
        fat: "0.3g",
        carbohydrates: "25g",
        fiber: "4g",
        sugar: "19g",
        protein: "0.5g",
      },
      origin: "Local Orchard, Sunshine Valley",
      tags: ["fruit", "fresh", "gala", "apples", "local", "healthy"],
    },
    // Add more products as needed
  };

  return products["1"] || null;
};

// --- SEO Metadata Generation ---
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160), // Keep it concise
    keywords: product.tags.join(", "),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [
        {
          url: product.imageUrl, // Use absolute URL in production
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.substring(0, 160),
      images: [product.imageUrl], // Use absolute URL in production
    },
  };
}

// --- Product Page Component ---
const ProductDetailPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  // --- JSON-LD Structured Data ---
  const productStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl, // Use absolute URL in production
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "", // Get current URL client-side or pass from server
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Your Grocery Store", // Replace with your store name
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    },
    // Add other relevant properties like 'category', 'material', 'color', etc. if applicable
    // "category": product.category,
    // "countryOfOrigin": product.origin,
  };

  return (
    <>
      {/* Inject JSON-LD data */}
      <JsonLd data={productStructuredData} />

      <div className="bg-base-100 container mx-auto my-8 rounded-lg p-4 shadow-lg md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="flex items-start justify-center">
            {/* Consider using a carousel library like react-slick or swiper for multiple images */}
            <Image
              src={product.imageUrl} // Replace with actual image path
              alt={product.name}
              width={500} // Adjust size as needed
              height={500} // Adjust size as needed
              className="max-h-[500px] rounded-lg object-contain shadow-md"
              priority // Load image faster as it's likely LCP
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="text-base-content/80 text-lg">
              From: <span className="font-semibold">{product.brand}</span> | Category: {product.category}
            </p>

            {/* Rating */}

            {/* Price */}
            <p className="text-primary text-4xl font-extrabold">
              ${product.price.toFixed(2)} <span className="text-base-content/60 text-lg">/{product.currency}</span>
            </p>

            {/* Stock Status */}
            <div className={`badge ${product.stock > 0 ? "badge-primary" : "badge-error"} badge-lg gap-2`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </div>

            {/* Short Description */}
            <p className="text-base-content/90 mt-2">
              {product.description.split(".")[0]}. {/* Show first sentence */}
            </p>

            {/* Quantity Selector */}
            <QuantitySelector stock={product.stock} />

            {/* Add to Cart Button */}
            <AddToCartButton productName={product.name} />
          </div>
        </div>

        {/* Detailed Information Tabs/Sections */}
        <div className="mt-12">
          <div role="tablist" className="tabs tabs-lifted tabs-lg">
            {/* Description Tab */}
            <input
              type="radio"
              name="product_tabs"
              role="tab"
              className="tab"
              aria-label="Description"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <h3 className="mb-2 text-xl font-semibold">Product Details</h3>
              <p className="text-base-content/90 whitespace-pre-line">{product.description}</p>
              <p className="mt-4">
                <strong>Origin:</strong> {product.origin}
              </p>
              <div className="mt-4">
                <strong>Tags:</strong>
                {product.tags.map((tag: string) => (
                  <div key={tag} className="badge badge-outline ml-1">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Tab */}
            <input type="radio" name="product_tabs" role="tab" className="tab" aria-label="Nutrition" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <h3 className="mb-2 text-xl font-semibold">Nutritional Information</h3>
              <div className="overflow-x-auto">
                <table className="table-zebra table w-full">
                  <tbody>
                    <tr>
                      <th>Serving Size</th>
                      <td>{product.nutrition.servingSize}</td>
                    </tr>
                    <tr>
                      <th>Calories</th>
                      <td>{product.nutrition.calories}</td>
                    </tr>
                    <tr>
                      <th>Fat</th>
                      <td>{product.nutrition.fat}</td>
                    </tr>
                    <tr>
                      <th>Carbohydrates</th>
                      <td>{product.nutrition.carbohydrates}</td>
                    </tr>
                    <tr>
                      <th>Fiber</th>
                      <td>{product.nutrition.fiber}</td>
                    </tr>
                    <tr>
                      <th>Sugar</th>
                      <td>{product.nutrition.sugar}</td>
                    </tr>
                    <tr>
                      <th>Protein</th>
                      <td>{product.nutrition.protein}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews Tab Placeholder */}
            <input type="radio" name="product_tabs" role="tab" className="tab" aria-label="Reviews" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <h3 className="mb-2 text-xl font-semibold">Customer Reviews</h3>
              {/* Add your review component or integration here */}
              <p>Reviews section coming soon!</p>
              {/* <p>
                Rated {product.rating} out of 5 stars based on {product.reviewCount} reviews.
              </p> */}
            </div>
          </div>
        </div>

        {/* Related Products Section (Placeholder) */}
        {/* <div className="mt-12">
					<h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
					{/* Add a carousel or grid of related product cards here */}
        {/* </div> */}
      </div>
    </>
  );
};

export default ProductDetailPage;

// Define Product Type (e.g., in @/lib/types.ts or similar)
// Make sure this definition exists and is imported
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  nutrition: {
    servingSize: string;
    calories: number;
    fat: string;
    carbohydrates: string;
    fiber: string;
    sugar: string;
    protein: string;
  };
  origin: string;
  tags: string[];
}
