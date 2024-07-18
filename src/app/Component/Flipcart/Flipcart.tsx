
import client from "@/config/contentful";

const fetchHeader = async () => {
    const data = await client.getEntries({
        'content_type' : 'flipcart2'
    })

    return data.items;
}
 
export default async function Flipcart2( ) { 

    const datatwo = await fetchHeader()


    return (
        <div>
            {datatwo.map((datas, index) => (
                <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px', width: '200px' }}>
           <div>Title: {datas.fields.title as string}</div>

                    <img src={datas.fields.logo.fields.file.url} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            ))}
        </div>
    );
}