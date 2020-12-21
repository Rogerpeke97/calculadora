import { useState } from 'react';
import './App.css';
let style = {
  app: {

  }
}

function App() {
  const [input, setInput] = useState(0)
  return (
    <div className="App">
     <div>
       <div>
         <input onChange={(e)=>{
           isNaN(e.currentTarget.value) ? setInput(0) : setInput(e.currentTarget.value)
           }} value={input} />
       </div>
       <div style={{display: "flex"}}>
         <div>C</div>
         <div>%</div>
       </div>
       <div style={{display: "flex"}}>
         <div>7</div>
         <div>8</div>
         <div>9</div>
         <div>X</div>
       </div>
       <div style={{display: "flex"}}>
         <div>4</div>
         <div>5</div>
         <div>6</div>
         <div>-</div>
       </div> 
       <div style={{display: "flex"}}>
         <div>1</div>
         <div>2</div>
         <div>3</div>
         <div>+</div>
       </div>
       <div style={{display: "flex"}}>
         <div>0</div>
         <div>=</div>
       </div>
     </div>
    </div>
  );
}

export default App;
