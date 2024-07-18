
import client from "@/config/contentful";
import Image from 'next/image';
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
            { datatwo && datatwo.map((datas, index) => (
                <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px', width: '200px' }}>
           <div>Title: {datas.fields.title as string}</div>

           <div>
           {datas.fields.logo && (
  <div>
    <Image
      src={(datas.fields.logo as any).fields.file.url}
      alt=""
      width={200} // Adjust width and height as per your design
      height={150}
    />
  </div>
)}
</div>
                </div>
            ))}
        </div>
    );
}