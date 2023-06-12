import React from 'react';

export const themes = {
	light:{
		color:"#000000",
		backgroundColor:"#d3d3d3"
	},
	dark:{
		color:"#ffffff",
		backgroundColor:"#595959"
	}
}

export const ThemeContext = React.createContext(themes.dark);

ThemeContext.displayName = "ThemeContext";