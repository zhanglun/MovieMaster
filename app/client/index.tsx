import * as React from  'react';
import * as ReactDOM from "react-dom";

import { Hello } from './components/app';

ReactDOM.render(
  <div>
    <Hello compiler="TypeScript" framework="React" />,
    <h1>Hello</h1>
  </div>,
  document.getElementById("app")
);
