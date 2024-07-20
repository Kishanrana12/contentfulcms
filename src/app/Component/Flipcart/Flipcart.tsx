import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import client from "@/config/contentful";
import Image from "next/image";

interface LogoFields {
    file: {
        url: string;
    };
}

interface RichTextContent {
    nodeType: string;
    content: RichTextContent[];
    value?: string;
    data?: any;
    marks?: Array<{ type: string }>;
}

interface Document {
    nodeType: 'document';
    data: {};
    content: RichTextContent[];
}

interface Flipcart2Entry {
    fields: {
        player: {
            content: RichTextContent[];
        };
        title: string;
        logo?: {
            fields: LogoFields;
        } | null;
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

const renderOptions = {
    renderMark: {
        [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
    },
};

export default async function Flipcart2() {
    const datatwo = await fetchHeader();

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
            {datatwo.map((datas, index) => {
                const logoUrl = datas.fields.logo?.fields.file.url;
                const richTextDocument: Document = {
                    nodeType: 'document',
                    data: {},
                    content: datas.fields.player.content
                };

                const isImageOnRight = index % 2 === 0; // Alternates image position

                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: isImageOnRight ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            marginBottom: '20px',
                            padding: '10px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            height: '300px', // Adjust height if needed
                        }}
                    >
                        {logoUrl && (
                            <div style={{ flex: '1 1 50%', padding: '10px' }}>
                                <Image
                                    src={prependProtocol(logoUrl)}
                                    alt={datas.fields.title}
                                    width={300}  // Adjust width as needed
                                    height={300} // Adjust height as needed
                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div style={{ flex: '1 1 50%', padding: '10px' }}>
                            <div
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: '10px'
                                }}
                            >
                                {datas.fields.title}
                            </div>
                            <div>
                                {documentToReactComponents(richTextDocument as any, renderOptions)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
