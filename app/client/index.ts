import * as React from 'react'
import * as ReactDom from "react-dom";

const App:React = () => {
  return (
    <div>
      <p>Hello world!</p>
    </div>
  )
}



const ROOT =  document.getElementById('.app');

ReactDom.render(<h1>Hello World</h1>, ROOT);
