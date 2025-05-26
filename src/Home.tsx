import { CartList } from "./components/CartList"
import { ProductListing } from "./components/ProductListing"
import { products } from "./data";

export const Home = () => {
  return (
    <section className="mb-8 pt-8 lg:mb-0 flex flex-col items-center">
      <div className="container lg:grid lg:grid-cols-[2.5fr_1fr] lg:gap-4">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Desserts</h1>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductListing key={index} product={product}/>
            ))}
          </div>
        </div>
        <CartList />
      </div>
    </section>
  );
}