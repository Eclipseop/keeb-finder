import { Product } from "@prisma/client";
import InfiniteScroll from "react-infinite-scroll-component";
import Item from "./Item";

type Props = {
    products: Product[],
    filter: string,
    getMoreData: () => void;
}

const ProductContainer = ({products, filter, getMoreData}: Props) => {
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={getMoreData}
      hasMore={true}
      loader={''}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 pt-4 h-full">
        {
          products
            .filter(product => filter === "all" ? true : product.from === filter)
            .filter((p) => parseInt(p.price.replace('$', '')) > 0)
            .map((p) => <Item key={p.id} product={p} />)
        }
      </div>
    </InfiniteScroll>
  );
};

export default ProductContainer;