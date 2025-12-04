function PopupBox({ isPopupActive }) {
  return (
    <div
      className={`bg-gray-800 text-orange-500 absolute bottom-0 translate-y-[150%] px-6 py-3 rounded-lg ${
        isPopupActive ? "visible" : "hidden"
      }`}
    >
      Password copied to clipboard!
    </div>
  );
}

export default PopupBox;
