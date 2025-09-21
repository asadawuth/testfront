export default function FormInput({ onSubmit, className = "", children }) {
  return (
    <>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
}
