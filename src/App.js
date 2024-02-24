import { useState } from "react";
import MyToggle from "./Components/Switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaClipboardList } from "react-icons/fa";
import { upperCaseLetters, lowerCaseLetters,numbers, specialCharacters } from "./Utils/Character";

function App() {
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(8)
    const [includeUpperCase, setIncludeUpperCase] = useState(false)
    const [includeLowerCase, setIncludeLowerCase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbol, setIncludeSymbol] = useState(false)

    const handelPasswordLength = (e) => {
        setPasswordLength(e.target.value);
    }

     const handleGeneratePassword = () => {
          if(!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbol){
              handleNotif("Please select at least one to generate a password",true)
          }else{
               let characterList = ''

              if(includeUpperCase)
                 characterList = characterList + upperCaseLetters
                
              if(includeLowerCase)
                 characterList = characterList + lowerCaseLetters
                
              if(includeNumbers)
                characterList = characterList + numbers
            
              if(includeSymbol)
                 characterList = characterList + specialCharacters

            setPassword(createPassword(characterList))
             handleNotif("Password is generated successfully", false)
          }
     }

     const createPassword = (characterList) => {
        let password = ""

        const characterListLength = characterList.length
        for (let i = 0; i < passwordLength; i++) {
          const characterIndex = Math.round(Math.random() * characterListLength)
          password = password + characterList.charAt(characterIndex)
        }
        return password
      }

      const handleNotif = (message , hasError) => {

        if(hasError) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }else{
            toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
      }

      const copyToClipboard = (password) => {

        navigator.clipboard.writeText(password)
      }

      const handleCopyPassword = () => {
        if (password === "") {
          handleNotif("Failed to copy password. Please try again", true)
        }
        else {
          copyToClipboard(password)
          handleNotif("Password successfully copied to clipboard", false)
        }
      }
    

  return (
     <>
      <div className="h-screen flex justify-center items-center">
         <div className="h-[470px] w-[300px] text-white bg-primary rounded-lg p-4">
            <div className=" h-[360px] p-1">

              <div className="flex flex-col">
                <h1>Password Generator</h1>
                <div className="flex h-12 bg-slate-600 p-4 rounded-md justify-center items-center my-2 relative">
                    <span className="text-[12px]">{password === '' ? 'CLICK GENERATE' : password}</span>
                    {password && (
                        <button className="absolute right-5" onClick={handleCopyPassword}><FaClipboardList/></button>
                    )}
                </div>
                <div className="text-[10px] m-1 text-[#b3b3b3]">Length : <span className="text-white">{passwordLength}</span></div> 
                <div className="h-10 bg-slate-600 p-2 rounded-md mb-2 flex justify-evenly items-center text-[13wpx]">
                        <span>8</span>
                        <input  className="w-[180px] h-[5px] bg-[#2ecc71]"
                                onChange={handelPasswordLength} min={8} max={28} type="range"/>
                        <span>28</span>
                 </div>
              </div>    
                
             <div className="text-[10px] m-1 text-[#b3b3b3]">Settings</div> 
              <div className="flex flex-col gap-2 text-sm">
                   <div className="flex justify-between items-center h-11 bg-slate-600 rounded-md px-3">
                        <label>Include UpperCase Letters</ label>
                        <MyToggle enabled={includeUpperCase} setEnabled={setIncludeUpperCase}/>
                    </div>
                    <div className="flex justify-between items-center h-11 bg-slate-600 rounded-md px-3">
                        <label>Include LowerCase letters</label>
                        <MyToggle enabled={includeLowerCase} setEnabled={setIncludeLowerCase}/>
                    </div>
                    <div className="flex justify-between items-center h-11 bg-slate-600 rounded-md px-3">
                        <label>Include Numbers</ label>
                        <MyToggle enabled={includeNumbers} setEnabled={setIncludeNumbers}/>
                    </div>
                    <div className="flex justify-between items-center h-11 bg-slate-600 rounded-md px-3">
                        <label>Include Symbols</label>
                        <MyToggle enabled={includeSymbol} setEnabled={setIncludeSymbol}/>
                    </div>

                    <button className="bg-secondary rounded-lg py-2 px-3 mt-2"
                       onClick={handleGeneratePassword}>Generate Password</button>
                    <ToastContainer />
              </div>
            </div>
         </div>
      </div>
     </>
  );  
}

export default App;
