import React from 'react';
import { useApp } from 'src/context/App';
import MoonIcon from './icon-moon.svg';
import SunIcon from './icon-sun.svg'


export const NightModeToggle = () => {
    const {mode, onChangeMode} = useApp()

    if(mode == 'dark') {
        return <img src={MoonIcon} alt="" onClick={onChangeMode}/>
    }

    return <img src={SunIcon} alt="" onClick={onChangeMode}/>
}