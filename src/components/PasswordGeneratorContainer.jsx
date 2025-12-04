import { useCallback, useEffect, useState } from "react";

function PasswordGeneratorContainer({ setIsPopupActive }) {
  const [length, setLength] = useState(8);
  const [isNumberIncluded, setIsNumberIncluded] = useState(false);
  const [isCharIncluded, setIsCharIncluded] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (isNumberIncluded) chars += "0123456789";
    if (isCharIncluded) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);

      pass += chars[randomIndex];
    }
    return pass;
  }, [length, isNumberIncluded, isCharIncluded]);

  const copyPassword = useCallback(() => {
    if (!password) return;
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(password).then(() => {
      setIsPopupActive(true);
      //   inputTag.select();
    });
  }, [password, setIsPopupActive]);

  useEffect(() => {
    // eslint-disable-next-line
    setPassword(generatePassword());
  }, [length, isNumberIncluded, isCharIncluded, generatePassword]);

  return (
    <div className="flex flex-col bg-gray-800 p-8 rounded-lg gap-6 mt-20 items-center">
      <h1 className="text-2xl">Password Generator</h1>
      <div className="grid grid-cols-[1fr_auto] w-full">
        <input
          className="bg-gray-200 rounded-l-lg p-2 outline-none text-orange-500 font-semibold cursor-default"
          type="text"
          value={password}
          readOnly
        />
        <button
          className="bg-blue-800 py-2 px-3 rounded-r-lg cursor-pointer hover:bg-blue-800/90"
          onClick={copyPassword}
        >
          copy
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-1 justify-center items-center">
          <input
            id="passwordRange"
            type="range"
            min="4"
            max="100"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-orange-500" htmlFor="passwordRange">
            Length: {length}
          </label>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <input
            className="size-4"
            type="checkbox"
            id="isNumberInput"
            checked={isNumberIncluded}
            onChange={() => setIsNumberIncluded(!isNumberIncluded)}
          />
          <label className="text-orange-500" htmlFor="isNumberInput">
            Numbers
          </label>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <input
            className="size-4"
            type="checkbox"
            id="isCharInput"
            checked={isCharIncluded}
            onChange={() => setIsCharIncluded(!isCharIncluded)}
          />
          <label className="text-orange-500" htmlFor="isCharInput">
            Characters
          </label>
        </div>
      </div>
      <button
        className="bg-blue-800 rounded-lg px-3 py-2 cursor-pointer"
        onClick={() => setPassword(generatePassword())}
      >
        Regenerate Password
      </button>
    </div>
  );
}

export default PasswordGeneratorContainer;
