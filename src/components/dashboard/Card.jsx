/**
 * Card component for displaying content in a card layout
 */

export default function Card({ children, className = "", onClick }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

