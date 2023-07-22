import React, { useEffect } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import internationalisation from 'i18next'
import * as GlobalVariables from '../config/GlobalVariableContext'

internationalisation.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: require('./en.json'),
    hi: require('./hi.json'),
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const InternationalisationProvider = ({ children }) => {
  const Constants = GlobalVariables.useValues()

  useEffect(() => {
    // update languge
    internationalisation.changeLanguage(Constants['Language'])
  }, [Constants['Language']])

  return <I18nextProvider i18n={internationalisation}>{children}</I18nextProvider>
}

export default InternationalisationProvider
