import React from 'react';

export interface ThemeType {
	color:string;
	backgroundColor:string;
}

export const themes = {
	light:{
		color:"#000000",
		backgroundColor:"#d3d3d3"
	},
	dark:{
		color:"#FFFFFF",
		backgroundColor:"#595959"
	}
}

const ThemeContext = React.createContext<ThemeType>(themes.dark);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;