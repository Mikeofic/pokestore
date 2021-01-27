import { createGlobalStyle } from 'styled-components';

export const widthContainer = `
  margin: 0 auto;
  max-width: 1130px;
  width: 100%;
  padding: 0 15px;

  @media (max-width: 767px) {
    max-width: 1120px;
    padding: 0 10px;
  }
`;

export default createGlobalStyle`

  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  /* APP STYLE */
  html {
    font-size: 62.5%;
  }

  *, p {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background-color: white;
  }

  a {
    text-decoration: none;
  }

  #root {
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button:focus,
  button:hover{
    cursor: pointer;
  }

  input {
    background-color: transparent;
    border: 0;
  }

  button {
    background-color: transparent;
    border: 0;
  }

  /* Remove arrows from input number tags on Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove arrows from input number tags on Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  @media (min-width: 768px) and (max-width: 1149px){
    html {
      font-size: 55%;
    }
  }

  body.no-scroll-on-mobile{
    @media(max-width: 767px){
      overflow: hidden;
    }
  }

  /* Removing highlight on tap on android devices */
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }


  /* VARIÁVEIS */
  html{
    --header-color: #e60014;
    --light-text-color: #f95656;
    --button-icon-color: red;
    --button-active-background-color: #ff6a6a;
    --button-border-color: #ff8686;
    --button-border-color-light: #ffaeae;
    --button-filled-background-color: #ff3838;
    --default-color-lightest: #ffdfdf;
    --default-color-ever-lightest: #ffefef;
    --default-color-darkest: #790101;
    --default-color-darkest-transparent: rgba(113, 22, 22, 0.22);
    --logo-focus-color: rgb(160, 0, 14);
    --logo-focus-color-lighter: rgb(193, 0, 0);
    --button-box-shadow-color: rgba(236, 0, 0, 0.7);
    --button-hover-outline-color: rgba(255, 0, 0, 0.19);

    &.agua{
      --header-color: #00ade6;
      --light-text-color: #5699f9;
      --button-icon-color: #0079ff;
      --button-active-background-color: #7ca4e8;
      --button-border-color: #86b3ff;
      --button-border-color-light: #aed5ff;
      --button-filled-background-color: #3879ff;
      --default-color-lightest: #dfe8ff;
      --default-color-ever-lightest: #ebf0ff;
      --default-color-darkest: #014479;
      --default-color-darkest-transparent: rgba(0, 44, 144, 0.21);
      --logo-focus-color: rgb(0, 128, 169);
      --logo-focus-color-lighter: rgb(13, 138, 179);
      --button-box-shadow-color: rgba(0, 84, 236, 0.7);
      --button-hover-outline-color: rgba(0, 78, 255, 0.21);
    }

    &.grama{
      --header-color: #08bd00;
      --light-text-color: #25ce1e;
      --button-icon-color: #0fa500;
      --button-active-background-color: #31c32a;
      --button-border-color: #09d800;
      --button-border-color-light: #27da1f;
      --button-filled-background-color: #08b300;
      --default-color-lightest: #c4f9cb;
      --default-color-ever-lightest: #ddffe1;
      --default-color-darkest: #045600;
      --default-color-darkest-transparent: rgba(0, 80, 6, 0.19);
      --logo-focus-color: rgb(9, 125, 0);
      --logo-focus-color-lighter: rgb(6,132,0);
      --button-box-shadow-color: rgba(0, 142, 4, 0.7);
    --button-hover-outline-color: rgba(0, 146, 11, 0.19);
    }

    &.eletrico{
      --header-color: #f1c000;
      --light-text-color: #eaba37;
      --button-icon-color: #d29602;
      --button-active-background-color: #ffca6a;
      --button-border-color: #ffbe18;
      --button-border-color-light: #ffd15a;
      --button-filled-background-color: #d09000;
      --default-color-lightest: #ffefb2;
      --default-color-ever-lightest: #ffefef;
      --default-color-darkest: #633e00;
      --default-color-darkest-transparent: rgba(113, 85, 22, 0.22);
      --logo-focus-color: rgb(160, 124, 0);
      --logo-focus-color-lighter: rgb(193, 156, 0);
      --button-box-shadow-color: rgba(236, 163, 0, 0.7);
      --button-hover-outline-color: rgba(125, 92, 0, 0.22);
    }
  }

`;
