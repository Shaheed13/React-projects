import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(20)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    } 

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  return (
    <>
     <div className="container-md box mt-4 ">

   
    
<h1 className='d-flex justify-content-center'>PASSWORD GENERATOR</h1>
<div class="input-group mb-3 pass mt-4">
<input type="text" class="form-control  " placeholder="password" value={password}  readOnly ref={passwordRef}/>
<div class="button">
<button  class="btn btn-outline-2" type="button" id="button-addon2"  onClick={copyPasswordToClipboard}>copy</button>
</div>
</div>
<div className="row">
<div className="col-5">
<form>
<div class="form-group">
<input type="range" class="form-range range cursor-pointer" min="8" max="100" id="customRange2" value={length} onChange={(e) => {setLength(e.target.value)}} />
<label for="customRange2" class="form-label len">LENGTH: {length}</label>
</div>

</form>
</div>
<div className="col-3">
<div class="form-check">
<input class="form-check-input" type="checkbox"  id="numberInput" defaultChecked={numberAllowed}  onChange={() => {
setNumberAllowed((prev) => !prev);
}} />
<label class="form-check-label" for="flexCheckDefault">
Numbers
</label>
</div>

</div>
<div className="col-4">
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="characterInput" defaultChecked={charAllowed} onChange={() => {
setCharAllowed((prev) => !prev )
}} />
<label class="form-check-label" htmlFor="characterInput">
characters
</label>
</div>

</div>
</div>



    
</div>
    </>
  )
}

export default App
