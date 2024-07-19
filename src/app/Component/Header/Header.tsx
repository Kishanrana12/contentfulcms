import client from "@/config/contentful";

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

export default async function Header() {
    const datatwo = await fetchHeader();

    return (
        <div>
            {datatwo.map((datas, index) => (
                <div key={index}>
                    <div>Title: {datas.fields.title}</div>
                    {datas.fields.logo?.fields.file.url && (
                        <img
                            src={prependProtocol(datas.fields.logo.fields.file.url)}
                            alt={datas.fields.title}
                            style={{ maxWidth: '100%', height: 'auto' }} // Optional styling for responsiveness
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
