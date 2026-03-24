'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function SectionWrapper({ id, children, className = '' }: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-20 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
