//Manipulate the query object to handle the requests from the frontend
export const searchQuery = (model, populate) => async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'limit', 'state'];

    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in|or)\b/g,
        (match) => `$${match}`
    );

    query = model.find(JSON.parse(queryStr));
    if (req.query.state) {
        const states = req.query.state.split(',');
        query = query.find({ state: states });
    }

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    if (req.query.limit) {
        const limit = parseInt(req.query.limit, 10);

        query = query.limit(limit);
    }

    if (populate) {
        query = query.populate(populate);
    }
    console.log(req.query);
    const results = await query;

    res.searchResults = {
        success: true,
        count: results.length,
        data: results,
    };
    next();
};
