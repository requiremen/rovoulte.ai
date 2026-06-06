const express = require('express');
const cors = require('cors');
const { analyzePapers } = require('./index');
const app = express();
const port = 3000;

// Enable CORS so the React frontend can request this API
app.use(cors());
app.use(express.json());
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

if (require.main === module) {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
}

module.exports = app;
