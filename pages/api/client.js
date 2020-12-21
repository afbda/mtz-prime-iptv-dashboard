import connect from '../../database/database'

export default async (req, res) => {
    if(req.method === 'POST'){
        const {db} = await connect();

        const response = await db.collection('client').insertOne(req.body);
        res.status(200).json(response.ops[0]);

    }

    if(req.method === 'PUT'){
        if(req.body._id){
            const {db} = await connect();
            const query = {_id: req.body._id};
            const response = await db.collection('client').replaceOne(query, req.body);
            res.status(200).json(response.ops[0]);
        }
    }

    if(req.method === 'DELETE'){
        if(req.body._id){
            const {db} = await connect();
            const query = {_id: req.body._id};
            const response = await db.collection('client').deleteOne(query);
            res.status(200).json(response.ops[0]);
        }
    }

    if(req.method === 'GET'){
        const {db} = await connect();

        db.collection('client').find({}).toArray((err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
        
    }
    
}