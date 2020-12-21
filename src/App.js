import {useState} from 'react';
import './App.css';
let style = {
    app: {}
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
                    setValue("");
                    setMathOperation("");
                    break
                case "+":
                    setInput((parseInt(savedValue) + parseInt(passedValue)));
                    setValue("");
                    setMathOperation("");
                    break
                case "/":
                    setInput((parseInt(savedValue) / parseInt(passedValue)));
                    setValue("");
                    setMathOperation("");
                    break
                case "*":
                    setInput((parseInt(savedValue) * parseInt(passedValue)));
                    console.log("SADSD");
                    setValue("");
                    setMathOperation("");
                    break
                default:
                    console.log("error")
            }
            setValue("");
            setMathOperation("");
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
                        onChange={(e) => {
                        let value = e.currentTarget.value;
                        if (isNaN(value) && checkIfMathExpression(value.slice(value.length - 1)) === true && isNaN(value.slice(0, -1)) === false) {
                          //SI EL ULTIMO CARACTER AGREGADO ES UNA EXPRESION MATEMATICA ENTONCES APLICA LA FUNCION SOLVEMATH
                          //EL SLICE ES PARA CHEQUEAR QUE ANTES DE LA EXPRESION HAY UN NUMERO VALIDO PARA REALIZAR LA OPERACION Y TAMBIEN PARA VERIFICAR SI ES UNA EXPRESION
                          //MATEMATICA O NO
                            setMathOperation(value.slice(value.length - 1));
                            solveMath(value.slice(0, -1));
                        } 
                        else if (isNaN(value) && checkIfMathExpression(value) === false && value.length > 0) {
                           // EN CASO DE QUE EL CARACTER INGRESADO NO SEA UNA EXPRESION MATEMATICA SE HACE DISPLAY DEL MENSAJE DE ERROR Y
                           // SE ELIMINAN LOS VALORES GUARDADOS DE LA OPERACION ANTERIOR
                            setValue("");
                            setMathOperation("");
                            setInput("");
                            setMessage("La calculadora sólo acepta números y símbolos matematicos!")
                        }
                        else{
                            setInput(value);
                            setMessage("")
                        }
                    }}
                    // AL APRETAR ENTER SE RESUELVE LA OPERACION
                        onKeyDown={(e) => e.key === "Enter" 
                        ? solveMath(e.currentTarget.value)
                        : null}
                        value={input}/>
                    <div>{message}</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div>C</div>
                    <div>%</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>X</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>-</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>+</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div>0</div>
                    <div>=</div>
                </div>
            </div>
        </div>
    );
}

export default App;
