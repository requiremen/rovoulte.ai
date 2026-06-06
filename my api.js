api
app.post("/analyze-paper", async (req, res) => {
    try {
        const textinput = req.body.textinput;
        if(!textinput){
            res.status(400).json({
                msg:"please enter the questions"
            })
        }else{
            const analysis = await analyzePapers(textinput)
            res.status(200).json({
                analysis
            })
        }

        

    }catch{
        res.status(500).json({
            msg:"something went wrong"
        })
    }
    
});
