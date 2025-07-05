import CategoryCard from "@/lib/components/CategoryCard";
import { Category } from "@/types/models";

const categories: Category[] = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    slug: "fruits-and-vegetables",
    image_url:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXRzJTIwYW5kJTIwdmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    product_count: 256,
  },
  {
    id: 2,
    name: "Meat & Seafood",
    slug: "meat-and-seafood",
    image_url:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVhdHxlbnwwfHwwfHx8MA%3D%3D",
    product_count: 124,
  },
  {
    id: 3,
    name: "Dairy & Eggs",
    slug: "dairy-and-eggs",
    image_url:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFpcnl8ZW58MHx8MHx8fDA%3D",
    product_count: 89,
  },
  {
    id: 4,
    name: "Bakery",
    slug: "bakery",
    image_url:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFrZXJ5fGVufDB8fDB8fHww",
    product_count: 67,
  },
  {
    id: 5,
    name: "Beverages",
    slug: "beverages",
    image_url: "",
    product_count: 155,
  },
  {
    id: 6,
    name: "Snacks",
    slug: "snacks",
    image_url:
      "https://images.unsplash.com/photo-1611601184963-9d1de9b79768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25hY2tzfGVufDB8fDB8fHww",
    product_count: 201,
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="section-title">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
