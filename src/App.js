import {useState, useRef, useEffect} from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faChild, faDiagnoses, faTrophy, faSignOutAlt, faMouse } from '@fortawesome/free-solid-svg-icons'


let style = {
    littleSquares: {
      flex: "25%",
      boxShadow: "0 12px gray",
      background: "linear-gradient(-45deg, rgba(0,0,0,0.22), brown)",
      transition: 'all 0.2s ease-out',
      borderRadius: "15px",
      marginTop: "13px",
      cursor: "pointer",
      marginLeft: "11px",
      marginRight: "11px"
    },
    calculadoraContainer:{
        background: "linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(200,90,100,0.25))",
        paddingBottom:"20px",
        borderRadius: "20px",
        boxShadow: "6px 6px 6px 0px rgb(70, 70, 70), 15px 15px 16px 0px #000000",
        display: "grid",
        minHeight:"400px",
        maxHeight:"400px",
        minWidth:"320px",
        maxWidth:"320px",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 2px black",
        position: "relative"
    },
    topBottomButtons:{
        flex:"25%",
        cursor: "pointer",
        background: "linear-gradient(-45deg, rgba(0,0,0,0.22), brown)", 
        borderRadius: "15px",
        boxShadow: "0 12px gray",
        marginTop: "13px",
        marginLeft: "17px",
        marginRight: "11px",
        marginBottom: "11px"
    },
    largeButtons: {
        flex:"87%",
        cursor: "pointer",
        boxShadow: "0 12px gray",
        marginTop: "13px",
        marginBottom: "5px",
        marginLeft: "11px",
        marginRight: "7px",
        borderRadius: "15px",
        background: "linear-gradient(-45deg, rgba(0,0,0,0.22), brown)", 
    },
    input:{
        textAlign: "right",
        display: "grid",
        backgroundColor: "black",
        borderRadius: "15px",
        boxShadow: "2.5px 2.5px 3px 0px #000000",
        color: "white",
        width: "314px",
        height: "50px",
        marginBottom: "5%",
        border: "0px",
        fontSize: "1.3rem",
        marginTop: "5%",
        outline: "none",
        appereance: "none"
    },
    fontAwesomeDrag: {
        color: "white",
        cursor: "grab",
        transition: "all 0.5s ease-out",

    },
    fontAwesomeDragGrab: {
        color: "black",
        cursor: "grabbing"
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

    // AÑADIR NUMEROS PARA EL INPUT MANUAL 
    let addNumbersManual = (numero)=>{
        if(input.toString().length === 20){
        setInput(input);
        }
        else{
            setInput(parseInt(input + numero), 10);
        }
    }


    let inputCheck = (value)=>{
      if (isNaN(value) && checkIfMathExpression(value) === true) {
        //SI EL ULTIMO CARACTER AGREGADO ES UNA EXPRESION MATEMATICA ENTONCES APLICA LA FUNCION SOLVEMATH
        //EL SLICE ES PARA CHEQUEAR QUE ANTES DE LA EXPRESION HAY UN NUMERO VALIDO PARA REALIZAR LA OPERACION Y TAMBIEN PARA VERIFICAR SI ES UNA EXPRESION
        //MATEMATICA O NO
          setMathOperation(value);
          solveMath(input);
      } 
      else if (isNaN(value) && checkIfMathExpression(value) === false) {
         // EN CASO DE QUE EL CARACTER INGRESADO NO SEA UNA EXPRESION MATEMATICA SE HACE DISPLAY DEL MENSAJE DE ERROR Y
         // SE ELIMINAN LOS VALORES GUARDADOS DE LA OPERACION ANTERIOR
          setValue("");
          setMathOperation("");
          setInput("");
          setMessage("La calculadora sólo acepta números y símbolos matematicos!")
      }
      else{
          addNumbersManual(value);
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


    const focusInput = useRef(0);// PARA QUE CUANDO EL FOCUS DEL INPUT SE PIERDE SE VUELVA A ACTIVAR, ASI LA CALCULADORA ES INTERACTIVA CON EL TECLADO


    let solveMath = (passedValue) => {// RESUELVE EL CALCULO DEPENDIENDO LA EXPRESION
        if (mathOperation !== "" && savedValue !== "") {// EN EL CASO DE QUE HAYA UN VALOR GUARDADO Y HAYA UNA EXPRESION MATEMATICA, SE REALIZA EL CALCULO
            switch (mathOperation) {
                case "-":
                    setInput(savedValue - parseInt(passedValue));
                    setMathOperation("");
                    break
                case "+":
                    setInput(savedValue + parseInt(passedValue));
                    setMathOperation("");
                    break
                case "/":
                    setInput(savedValue / parseInt(passedValue));
                    setMathOperation("");
                    break
                case "*":
                    setInput(savedValue * parseInt(passedValue));
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


    const[animationInProgress, setAnimation] = useState(false)// ANIMACION EN PROGRESO DEL BOTON


    let changeCssButton = (e)=>{// ANIMACION DEL BOTON
       let value = e.currentTarget;
       if(animationInProgress === false){
           value.style.animation = 'buttonTranslate 0.2s normal forwards ease-out' 
           value.onanimationend = ()=>{
               value.style.animation = 'none'
           }
       }
    }
//MOVER LA CALCULADORA ALREDEDOR DEL DIV APP, FUNCION ADAPTADA AL TUTORIAL DE JAVASCRIPT.INFO: https://javascript.info/mouse-drag-and-drop
const [isMoving, setMoving] = useState(false)
const app = useRef(0)
const calculator = useRef(0)
const [shiftX, setShiftX] = useState(0)
const [shiftY, setShiftY] = useState(0)
let onMouseDown = (e)=>{
    if(isMoving === false){
    setShiftX(e.clientX - calculator.current.getBoundingClientRect().left);
    setShiftY(e.clientY - calculator.current.getBoundingClientRect().top);
    setMoving(true)
    onMouseMove(e.pageX, e.pageY)
    }
}
let onMouseMove = (pageX, pageY)=>{
    if(isMoving === true){
    calculator.current.style.position = "absolute";
    calculator.current.style.zIndex = 1000;
    calculator.current.style.left = pageX - shiftX + 'px';
    calculator.current.style.top = pageY - shiftY + 'px';
    }
}
let mouseMoveTrigger = (e)=>{
    onMouseMove(e.pageX, e.pageY) // PAGE X Y PAGE Y CORRESPONDEN A LA UBICACION DEL MOUSE RESPECTO DEL BORDE IZQUIERDO DE LA PAG
}

//FONTAWESOME
const [iconState, setIconState] = useState(0)


//AÑADIR NUMEROS AL INPUT
// CUANDO LLEGA AL VALOR MAXIMO AL AGREGAR e CAMBIA EL LENGTH A 20
let addNumbers = (e, numero)=>{
    if(input.toString().length === 20){
    setInput(input);
    changeCssButton(e)
    }
    else{
        setInput(parseInt(input + numero), 10);
        changeCssButton(e)
    }
}

// MANEJAR WINDOW RESIZE 

  useEffect(()=>{
    window.addEventListener("resize", ()=>{
        calculator.current.style.position = "relative"
        calculator.current.style.left = "0px"
        calculator.current.style.top = "0px"
    })
  },[])

// ON MOUSEUP SE LEVANTA EL MOUSE Y UTILIZAMOS EL DIV PADRE PARA TRACKEAR EL MOVIMIENTO/ EVENTOS 
    return (
        <div className="App" ref={app} onMouseUp={()=>{setMoving(false); setIconState(0)}} onMouseMove={(e)=>mouseMoveTrigger(e)}>
            <div style={style.calculadoraContainer} ref={calculator} >
                <div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "25px"}}>
                    <FontAwesomeIcon style={iconState === 0 ? style.fontAwesomeDrag : style.fontAwesomeDragGrab} onMouseDown={(e)=>{onMouseDown(e); setIconState(1)}} icon={faMouse} />
                    </div>
                    <input
                        ref={focusInput}
                       // onChange={(e) => inputCheck(e.currentTarget.value)}
                    // AL APRETAR ENTER SE RESUELVE LA OPERACION
                        onKeyDown={(e) => e.key === "Enter" 
                        ? solveMath(e.currentTarget.value)
                        : inputCheck(e.key)}
                        onClick={()=>setInput("")}
                        style={style.input}
                        autoFocus= {true}// CUANDO CARGA PODES USAR EL TECLADO PARA HACER CALCULOS! HACE FOCUS EN EL INPUT
                        onBlur={()=>focusInput.current.focus()}
                        value={input}/>
                    <div>{message}</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.largeButtons} onClick={(e)=>{setValue("");setMathOperation(""); setInput(""); changeCssButton(e)}}>C</div>
                    <div style={style.topBottomButtons} onClick={(e)=>{inputCheck("/"); changeCssButton(e)}}>%</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "7")/*REMOVER EL 0 INICIAL AL INGRESAR UN VALOR NUEVO*/}>7</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "8")}>8</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "9")}>9</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>{inputCheck("*"); changeCssButton(e)}}>X</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "4")}>4</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "5")}>5</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "6")}>6</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>{inputCheck("-"); changeCssButton(e)}}>-</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "1")}>1</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "2")}>2</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "3")}>3</div>
                    <div style={style.littleSquares} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>{inputCheck("+"); changeCssButton(e)}}>+</div>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={style.largeButtons} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>addNumbers(e, "0")}>0</div>
                    <div style={style.topBottomButtons} onAnimationStart={()=>{setAnimation(true)}} onAnimationEnd={()=>setAnimation(false)} onClick={(e)=>{solveMath(input); changeCssButton(e)}}>=</div>
                </div>
            </div>
        </div>
    );
}

export default App;
