import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react'; // you can also use Heroicons or your favorite icon lib

function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img 
        src={listing.imageUrl} 
        alt={listing.title} 
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{listing.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <MapPin size={16} />
          <span>{listing.location}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-semibold">{listing.price} ETB</span>
          <Link to={`/listings/${listing.id}`}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
