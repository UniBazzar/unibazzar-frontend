import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import api from "../../redux/api/uniBazzarApi";
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

export default function MyServices() {
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
        setListings(res.data.student_services || []);
      })
      .catch(() => {
        setError("Failed to fetch services");
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleDelete = (id) => {
    setDeleteModal({
      open: true,
      id,
      name: listings.find((item) => item.id === id)?.name || "this service",
    });
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/services/student-services/${deleteModal.id}/`);
      setListings((prev) => prev.filter((item) => item.id !== deleteModal.id));
      toast.success("Service deleted.");
    } catch (err) {
      setError("Failed to delete service. Please try again.");
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
      photo: null, // We'll show the old photo, but new upload is optional
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
      toast.success("Service updated.");
      setEditModal({ open: false, data: null });
      setEditForm(null);
    } catch (err) {
      setError("Failed to update service. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-2 md:px-0"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200">
        My Services
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <CardContainer key={item.id} className="w-full">
            <CardBody className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-0 overflow-hidden border border-blue-100 dark:border-blue-900/40 relative group hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                {item.photo && (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-3xl border-b border-blue-100 dark:border-blue-900/40"
                  />
                )}
                {item.condition && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
                      item.condition === "New"
                        ? "bg-green-500/80 text-white"
                        : item.condition === "Like New"
                        ? "bg-blue-500/80 text-white"
                        : item.condition === "Used"
                        ? "bg-yellow-500/80 text-gray-900"
                        : "bg-gray-400/80 text-white"
                    }`}
                  >
                    {item.condition}
                  </span>
                )}
              </div>
              <CardItem className="p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-lg font-bold text-blue-900 dark:text-blue-200">
                  <Layers className="w-5 h-5 text-blue-400" />
                  {item.name}
                </div>
                <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                  <BadgeDollarSign className="w-4 h-4 text-green-500" />
                  {item.price} ETB
                </div>
                <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  {item.category?.name}
                </div>
                {item.university && (
                  <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                    <University className="w-4 h-4 text-indigo-500" />
                    {item.university}
                  </div>
                )}
                <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  {item.phone_number}
                </div>
                <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                  <Tag className="w-4 h-4 text-yellow-500" />
                  {item.tags}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </div>
              </CardItem>
              <div className="flex justify-between items-center px-5 pb-5 pt-2 gap-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 text-white font-semibold shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      {/* Edit Modal - same format as AddListing, autofilled */}
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
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                  style={{ cursor: "pointer" }}
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
