export function InputBox({ label, ...props }) {
    return (
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium mb-1">{label}</label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          {...props}
        />
      </div>
    );
  }
  