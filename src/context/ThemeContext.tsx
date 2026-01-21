import {
    createContext,useContext,useEffect,useState,
    type ReactNode
} from "react";

type Theme = 'light' | 'dark';

export interface ThemeContextProps{
    theme : Theme;
    toggleTheme : () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [theme,setTheme] = useState<Theme>('light');
    

    function toggleTheme(){
        setTheme((previous_theme) => {
            const new_theme = previous_theme === 'light' ? 'dark' : 'light';
            localStorage.setItem("theme",new_theme);

            return new_theme;
        });
    }

    return (<ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>);
}


function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        console.log("error in context");
    }
    return context;
}

export {ThemeProvider , useTheme}