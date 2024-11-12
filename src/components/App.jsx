import WebApp from '@twa-dev/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';

import { routes } from '@/navigation/routes.jsx';
import { UserContext } from '@/contexts/UserContext';
import { Navbar } from './NavBar';
import * as amplitude from '@amplitude/analytics-browser';
import { useContext } from 'react';

import { saveSource } from '@/Utils/thinkificAPI';

amplitude.init('f926c299b1144dfdd6fa169502f4ac25', {"autocapture":true});


/**
 * @return {JSX.Element}
 */
export function App() {
  const { i18n } = useTranslation();

  const {setInitData, setUser }= useContext(UserContext);
  useEffect(() => {
   

    const initializeTelegramWebApp = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.isSwipeBackEnabled = false;
        window.Telegram.WebApp.isClosingConfirmationEnabled = true; 

        const webAppData = window.Telegram.WebApp.initDataUnsafe;
        const user = webAppData.user;
        const urlParams = new URLSearchParams(window.location.search);
        const startappParams = urlParams.get("tgWebAppStartParam");
        
        if (user) {
          setUser(user);
          console.log(user)
          setInitData(window.Telegram.WebApp.initData)

         amplitude.setUserId(user.username && user.username !== "" ? user.username : user.id);

          const open_mini_app = {
            tg_id: user.id,
            utm_source: startappParams || null,
            username: user.first_name
          };
          amplitude.track("open_mini_app", open_mini_app);

          const userLanguage = user.language_code || 'en';
          i18n.changeLanguage(userLanguage);
        } else {
          const defaultUser = {
            username: "bogdan_krvsk",
            first_name: "Bogdan",
            last_name: "",
            id: 874423521,
            is_premium: true,
          };
          setUser(defaultUser);
        }
        if (startappParams) {
          console.log(startappParams)
          await saveSource(user.id,startappParams)
        }

      }
    };
    initializeTelegramWebApp();
  }, [setUser]);
  
const platform = WebApp.platform;
  const appearance = WebApp.colorScheme;
  return (
    <TwaAnalyticsProvider
    projectId='1969396f-f993-424a-8722-cc7c113ba344'
    apiKey='fa02b287-e0b3-48aa-b7b5-cce24d05d72f'
    appName='tmtr'
>
    <AppRoot
      appearance={appearance}
      platform={
        platform === 'android'
          ? 'android'
          : platform === 'desktop'
          ? 'desktop'
          : ['macos', 'ios'].includes(platform)
          ? 'ios'
          : 'base'
      }
    >
      <BrowserRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
         
        </Routes>
        <Navbar/>
      </BrowserRouter>
      
    </AppRoot>
    </TwaAnalyticsProvider>
  );
}
