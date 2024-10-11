'use client';

import { motion } from 'framer-motion';

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="max-w-md rounded-lg p-6 text-sm text-muted-foreground shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-4 text-2xl font-bold text-white">
          Unauthorized Access
        </h1>
        <p className="mb-6">
          You are not authorized to navigate to this page as you don't have the
          necessary permissions.
        </p>

        <motion.a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-white transition duration-300 hover:bg-primary-700"
          whileHover={{ scale: 1.05 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  );
}
