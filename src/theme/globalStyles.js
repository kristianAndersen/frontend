import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle
`:root{
  --black:#000000;
  --white:255,255,255;
  --darkblue:47, 50, 63;
 --darkgreyblue: 47, 50, 63;
 --mediumdarkgrey: #3a3e52;
 --greyblue: #7A7F9B;
 --lightreyblue:163, 168, 197;
 --lightblue:#CDD2F0;
 --petrolium:40, 115, 149;
 --lightpetrolium:0, 183, 195;
 --turquoise:111, 250, 204;
 --fail:228, 111, 111;
 --radius:0.3rem
}
/* Box sizing rules */
*,
*::before,
*::after {
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}
html {
  font-size: 100%;
  -ms-text-size-adjust: 100%; 
  -webkit-text-size-adjust: 100%; 
  -webkit-font-smoothing: subpixel-antialiased;
  font-smoothing: subpixel-antialiased;

}
/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  line-height: 1.5;
  background-color:var( --darkblue);
  font-size: calc(1rem + (26 - 14) * ((100vw - 30rem) / (1600 - 300)));
  
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
  font-size: calc(0.3rem + (26 - 16) * ((100vw - 30rem) / (1600 - 300)));

}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}



h2,h3,h4,h5,p{
  font-family: "Roboto", sans-serif;
}
body > #root {
 background: linear-gradient(rgba( var(--darkblue) ,.9), rgba(var(--darkblue),.9)), url("/images/garrett-butler-unsplash.jpg");
 position: relative;
 display: block;
 width: 100%;
 height: 100vh;
 background-size: cover;    
 background-blend-mode:luminosity;
 background-repeat: no-repeat;
 background-color:rgba(var(--darkblue),1)
}
body{
  overflow:hidden;
}
`;
 
export default GlobalStyle;