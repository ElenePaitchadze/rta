import { StaticImageData } from "next/image";

export interface Info {
    id: string,
    image: StaticImageData, 
    date: string, 
    title: string, 
    description: string, 
}