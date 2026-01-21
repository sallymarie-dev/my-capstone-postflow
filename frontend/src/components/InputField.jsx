export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <>
      {label && (
        <label>
          <h3>{label}:</h3>
        </label>
      )}
      <input
        className="name-box"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
