import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import listingsData from "../mock/listings.json";
import { CardBody, CardItem } from "../components/ui/3d-card"; // Import only the CardBody and CardItem for Product Details
import { CardContainer } from "../components/ui/3d-card"; // Import CardContainer only for Related Items
import CommentSection from "../components/CommentSection";

function ListingDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [comment, setComment] = useState(""); // State to handle user input
  const [comments, setComments] = useState([]); // State to store the list of comments

  useEffect(() => {
    // Find the product by ID
    const selectedProduct = listingsData.find(
      (item) => item.id === parseInt(id)
    );
    setProduct(selectedProduct);

    // Find related items (same category)
    const related = listingsData.filter(
      (item) =>
        item.category === selectedProduct.category &&
        item.id !== selectedProduct.id
    );
    setRelatedItems(related);
  }, [id]);

  const handleAddToCart = () => {
    alert(`Added "${product.title}" to cart.`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy "${product.title}"`);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update comment state as user types
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (comment.trim()) {
      setComments([
        ...comments,
        { user: "User", content: comment, timeAgo: "2 hours ago" },
      ]); // Add the new comment to the list
      setComment(""); // Reset the comment input
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 pt-26">
      {/* Product Details */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full md:w-96 h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-blue-600 font-bold text-xl mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Add to Cart and Buy Now buttons stacked vertically */}
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition text-sm font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-sm font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Related Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedItems.map((item) => (
            <CardContainer
              key={item.id}
              className="group relative w-full max-w-sm mx-auto"
            >
              <CardBody className="relative bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col">
                <CardItem>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-48 w-full object-cover rounded mb-4"
                  />
                </CardItem>

                <CardItem>
                  <h2 className="font-semibold text-lg text-gray-900 line-clamp-1 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-blue-600 font-bold text-lg mb-4">
                    ${item.price}
                  </p>
                </CardItem>

                <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white border hover:bg-black hover:text-white transition">
                  <FiShoppingCart className="text-xl" />
                </button>

                {/* Hover Buttons */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 z-20 flex flex-col gap-2">
                  <Link
                    to={`/listing/${item.id}`}
                    className="bg-black text-white px-3 py-2 rounded text-sm hover:opacity-90 transition text-center"
                  >
                    See Preview
                  </Link>
                  <button
                    onClick={() => alert(`Similar items for ${item.title}`)}
                    className="bg-black text-white px-3 py-2 rounded text-sm hover:opacity-90 transition"
                  >
                    Similar Items
                  </button>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection />
    </div>
  );
}

export default ListingDetails;
