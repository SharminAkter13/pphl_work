const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`}>
    {title && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h3>}
    {children}
  </div>
);
export default Card;