const BaseCard = ({ children, onClick = undefined, clickable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        clickable ? "cursor-pointer" : ""
      } overflow-hidden rounded-lg bg-white shadow`}
    >
      {children}
    </div>
  );
};

export default BaseCard;
