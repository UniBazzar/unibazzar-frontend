import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import api from "../../redux/api/uniBazzarApi";
import AddListing from "./AddListing";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import toast from "react-hot-toast";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import {
  BookOpen,
  BadgeDollarSign,
  Phone,
  University,
  Tag,
  Layers,
  Edit2,
  Trash2,
} from "lucide-react";

export default function MyListings() {
  const { user } = useSelector((state) => state.auth);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [editForm, setEditForm] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    api
      .get(`/api/users/${user.id}/listings/`)
      .then((res) => {
        setListings(res.data.student_products || []);
      })
      .catch(() => {
        setError("Failed to fetch listings");
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleDelete = (id) => {
    setDeleteModal({
      open: true,
      id,
      name: listings.find((item) => item.id === id)?.name || "this item",
    });
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/products/student-products/${deleteModal.id}/`);
      setListings((prev) => prev.filter((item) => item.id !== deleteModal.id));
      toast.success("Listing deleted.");
    } catch {
      setError("Failed to delete listing. Please try again.");
    } finally {
      setLoading(false);
      setDeleteModal({ open: false, id: null, name: "" });
    }
  };

  const handleEdit = (item) => {
    setEditForm({
      id: item.id,
      title: item.name || "",
      price: item.price || "",
      category: item.category?.name || "",
      description: item.description || "",
      phone: item.phone_number || "",
      tags: item.tags || "",
      condition: item.condition || "New",
      photo: null,
      oldPhoto: item.photo || null,
    });
    setEditModal({ open: true, data: item });
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setEditForm({ ...editForm, photo: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", editForm.title);
      data.append("price", editForm.price);
      data.append("category", editForm.category);
      data.append("description", editForm.description);
      data.append("phone_number", editForm.phone);
      data.append("tags", editForm.tags);
      data.append("condition", editForm.condition);
      if (editForm.photo) data.append("photo", editForm.photo);
      await api.patch(`/api/products/student-products/${editForm.id}/`, data);
      setListings((prev) =>
        prev.map((item) =>
          item.id === editForm.id
            ? {
                ...item,
                name: editForm.title,
                price: editForm.price,
                category: { ...item.category, name: editForm.category },
                description: editForm.description,
                phone_number: editForm.phone,
                tags: editForm.tags,
                condition: editForm.condition,
                photo: editForm.photo
                  ? URL.createObjectURL(editForm.photo)
                  : item.photo,
              }
            : item
        )
      );
      toast.success("Listing updated.");
      setEditModal({ open: false, data: null });
      setEditForm(null);
    } catch {
      setError("Failed to update listing. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-blue-200 flex items-center gap-3">
        <Layers className="text-blue-400" /> My Listings
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {listings.map((item, idx) => (
          <CardContainer key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <CardBody>
                <div className="flex flex-col gap-3">
                  <div className="relative w-full h-48 mb-2">
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-md"
                      />
                    )}
                    <span
                      className={`absolute top-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md z-10 border-2 border-white ${
                        item.condition === "new"
                          ? "bg-blue-600"
                          : item.condition === "used_like_new"
                          ? "bg-green-500"
                          : item.condition === "used_good"
                          ? "bg-yellow-500"
                          : item.condition === "used_fair"
                          ? "bg-orange-500"
                          : "bg-gray-500"
                      }`}
                      style={{ letterSpacing: "0.02em" }}
                    >
                      {item.condition
                        ? item.condition
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        : "-"}
                    </span>
                  </div>
                  <CardItem className="flex items-center gap-2 text-xl font-bold text-blue-900 dark:text-blue-200">
                    <BookOpen className="text-blue-400" /> {item.name}
                  </CardItem>
                  <CardItem className="text-gray-700 dark:text-gray-300 text-base">
                    {item.description}
                  </CardItem>
                  <CardItem className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <BadgeDollarSign className="inline mr-1 text-green-500" />
                    <span className="font-semibold">{item.price} ETB</span>
                    <Tag className="inline ml-3 mr-1 text-blue-400" />
                    <span>{item.tags}</span>
                  </CardItem>
                  <CardItem className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <Layers className="inline mr-1 text-purple-400" />
                    <span>{item.category?.name}</span>
                    <span className="ml-3">
                      <Phone className="inline mr-1 text-pink-400" />
                      {item.phone_number}
                    </span>
                  </CardItem>
                  <CardItem className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="ml-3 flex items-center">
                      <University className="inline mr-1 text-indigo-400" />
                      <span>University: {item.university || "-"}</span>
                    </span>
                  </CardItem>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold text-base shadow"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 size={18} /> Edit
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold text-base shadow"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              </CardBody>
            </motion.div>
          </CardContainer>
        ))}
      </motion.div>
      {editModal.open && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 w-full max-w-lg max-h-screen overflow-y-auto"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">
              Edit Listing
            </h3>
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name / Title</label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  placeholder="e.g., Used Physics Textbook"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price (ETB)</label>
                <input
                  name="price"
                  value={editForm.price}
                  onChange={handleEditFormChange}
                  placeholder="e.g., 300"
                  type="number"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  placeholder="Category"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  placeholder="Write a brief description..."
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditFormChange}
                  placeholder="e.g., 0912345678"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Tags (comma-separated)
                </label>
                <input
                  name="tags"
                  value={editForm.tags}
                  onChange={handleEditFormChange}
                  placeholder="e.g., physics, semester1, engineering"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Condition</label>
                <input
                  name="condition"
                  value={editForm.condition}
                  onChange={handleEditFormChange}
                  placeholder="Condition"
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Product Photo</label>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                />
                {editForm.oldPhoto && !editForm.photo && (
                  <img
                    src={editForm.oldPhoto}
                    alt="Current"
                    className="w-24 h-24 mt-2 object-cover rounded-md border"
                  />
                )}
                {editForm.photo && (
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {editForm.photo.name}
                  </span>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditModal({ open: false, data: null });
                    setEditForm(null);
                  }}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={deleteModal.open}
        onCancel={() => setDeleteModal({ open: false, id: null, name: "" })}
        onConfirm={confirmDelete}
        itemName={deleteModal.name}
      />
    </motion.div>
  );
}
