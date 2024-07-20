"use client"
import client from "@/config/contentful";
import { useEffect, useState } from "react";

interface LogoFields {
    file: {
        url: string;
    };
}

interface HeaderEntry {
    fields: {
        title: string;
        logo?: {
            fields: LogoFields;
        };
    };
}

const fetchHeader = async (): Promise<HeaderEntry[]> => {
    try {
        const data = await client.getEntries({
            'content_type': 'header'
        });
        return data.items as any as HeaderEntry[];
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

export default function Header() {
    const [headerData, setHeaderData] = useState<HeaderEntry[]>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchHeader();
            setHeaderData(data);
        };

        getData();
    }, []);

    const headerStyle = {
        container: {
            padding: '20px',
            backgroundColor: '#f4f4f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px' // Space between image and title
        },
        imageContainer: {
            flex: '0 0 auto', // Image does not grow or shrink
            width: '100px', // Adjust width as needed
            height: '100px', // Adjust height as needed
        },
        image: {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
        },
        titleContainer: {
            flex: '1 1 auto',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
        },
    };

    return (
        <div style={headerStyle.container}>
            {headerData.map((datas, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    {datas.fields.logo?.fields.file.url && (
                        <div style={headerStyle.imageContainer}>
                            <img
                                src={prependProtocol(datas.fields.logo.fields.file.url)}
                                alt={datas.fields.title}
                                style={headerStyle.image}
                            />
                        </div>
                    )}
                    <div >
                        {datas.fields.title}
                    </div>
                </div>
            ))}
        </div>
    );
}
