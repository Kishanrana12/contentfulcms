import client from "@/config/contentful";

const fetchHeader = async () => {
    const data = await client.getEntries({
        'content_type' : 'header'
    })

    return data.items;
}
export default async function Header( ) {
    const datatwo = await fetchHeader()
   
    return (
        <div>
            {datatwo.map((datas, index) => (
                <div key={index}>
                    <div>Title: {datas.fields.title as any}</div>
                    <img src={datas.fields.logo.fields.file.url} alt="" />
                </div>
            ))}
        </div>
    );
}