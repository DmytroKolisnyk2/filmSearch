export const themeStyles = {
  defaultTheme: {
    // name: 'default',
    '--headline-white': '#FEFFF1',
    '--aside-bg': '#4c4145',
    '--headline-bg': '#3a2f33',
    '--text-grey': '#C7C7C7',
    '--rating-color': '#fcd46b',
    '--main-color':'#ededed'
  },
  greenTheme: {
    // name: 'green',
    '--headline-white': '#023026',
    '--aside-bg': '#bad072',
    '--headline-bg': '#6e9a44',
    '--text-grey': '#023026',
    '--rating-color': '#3d9690',
    '--main-color':'#ededed'
  },
  pinkTheme: {
    // name: 'pink',
    '--headline-white': '#023026',
    '--aside-bg': '#f5a3b7',
    '--headline-bg': '#715f65',
    '--text-grey': '#023026',
    '--rating-color': '#fcd46b',
    '--main-color':'#ededed'
  },
  pinkGreenTheme: {
    // name: 'pink-green',
    '--headline-white': '#fee2e3',
    '--aside-bg': '#9db802',
    '--headline-bg': '#025b0e',
    '--text-grey': '#023026',
    '--rating-color': '#fd7c84',
    '--main-color':'#ededed'
  },
  yellowTheme: {
    // name: 'yellow',
    '--headline-white': '#444444',
    '--aside-bg': '#fcd46b',
    '--headline-bg': '#ddce6e',
    '--text-grey': '#676778',
    '--rating-color': '#272933',
    '--main-color': '#d9d9c2'
  }, darkTheme: {
    // name: 'yellow',
    '--headline-white': '#dcdcdc',
    '--aside-bg': '#777',
    '--headline-bg': '#606060',
    '--text-grey': '#bbb',
    '--rating-color': '#fcd46b',
    '--main-color': '#333333'
  },
};

export const changeTheme = (theme) => {
  console.log(themeStyles[theme]);
  localStorage.setItem('theme', theme);
  // themeStyles.theme  
  for (const elem in themeStyles[theme]) {
    document.documentElement.style.setProperty(elem, themeStyles[theme][elem]);

  }
};