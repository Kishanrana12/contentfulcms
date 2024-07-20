import client from "@/config/contentful";
import Image from "next/image";
import { Key } from "react";

interface FooterEntry {
    fields: {
        title: string;
        faceBook?: string;
        twitter?: string;
        [key: string]: any; // Handle any other potential fields dynamically
    };
}

const fetchFooter = async (): Promise<FooterEntry[]> => {
    try {
        const data = await client.getEntries({
            'content_type': 'footer'
        });
        return data.items as any as FooterEntry[];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export default async function Footer() {
    const data = await fetchFooter();

    const datata = data[0]?.fields?.social || [];


    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', textAlign: 'center' }}>
            {datata.map((item: { fields: { faceBook: any; twitter: any; }; }, index: Key | null | undefined) => {
                const faceBookUrl = item.fields.faceBook;
                const twitterUrl = item.fields.twitter;

                return (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        {faceBookUrl && (
                            <div style={{ marginBottom: '5px' }}>
                                <a
                                    href={faceBookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#3b5998',
                                        textDecoration: 'none',
                                        fontSize: '16px'
                                    }}
                                >
                                    Facebook
                                </a>
                            </div>
                        )}
                        {twitterUrl && (
                            <div>
                                <a
                                    href={twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#1DA1F2',
                                        textDecoration: 'none',
                                        fontSize: '16px'
                                    }}
                                >
                                    Twitter
                                </a>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
