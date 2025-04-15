import { motion } from "framer-motion";

export default function TransactionModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[1000000000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <motion.div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Status Transaksi
          </h3>
          <p className="text-sm text-gray-500 mb-4">{message}</p>
          <p className="text-xs text-gray-400 mb-4">
            Modal ini akan tertutup otomatis dalam 2 menit
          </p>
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 