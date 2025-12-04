import { useEffect, useState } from "react";
import PasswordGeneratorContainer from "./components/PasswordGeneratorContainer";
import PopupBox from "./components/PopupBox";

function App() {
  const [isPopupActive, setIsPopupActive] = useState(false); 

  useEffect(() => {
    if (isPopupActive) {
      setTimeout(() => {
        setIsPopupActive(false);
      }, 2000);
    }
  }, [isPopupActive]);

  return (
    <div className="w-full flex justify-center relative select-none">
      <PasswordGeneratorContainer setIsPopupActive={setIsPopupActive} />
      <PopupBox isPopupActive={isPopupActive} />
    </div>
  );
}

export default App;
