export default function Button({
  text,
  actionModel,
  className = "",
  style = "",
}) {
  return (
    <>
      <div className={style}>
        <button onClick={actionModel} className={className}>
          {text}
        </button>
      </div>
    </>
  );
}
