import { ReactNode, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext([
  'dark',
  () => {
    console.log('Provider not found');
  },
] as [string, () => void]);

export const MobileContext = createContext([
  'desktop',
  () => {
    console.log('Provider not found');
  },
] as [string, () => void]);

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
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function MobileContextProvider(props: IThemeContext) {
  const { children } = props;

  const [mobile, setMobile] = useState('desktop');

  const toggleMobile = () => {
    setMobile((prev) => (prev === 'mobile' ? 'desktop' : 'mobile'));
  };

  return (
    <MobileContext.Provider value={[mobile, toggleMobile]}>
      {children}
    </MobileContext.Provider>
  );
}
