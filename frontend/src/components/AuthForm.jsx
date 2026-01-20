export default function AuthForm({
  title,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <>
      {title && <h1>{title}</h1>}
      <form onSubmit={onSubmit} className="container">
        {children}
        <br />
        <button className="btn">{buttonText}</button>
      </form>
    </>
  );
}
