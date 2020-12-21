import {useState} from 'react';
import './App.css';
let style = {
    littleSquares: {
      flex: "25%",
      boxShadow: "0px 0px 0px 0.5px white inset"
    }
}

function App() {
    let checkIfMathExpression = (e) => {//CHEQUEAR SI EL INPUT INGRESADO ES UNA EXPRESION MATEMATICA
        let array = ["*", "/", "+", "-"]
        for (let i = 0; i < array.length; i++) {
            if (e === array[i]) {
                return true
            }
        }
        return false
    }
    let inputCheck = (value)=>{
      console.log(value + "THERE IS A MATH EXPRESSION AND A NUMBER")
      if (isNaN(value) && checkIfMathExpression(value.slice(value.length - 1)) === true && isNaN(value.slice(0, -1)) === false) {
        //SI EL ULTIMO CARACTER AGREGADO ES UNA EXPRESION MATEMATICA ENTONCES APLICA LA FUNCION SOLVEMATH
        //EL SLICE ES PARA CHEQUEAR QUE ANTES DE LA EXPRESION HAY UN NUMERO VALIDO PARA REALIZAR LA OPERACION Y TAMBIEN PARA VERIFICAR SI ES UNA EXPRESION
        //MATEMATICA O NO
        console.log(value + "THERE IS A MATH EXPRESSION AND A NUMBER")
          setMathOperation(value.slice(value.length - 1));
          solveMath(value.slice(0, -1));
      } 
      else if (isNaN(value) && checkIfMathExpression(value) === false && value.length > 0) {
         // EN CASO DE QUE EL CARACTER INGRESADO NO SEA UNA EXPRESION MATEMATICA SE HACE DISPLAY DEL MENSAJE DE ERROR Y
         // SE ELIMINAN LOS VALORES GUARDADOS DE LA OPERACION ANTERIOR
         console.log(value + "THERE ISNT A MATH EXPRESSION BUT THERE IS A NUMBER")
          setValue("");
          setMathOperation("");
          setInput("");
          setMessage("La calculadora sólo acepta números y símbolos matematicos!")
      }
      else{
        console.log(value + "NOTHING")
          setInput(value);
          setMessage("")
      }
    }
    const [input,
        setInput] = useState(0)//INPUT DEL USUARIO
    const [message,
        setMessage] = useState("")// MENSAJE DE ERROR EN CASO QUE SE INGRESE UN VALOR NO PERMITIDO
    const [mathOperation,
        setMathOperation] = useState(null)//TIPO DE OPERACION MATEMATICA GUARDADA LUEGO DE INGRESARLA PARA APLICARLA AL INGRESAR OTRO NUMERO
    const [savedValue,
        setValue] = useState("")//VALOR GUARDADO LUEGO DE INGRESAR UNA EXPRESION MATEMATICA PARA LUEGO APLICARLA EN LA FUNCION SOLVEMATH()
    let solveMath = (passedValue) => {
        if (mathOperation !== "" && savedValue !== "") {// EN EL CASO DE QUE HAYA UN VALOR GUARDADO Y HAYA UNA EXPRESION MATEMATICA, SE REALIZA EL CALCULO
            switch (mathOperation) {
                case "-":
                    setInput((parseInt(savedValue) - parseInt(passedValue)));
                    setMathOperation("");
                    break
                case "+":
                    setInput((parseInt(savedValue) + parseInt(passedValue)));
                    setMathOperation("");
                    break
                case "/":
                    setInput((parseInt(savedValue) / parseInt(passedValue)));
                    setMathOperation("");
                    break
                case "*":
                    setInput((parseInt(savedValue) * parseInt(passedValue)));
                    console.log("SADSD");
                    setMathOperation("");
                    break
                default:
                    console.log("error")
            }
        } else {
            setValue(passedValue)
            setInput("")
        }
    }
    return (
        <div className="App">
            <div>
                <div>
                    <input
                        onChange={(e) => inputCheck(e.currentTarget.value)}
                    // AL APRETAR ENTER SE RESUELVE LA OPERACION
                        onKeyDown={(e) => e.key === "Enter" 
                        ? solveMath(e.currentTarget.value)
                        : null}
                        style={{textAlign: "right"}}
                        value={input}/>
                    <div>{message}</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{flex:"75%", boxShadow: "0px 0px 0px 0.5px white inset"}} onClick={()=>{setValue("");setMathOperation(""); setInput("")}}>C</div>
                    <div style={{flex:"25%", boxShadow: "0px 0px 0px 0.5px white inset"}} onClick={()=>inputCheck(input + "/")}>%</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "7"), 10)/*REMOVER EL 0 INICIAL AL INGRESAR UN VALOR NUEVO*/}>7</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "8"), 10)}>8</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "9"), 10)}>9</div>
                    <div style={style.littleSquares} onClick={()=>inputCheck(input + "*")}>X</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "4"), 10)}>4</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "5"), 10)}>5</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "6"), 10)}>6</div>
                    <div style={style.littleSquares} onClick={()=>inputCheck(input + "-")}>-</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "1"), 10)}>1</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "2"), 10)}>2</div>
                    <div style={style.littleSquares} onClick={()=>setInput(parseInt(input + "3"), 10)}>3</div>
                    <div style={style.littleSquares} onClick={()=>inputCheck(input + "+")}>+</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{flex:"75%", boxShadow: "0px 0px 0px 0.5px white inset"}} onClick={()=>setInput(input + "0")}>0</div>
                    <div style={{flex:"25%", boxShadow: "0px 0px 0px 0.5px white inset"}} onClick={()=>solveMath(input)}>=</div>
                </div>
            </div>
        </div>
    );
}

export default App;
