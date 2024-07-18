import Image from 'next/image';
import client from "@/config/contentful";

const fetchHeader = async () => {
    const data = await client.getEntries({
        'content_type' : 'header'
    });
    console.log("Header data:", data.items);
    return data.items;
};

export default async function Header() {
    const datatwo = await fetchHeader();

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
            {datatwo.map((datas, index) => (
                <div key={index} style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
                    {datas.fields.logo && (
                        <div key={datas.sys.id}>
                            <a href={datas?.fields.socialLink as string} target="_blank" rel="noopener noreferrer">
                                <div>
                                    <Image
                                       src={(datas.fields.logo as any).fields.file.url}
                                        alt=""
                                        width={200} // Adjust width and height as per your design
                                        height={150}
                                    />
                                </div>
                            </a>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>
                                {datas?.fields?.header as string}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
