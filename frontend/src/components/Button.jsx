export function Button({ label, onClick, disabled }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {label}
      </button>
    );
  }
  