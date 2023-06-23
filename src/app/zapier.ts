import fetch from 'node-fetch'

export default async function handler(event: any) {
    const discordEventId = process.env.ZAPER_ACTION_DISCORD_ID ?? ""

    try {
        // discord - zapier
        const response = await fetch(`https://nla.zapier.com/api/v1/dynamic/exposed/${discordEventId}/execute/`,
        { 
            method: "POST",
            headers: {
                "x-api-key": process.env.ZAPIER_API_KEY ?? ""
            },
            body: JSON.stringify({ instructions: `Send a message to the discord channel to 
                Checkout the latest blog post titled: ${event.title}, access it here: ${event.url}`})
        })
    
        const result = await response.json()
        console.log('result: ', result)
    } catch (e) {
        console.log(e)
        console.log("fail")
    }

}