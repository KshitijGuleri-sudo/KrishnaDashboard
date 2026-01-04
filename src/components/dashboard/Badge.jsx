/**
 * Badge component for displaying status indicators
 * Supports different variants: processing, completed
 */

export default function Badge({ status, children }) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200";
  
  const variants = {
    processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };
  
  const variant = variants[status] || variants.default;
  
  return (
    <span className={`${baseClasses} ${variant}`}>
      {children || status}
    </span>
  );
}

