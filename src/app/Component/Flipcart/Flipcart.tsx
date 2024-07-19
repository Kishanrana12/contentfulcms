import client from "@/config/contentful";
import Image from "next/image";

interface LogoFields {
    file: {
        url: string;
    };
}

interface Flipcart2Entry {
    fields: {
        title: string;
        logo?: {
            fields: LogoFields;
        } | null; // Ensure that logo can be null
    };
}

const fetchHeader = async (): Promise<Flipcart2Entry[]> => {
    try {
        const data = await client.getEntries({
            'content_type': 'flipcart2'
        });
        return data.items as any as Flipcart2Entry[];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const prependProtocol = (url: string): string => {
    if (url.startsWith('//')) {
        return `https:${url}`;
    }
    return url;
};

export default async function Flipcart2() {
    const datatwo = await fetchHeader();

    return (
        <div>
            {datatwo.map((datas, index) => {
                const logoUrl = datas.fields.logo?.fields.file.url;
                
                return (
                    <div key={index}>
                        <div>Title: {datas.fields.title}</div>
                        {logoUrl && (
                            <Image 
                                src={prependProtocol(logoUrl)} 
                                alt={datas.fields.title} 
                                width={500} 
                                height={500} 
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
