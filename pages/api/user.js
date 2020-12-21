export default async (req, res) => {
    if(req.method === 'POST'){

    }

    if(req.method === 'PUT'){

    }

    if(req.method === 'DELETE'){
        
    }
    const {db} = await connect();

    const dbResponse = await db.collection('client').insertOne(new Client());
    res.status(200).json(dbResponse.ops[0])
}