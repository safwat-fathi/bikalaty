import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/lib/components/AddToCartButton";
import { QuantitySelector } from "@/lib/components/QuantitySelector";

import { ProductModal } from "../ProductModal";

// Define a type for your product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  stock: number; // Example: stock level
  nutrition?: {
    // Example nested data
    calories: number;
    fat: number;
    protein: number;
  };
  origin?: string; // Example: Country of origin
}

// --- Data Fetching (Server Component) ---
// Replace with your actual data fetching logic (e.g., from an API or database)
async function getProductById(_id: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // --- MOCK DATA ---
  const products: Record<string, Product> = {
    "1": {
      id: "123",
      name: "Organic Bananas (Bunch)",
      description:
        "Sweet and creamy organic bananas, perfect for smoothies, baking, or a healthy snack. Grown without synthetic pesticides.",
      price: 1.99,
      currency: "USD",
      imageUrl: "/img-placeholder.svg", // Replace with actual image path
      category: "Fresh Produce",
      stock: 50,
      nutrition: { calories: 105, fat: 0.4, protein: 1.3 },
      origin: "Ecuador",
    },
    "2": {
      id: "456",
      name: "Whole Milk (Gallon)",
      description: "Fresh Grade A whole milk, rich in calcium and vitamin D. Great for drinking, cereal, or cooking.",
      price: 3.49,
      currency: "USD",
      imageUrl: "/img-placeholder.svg", // Replace with actual image path
      category: "Dairy & Eggs",
      stock: 30,
      nutrition: { calories: 150, fat: 8, protein: 8 }, // Per cup
      origin: "USA",
    },
  };
  // --- END MOCK DATA ---

  return products["1"] || null;
}

// --- SEO: Structured Data Function ---
function generateProductJsonLd(product: Product) {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl, // Use absolute URL in production
    description: product.description,
    sku: product.id, // Use SKU if available, otherwise ID
    mpn: product.id, // Use MPN if available, otherwise ID
    brand: {
      // Add brand info if available
      "@type": "Brand",
      name: "GroceryStoreName", // Replace with your store or product brand
    },
    // "review": { // Example: Add if you have reviews
    //   "@type": "Review",
    //   "reviewRating": {
    //     "@type": "Rating",
    //     "ratingValue": "4.5",
    //     "bestRating": "5"
    //   },
    //   "author": {
    //     "@type": "Person",
    //     "name": "Reviewer Name"
    //   }
    // },
    // "aggregateRating": { // Example: Add if you have aggregate ratings
    //   "@type": "AggregateRating",
    //   "ratingValue": "4.4",
    //   "reviewCount": "89"
    // },
    offers: {
      "@type": "Offer",
      url: `/products/${product.id}`, // URL to the product page (use absolute URL in production)
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      priceValidUntil: "2025-12-31", // Example validity
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return JSON.stringify(productSchema);
}

export async function ProductDetails({ productId }: { productId: string }) {
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  // IDs for linking ARIA attributes
  const titleId = `product-title-${product.id}`;
  const descriptionId = `product-description-${product.id}`;

  return (
    <ProductModal>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateProductJsonLd(product) }} />

      <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
        {/* Product Image Column */}
        <div className="flex-shrink-0 md:w-1/2">
          <div className="bg-base-200 relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name} // Important for SEO & A11y
              fill
              sizes="(max-width: 768px) 90vw, 40vw" // Responsive image sizes
              className="object-contain" // Use 'contain' or 'cover' based on preference
              priority // Prioritize loading if it's likely LCP
            />
          </div>
        </div>

        {/* Product Details & Actions Column */}
        <div className="flex flex-col md:w-1/2">
          <h1 id={titleId} className="mb-2 text-xl font-bold lg:text-3xl">
            {product.name}
          </h1>
          <p id={descriptionId} className="mb-4">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-primary mb-4 text-3xl font-semibold">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(product.price)}
          </p>

          {/* Additional Info (Example) */}
          <div className="text-base-content/70 mb-4 space-y-1 text-sm">
            {product.origin && <p>Origin: {product.origin}</p>}
            <p>Category: {product.category}</p>
            {product.nutrition && <p>Calories per serving: {product.nutrition.calories}</p>}
            <p className={product.stock > 0 ? "text-success" : "text-error"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          {/* Spacer to push actions to bottom */}
          <div className="flex-grow"></div>

          {/* Actions */}
          <div className="border-base-300 mt-auto space-y-3 border-t pt-4">
            {product.stock > 0 ? (
              <>
                <QuantitySelector stock={product.stock} />
                <AddToCartButton productName={product.name} />
              </>
            ) : (
              <button className="btn btn-disabled w-full" disabled>
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </ProductModal>
  );
}
