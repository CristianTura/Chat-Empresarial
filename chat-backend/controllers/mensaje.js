const Message = require("../models/mensaje");

const getChat = async (req, res) => {
    const miId = req.uid;
    const msgFrom = req.params.de;

    const last30 = await Message.find({
        $or: [
            { from: miId, to: msgFrom },
            { from: msgFrom, to: miId },
        ],
    })
        .sort({ createdAt: "desc" })
        .limit(30);

    res.json({
        ok: true,
        msg: last30,
    });
};

module.exports = {
    getChat,
};
