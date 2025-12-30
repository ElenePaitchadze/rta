// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig";

// export function middleware(request) {
//     return i18nRouter(request, i18nConfig);
// }

// export const config = {
//     matcher: '/((?!api|static|.*\\..*|_next).*)'
// }

import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request) {
    const url = new URL(request.url);
    const locale = url.searchParams.get('lang') || request.cookies.get('NEXT_LOCALE') || i18nConfig.defaultLocale;

    if (!request.cookies.get('NEXT_LOCALE')) {
        request.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    }

    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
};
