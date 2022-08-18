import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        ContentBgColor: string;
        btnColor: string;
        btnTextColor: string;
        btnHoverColor: string;
        textColor: string;
        accentColor: string;
    }
}
