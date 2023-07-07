import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background: #ffffff;
  }

  .a11y-hidden {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
    }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;  
    padding: 0;
    margin: 0;
  }

  input {
    border: 0;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-green: #21BF48;
    --color-grey: #767676;
    --color-lightgrey: #f2f2f2;
    --color-maingrey: #C4C4C4;
    --color-darkgrey: #333333;
    --color-red: #EB5757;
  }
`;

export default GlobalStyle;
