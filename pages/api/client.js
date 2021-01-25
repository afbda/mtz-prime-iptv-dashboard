import connect from '../../database/database'

async function teste (req, res) {
    console.log("bateu primeiro")
    if(req.method === 'POST'){
        const {db} = await connect();

        db.collection('client').insertOne(req.body).then(() => {
            res.status(201).end();
        });
    }

    if(req.method === 'PUT'){
        if(req.body._id){
            const {db} = await connect();
            const query = {_id: ObjectId(req.body._id)};
            const result = await db.collection('client').updateOne(query, req.body)
            res.status(200).json(result);
            
        }
    }

    if(req.method === 'DELETE'){
        if(req.body._id){
            console.log("bateu muito")
            const {db} = await connect();
            const query = {_id: ObjectId(req.body._id)};
            await db.collection('client').deleteOne(query)
            res.status(200).json({teste: "bateu"});
        }
    }

    if(req.method === 'GET'){
        const {db} = await connect();

        db.collection('client').find({}).toArray((err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
        
    }

    if(req.method != 'GET' && req.method != 'POST' && req.method != 'PUT' && req.method != 'DELETE'){
        res.status(400).json({ error: 'Wrong request method' });
    }
}

export default teste;