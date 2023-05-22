import { NextResponse } from "next/server";
import openai from "@/openai"

export async function POST(request: Request) {
    // Weather data in the body of the post request
    const { weatherData } = await request.json();
// try {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: "Pretend you're a weather news presenter presenting LIVE on TV. Be energetic and full of charisma. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for the weather conditions such as wear SPF if the UV is high or wear a coat for coold temperatures etc. Use the uv_index data provided to provide UV advice. Assume the data came from your team at the news office and not the user",

            },{
                role: 'user',
                content: `Hi there can I get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(
                    weatherData
                )}`,
            }
        ]
    })

    const {data} = response;

    console.log('Data is: ', data)
    
    return NextResponse.json(data.choices[0].message)
// } catch(error){

//     return 

// }
}