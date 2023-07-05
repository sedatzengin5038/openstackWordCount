import { useState, useRef  } from "react"
import "./App.css";
function App() {
  const [value, setValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const fileInputRef = useRef(null);
  async function handleFileChange() {
    const selectedFile = fileInputRef.current.files[0];
    
    if (!selectedFile) {
      return; // No file selected
    }
  
    try {
      const fileContent = await readFileAsync(selectedFile);
     
      setTextValue(fileContent);
    } catch (error) {
      console.error("Error reading the file:", error);
    }
  }
  
  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
  
  const [count, setCount] = useState(0)
  
  const onSubmitCount = ()=>{
    let newValue = value.trim().split(" ")
    newValue = newValue.filter(myvalue =>myvalue!="")
    let newTextValue = textValue.trim().split(" ")
    newTextValue = newTextValue.filter(myvalue =>myvalue!="")
    const myLength = newValue.length + newTextValue.length
    setCount(myLength)
  }
  const handleCount = (event)=>{
    
    let value = event.target.value;
    setValue(value)
  }
  return (
    <div className="App">
      <div className="input-container">
        <input type="text" onChange={handleCount} placeholder="Enter text" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <button onClick={onSubmitCount}>Count</button>
      </div>
      <div className="result-container">
        <h1>{count === 0 ? "" : count}</h1>
      </div>
    </div>
  );
}

export default App;