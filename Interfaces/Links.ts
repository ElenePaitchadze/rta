import { StaticImageData } from "next/image";

export default interface Links {
    icon: StaticImageData,
    text: string,
    href: string, 
    target?: string,
}