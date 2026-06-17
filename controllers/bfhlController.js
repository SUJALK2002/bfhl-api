const { processInput } = require("../services/bfhlService");

const processData = (req, res) => {
    const start = Date.now();

    const requestId = req.header("X-Request-Id");

    const result = processInput(req.body.data, requestId);

    result.processing_time_ms = Date.now() - start;

    res.json(result);
};

module.exports = { processData };