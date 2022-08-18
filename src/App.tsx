import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./atoms";
import { reset } from "styled-reset";
import "./fonts/font.css";
const GlobalStyled = createGlobalStyle`
    ${reset}
    
    h1{
        font-family: "SebangBold";
    }
    * {
        font-family: "Sebang";
        box-sizing: border-box;
    }
    body {
        font-family: "Sebang";
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
    }
    a{
        text-decoration: none;
    }
    button {
        background-color: ${(props) => props.theme.btnColor};
        color:${(props) => props.theme.btnTextColor};
        border-radius: 10px;
        border: none;
        padding: 10px 20px;
        outline: none;
        transition:color 0.4s ease;
        transition:background-color 0.4s ease;
        &:hover{
            background-color: ${(props) => props.theme.btnHoverColor};
            color:white;
            cursor:pointer;
        }
    }
`;
function App() {
    const isDark = useRecoilValue(isDarkState);
    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <GlobalStyled />
                <Router />
                <ReactQueryDevtools />
            </ThemeProvider>
        </>
    );
}

export default App;
