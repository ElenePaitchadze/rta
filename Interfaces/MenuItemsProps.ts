import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface MenuItem {
    cat_id: string;
    name: Languages;
    slug: string;
    structure: string;
    children: MenuItem[];
    icon?: StaticImport | string;
}

interface Languages {
    geo: string, 
    eng: string,
}