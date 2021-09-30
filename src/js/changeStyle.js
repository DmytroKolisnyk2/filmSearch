export const themeStyles = {
  defaultTheme: {
    // name: 'default',
    '--headline-white': '#FEFFF1',
    '--aside-bg': '#4c4145',
    '--headline-bg': '#3a2f33',
    '--text-grey': '#C7C7C7',
    '--rating-color': '#fcd46b',
  },
  greenTheme: {
    // name: 'green',
    '--headline-white': '#023026',
    '--aside-bg': '#bad072',
    '--headline-bg': '#6e9a44',
    '--text-grey': '#023026',
    '--rating-color': '#3d9690',
  },
  pinkTheme: {
    // name: 'pink',
    '--headline-white': '#023026',
    '--aside-bg': '#f5a3b7',
    '--headline-bg': '#715f65',
    '--text-grey': '#023026',
    '--rating-color': '#fcd46b',
  },
  pinkGreenTheme: {
    // name: 'pink-green',
    '--headline-white': '#fee2e3',
    '--aside-bg': '#9db802',
    '--headline-bg': '#025b0e',
    '--text-grey': '#023026',
    '--rating-color': '#fd7c84',
  },
  yellowTheme: {
    // name: 'yellow',
    '--headline-white': '#023026',
    '--aside-bg': '#ddce6e',
    '--headline-bg': '#e9cb31',
    '--text-grey': '#023026',
    '--rating-color': '#676778',
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