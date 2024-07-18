import { title } from "process";
import client from "@/config/contentful";
const fetchHeader = async () => {
    const data = await client.getEntries({
        'content_type' : 'header'
    })
    //  console.log("datacferfrefewferwf" , data.items);
    return data.items;
}
export default async function Header( ) { 
    const datatwo = await fetchHeader()
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
        {datatwo.map((datas, index) => (
              <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
              {datatwo.map((datas, index) => (
                  <div key={index}>
                      <a href={datas.fields.socialLink} target="_blank" rel="noopener noreferrer">
                          <img src={datas.fields.logo.fields.file.url} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                      </a>
                      <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}> {datas.fields.header}</div>
                      <div>
                          Slug: {datas.fields.slug}
                      </div>
                  </div>
              ))}
          </div>
        ))}
    </div>
    );
}