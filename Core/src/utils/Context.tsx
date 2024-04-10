import { ReactNode, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {
    console.log('Provider not found');
  },
});

interface IThemeContext {
  children: ReactNode | ReactNode[];
}

export function ThemeContextProvider(props: IThemeContext) {
  const { children } = props;

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') setTheme('light');
  }, []);

  useEffect(() => {
    const curDocumentTheme =
      document.documentElement.getAttribute('data-theme');

    if (theme !== curDocumentTheme) {
      document.documentElement.setAttribute('data-theme', theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
