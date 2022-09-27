const fetch = require("node-fetch");


module.exports = {

    getImageByImageId: async(req, res) => {
        const imageId = req.params.imageId;
        try {
            await fetch(`https://avatar-my-gym-manager.s3.ap-south-1.amazonaws.com/${imageId}`, { method: 'GET' }).then(response => response.blob())
                .then(imageBlob => {
                    console.log(`result: `, imageBlob);
                    return res.status(200).json({
                            success: 1,
                            result: imageBlob
                        })
                        // fetch(`https://avatar-my-gym-manager.s3.ap-south-1.amazonaws.com/${imageId}-2`, {
                        //     method: 'PUT',
                        //     headers: {
                        //         "Content-Type": "multipart/form-data"
                        //     },
                        //     body: imageBlob

                    // })
                });
        } catch (err) {
            console.log("Error in controller file", err);
        }

    },



}