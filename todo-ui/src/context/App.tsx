import React from 'react';
import { IAppContext, ThemeMode } from 'src/type';

export const AppContext = React.createContext<IAppContext>({mode: 'light'})

export const useApp = () => React.useContext<IAppContext>(AppContext)


export default function AppProvider({children}: {children: React.FC|JSX.Element}){

    const [mode, setMode] = React.useState<ThemeMode>('light')

    /**
     * Change theme mode
     */
    const onChangeMode = () => {
        if(mode === 'light'){
            setMode('dark')
        }else {
            setMode('light')
        }
    }

    const value = React.useMemo<IAppContext>(() => ({
        mode,
        onChangeMode
    }), [mode])


    return <AppContext.Provider value={value}>
        <div className={`App-Container ${mode === 'dark' && 'App-Container-Dark'}`}>
        {children}

        </div>
    </AppContext.Provider>
}