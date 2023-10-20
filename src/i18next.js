import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//languages
import en from "./languages/en.json"
import german from "./languages/german.json"
import french from "./languages/french.json"

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        }, 
        german: {
            translation: german
        },
        french: {
            translation: french
        }
    },
    lng: "en"
})

export default i18next