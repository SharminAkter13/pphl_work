const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  const types = {
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return (
    <div className={`border-l-4 p-4 ${types[type]} ${className}`}>
      <p>{message}</p>
      {onClose && <button onClick={onClose} className="float-right">×</button>}
    </div>
  );
};
export default Alert;