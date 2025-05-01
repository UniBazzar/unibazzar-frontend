// src/components/ui/3d-card.jsx
import { motion } from "framer-motion";

/**
 * Container that adds 3D tilt animation on hover
 */
export function CardContainer({ children, className = "" }) {
  return (
    <motion.div
      className={`relative w-full max-w-sm mx-auto cursor-pointer group ${className}`}
      whileHover={{ rotateX: 5, rotateY: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Main card body with padding and shadows
 * - Set to overflow-visible to allow hover elements to show outside
 */
export function CardBody({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-visible p-6 relative ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Inner content block with spacing
 */
export function CardItem({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}
